(() => {
  const form=document.querySelector('[data-enquiry]');
  if(!form)return;
  const copy=JSON.parse(document.getElementById('enquiryCopy').textContent), t=copy.form;
  const $=selector=>form.querySelector(selector);
  const submit=$('[data-request-submit]'), status=$('[data-request-status]');
  const fallback=$('[data-request-fallback]'), text=$('[data-request-text]'), mail=$('[data-request-mail]');
  const eventForm=form.dataset.enquiry==='event';
  const errorKeys={valueMissing:'requiredError',typeMismatch:'emailError',tooLong:'lengthError',rangeUnderflow:'numberError',rangeOverflow:'numberError',stepMismatch:'numberError',badInput:'numberError'};
  let busy=false,revision=0,id=null,mode='unavailable',completed=false;
  function statusMessage(message,error=false) {
    status.hidden=false;status.textContent=message;status.classList.toggle('is-error',error);
  }
  function buttonLabel(){return mode==='preview'?t.previewSubmit:t.submit;}
  function invalidate() {
    revision++;id=null;completed=false;fallback.hidden=true;fallback.open=false;
    text.value='';mail.removeAttribute('href');status.hidden=true;$('[data-copy-status]').textContent='';
    if(!busy){submit.disabled=false;submit.querySelector('span').textContent=buttonLabel();}
  }
  function clearErrors() {
    form.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
    form.querySelectorAll('.e-error').forEach(el=>el.textContent='');
  }
  function fieldError(name,key) {
    const target=form.elements.namedItem(name);
    const inputs=target instanceof RadioNodeList?[...target]:target?[target]:[];
    inputs.forEach(el=>el.setAttribute('aria-invalid','true'));
    const output=document.getElementById(`error-${name}`);
    if(output)output.textContent=t[key]||t.validation;
  }
  function formData() {
    const data=Object.fromEntries(new FormData(form));
    data.kind=form.dataset.enquiry;data.locale=copy.locale;
    if(eventForm){data.dateOpen=form.elements.dateOpen.checked;data.date=form.elements.date.value;}
    else data.source=form.dataset.contact;
    return data;
  }
  function prepareFallback(data) {
    const topic=eventForm?t.types[data.type]:form.querySelector(`input[name="interest"]:checked`)?.nextElementSibling.textContent;
    const subject=`${t.emailSubject}: ${topic}`;
    const lines=[eventForm?t.emailIntro:t.productEmailIntro,'',topic,''];
    const names=eventForm?['date','location','participants','duration','interest','name','email','phone','message']:['name','email','phone','message'];
    for(const name of names) {
      let value=data[name];
      if(name==='date' && data.dateOpen)value=t.dateOpen;
      if(name==='interest' && eventForm)value=t.interests[value];
      if(value)lines.push(`${t[name]}: ${value}`);
    }
    if(eventForm)lines.push('',t.unbound);
    const body=lines.join('\n');
    mail.href=`mailto:contact@elitereplay.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    text.value=`${t.recipient}: contact@elitereplay.de\n${t.subject}: ${subject}\n\n${body}`;
    fallback.hidden=false;
  }
  function chooseType(value) {
    if(busy)return;
    const radio=[...form.querySelectorAll('input[name="type"]')].find(input=>input.value===value);
    if(radio){radio.checked=true;invalidate();}
  }
  if(eventForm) {
    chooseType(new URLSearchParams(location.search).get('art'));
    document.querySelectorAll('[data-event-type]').forEach(link=>link.addEventListener('click',()=>chooseType(link.dataset.eventType)));
    const sync=()=>{form.elements.date.disabled=form.elements.dateOpen.checked;form.elements.date.required=!form.elements.dateOpen.checked;};
    form.elements.dateOpen.addEventListener('change',sync);sync();
  }
  form.addEventListener('input',invalidate);
  form.addEventListener('change',invalidate);
  $('[data-request-copy]').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(text.value);$('[data-copy-status]').textContent=t.copied;}
    catch{text.focus();text.select();$('[data-copy-status]').textContent=t.copyManual;}
  });
  const modeController=new AbortController();
  const modeTimer=setTimeout(()=>modeController.abort(),8000);
  fetch('/api/enquiry',{credentials:'same-origin',cache:'no-store',signal:modeController.signal})
    .then(async response=>{
      if(!response.ok)throw new Error('Mode unavailable');
      const result=await response.json();
      if(!['smtp','preview','unavailable'].includes(result.mode))throw new Error('Unknown mode');
      mode=result.mode;
    })
    .catch(()=>{mode='unavailable';})
    .finally(()=>{
      clearTimeout(modeTimer);
      $('[data-request-mode]').textContent=mode==='preview'?t.previewNote:mode==='smtp'?'':t.notConfigured;
      $('[data-request-note]').textContent=mode==='preview'?t.previewDetail:t.deliveryNote;
      submit.querySelector('span').textContent=buttonLabel();submit.disabled=false;
    });
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(busy || completed)return;
    clearErrors();status.hidden=true;
    let firstInvalid=null;
    for(const el of form.elements) {
      if(!el.willValidate || el.validity.valid)continue;
      const key=el.name==='date'?'dateError':Object.entries(errorKeys).find(([flag])=>el.validity[flag])?.[1]||'requiredError';
      fieldError(el.name,key);firstInvalid??=el;
    }
    if(firstInvalid){statusMessage(t.validation,true);firstInvalid.focus();return;}
    const data=formData();prepareFallback(data);
    const submittedRevision=revision;
    id??=crypto.randomUUID();
    busy=true;submit.disabled=true;form.setAttribute('aria-busy','true');
    const controls=[...form.querySelectorAll('input,select,textarea:not([readonly])')].map(el=>[el,el.disabled]);
    controls.forEach(([el])=>{el.disabled=true;});
    submit.querySelector('span').textContent=mode==='preview'?t.previewLoading:t.loading;
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),45000);
    try {
      const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(data),credentials:'same-origin',signal:controller.signal});
      const result=await response.json();
      if(revision!==submittedRevision)return;
      if(!response.ok) {
        if(result.fields)for(const [name,key] of Object.entries(result.fields))fieldError(name,key);
        statusMessage(t[result.error]||t.unavailable,true);
        (form.querySelector('[aria-invalid="true"]')||status).focus();
        return;
      }
      if(result.simulated===true && result.sent===false && result.accepted===false)statusMessage(t.previewSuccess);
      else if(result.accepted===true && result.sent===true && result.simulated===false){
        statusMessage(t.success);completed=true;fallback.hidden=true;
      } else throw new Error('Unconfirmed result');
      status.focus();
    } catch {
      if(revision===submittedRevision){statusMessage(t.deliveryUnknown,true);status.focus();}
    } finally {
      clearTimeout(timeout);busy=false;form.removeAttribute('aria-busy');
      controls.forEach(([el,disabled])=>{el.disabled=disabled;});
      submit.disabled=completed;submit.querySelector('span').textContent=completed?t.completed:buttonLabel();
    }
  });
})();
