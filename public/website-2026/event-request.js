(() => {
  const copy=JSON.parse(document.getElementById('eventCopy').textContent);
  const t=copy.form, form=document.getElementById('eventRequest');
  const status=document.getElementById('eventStatus'), draft=document.getElementById('eventDraft');
  const submit=document.getElementById('eventSubmit'), date=form.elements.date, dateOpen=form.elements.dateOpen;
  const errorKeys={valueMissing:'requiredError',typeMismatch:'emailError',tooLong:'lengthError',rangeUnderflow:'numberError',rangeOverflow:'numberError',stepMismatch:'numberError',badInput:'numberError'};
  let busy=false, submittedRevision=0;
  function statusMessage(text,error=false) {
    status.hidden=false; status.textContent=text;
    status.classList.toggle('is-error',error);
  }
  function invalidateDraft() {
    submittedRevision++;
    draft.hidden=true; status.hidden=true;
    document.getElementById('eventMailLink').removeAttribute('href');
    document.getElementById('eventDraftText').value='';
  }
  function clearErrors() {
    form.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
    form.querySelectorAll('.e-error').forEach(el=>{el.textContent='';});
  }
  function fieldError(name,key) {
    const target=form.elements.namedItem(name);
    const inputs=target instanceof RadioNodeList?[...target]:target?[target]:[];
    inputs.forEach(el=>el.setAttribute('aria-invalid','true'));
    const message=document.getElementById(`error-${name}`);
    if(message)message.textContent=t[key]||t.validation;
  }
  function syncDate() {date.disabled=dateOpen.checked;date.required=!dateOpen.checked;}
  function chooseType(value) {
    const radio=[...form.querySelectorAll('input[name="type"]')].find(input=>input.value===value);
    if(radio){radio.checked=true;invalidateDraft();}
  }
  chooseType(new URLSearchParams(location.search).get('art'));
  document.querySelectorAll('[data-event-type]').forEach(link=>link.addEventListener('click',()=>chooseType(link.dataset.eventType)));
  dateOpen.addEventListener('change',syncDate);
  syncDate();
  form.addEventListener('input',invalidateDraft);
  form.addEventListener('change',invalidateDraft);
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(busy)return;
    invalidateDraft();clearErrors();
    let firstInvalid=null;
    for(const el of form.elements) {
      if(!el.willValidate || el.validity.valid)continue;
      const key=el.name==='date'?'dateError':Object.entries(errorKeys).find(([flag])=>el.validity[flag])?.[1]||'requiredError';
      fieldError(el.name,key);if(!firstInvalid)firstInvalid=el;
    }
    if(firstInvalid){statusMessage(t.validation,true);firstInvalid.focus();return;}
    const data=Object.fromEntries(new FormData(form));
    data.dateOpen=dateOpen.checked;data.date=date.value;data.locale=copy.locale;
    const revision=submittedRevision;
    busy=true;submit.disabled=true;form.setAttribute('aria-busy','true');
    submit.textContent=t.loading;
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),10000);
    try {
      const response=await fetch('/api/event-draft',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:controller.signal,credentials:'same-origin'});
      const result=await response.json();
      if(revision!==submittedRevision)return;
      if(!response.ok || result.prepared!==true || result.sent!==false) {
        if(result.fields)for(const [name,key] of Object.entries(result.fields))fieldError(name,key);
        statusMessage(t[result.error]||t.unavailable,true);
        const invalid=form.querySelector('[aria-invalid="true"]');
        (invalid||status).focus();
        return;
      }
      if(result.recipient!=='contact@elitereplay.de' || typeof result.subject!=='string' || typeof result.body!=='string')throw new Error('Invalid draft');
      document.getElementById('eventMailLink').href=`mailto:${result.recipient}?subject=${encodeURIComponent(result.subject)}&body=${encodeURIComponent(result.body)}`;
      document.getElementById('eventDraftText').value=`${t.subject}: ${result.subject}\n\n${result.body}`;
      draft.hidden=false;
      statusMessage(t.prepared);
      status.focus();
    } catch {
      if(revision===submittedRevision){statusMessage(t.unavailable,true);status.focus();}
    } finally {
      clearTimeout(timeout);busy=false;submit.disabled=false;form.removeAttribute('aria-busy');submit.textContent=t.submit;
    }
  });
})();
