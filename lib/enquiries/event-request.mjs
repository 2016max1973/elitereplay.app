import copies from './form-copy.json' with {type:'json'};
export const recipient = 'contact@elitereplay.de'; // Existing ClubContactForm recipient.
const types = ['camp','event','tournament'];
const interests = ['matchboard','video','advice'];
const limits = {name:120,email:254,phone:60,location:160,duration:120,message:3000};
const allowed = new Set(['locale','type','interest','date','dateOpen','participants','website',...Object.keys(limits)]);

export function validateEventRequest(raw) {
  const errors = {};
  if (!raw || Array.isArray(raw) || typeof raw !== 'object') return {ok:false,errors:{form:'invalid'}};
  if (Object.keys(raw).some(key=>!allowed.has(key))) errors.form='invalid';
  const data = {};
  for (const [key,max] of Object.entries(limits)) {
    if (typeof raw[key] !== 'string') {
      if (['phone','message'].includes(key) && raw[key] == null) data[key]='';
      else errors[key]='requiredError';
      continue;
    }
    data[key]=raw[key].trim();
    if (data[key].length>max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(data[key])) errors[key]='lengthError';
    if (!['phone','message'].includes(key) && !data[key]) errors[key]='requiredError';
    if (key!=='message' && /[\r\n]/.test(data[key])) errors[key]='lengthError';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email='emailError';
  for (const [key,options] of [['type',types],['interest',interests],['locale',Object.keys(copies)]]) {
    if (!options.includes(raw[key])) errors[key]='choiceError'; else data[key]=raw[key];
  }
  if (typeof raw.dateOpen!=='boolean') errors.date='dateError';
  data.dateOpen=raw.dateOpen===true;
  data.date=typeof raw.date==='string'?raw.date:'';
  if (!data.dateOpen) {
    const date=/^\d{4}-\d{2}-\d{2}$/.test(data.date)?new Date(data.date+'T12:00:00Z'):null;
    if (!date || Number.isNaN(date.getTime()) || date.toISOString().slice(0,10)!==data.date) errors.date='dateError';
  } else data.date='';
  if (!['string','number'].includes(typeof raw.participants) || !/^\d+$/.test(String(raw.participants)) || !Number.isSafeInteger(Number(raw.participants)) || Number(raw.participants)<1 || Number(raw.participants)>100000) errors.participants='numberError';
  else data.participants=Number(raw.participants);
  if (typeof raw.website!=='string' || raw.website.trim()) errors.form='blocked';
  return Object.keys(errors).length?{ok:false,errors}:{ok:true,data};
}

export function prepareEventDraft(data) {
  const f=copies[data.locale];
  const formattedDate=data.dateOpen?f.dateOpen:new Intl.DateTimeFormat({de:'de-DE',en:'en-GB',es:'es-ES'}[data.locale],{dateStyle:'long',timeZone:'UTC'}).format(new Date(data.date+'T12:00:00Z'));
  const lines=[f.emailIntro,'',`${f.legend}: ${f.types[data.type]}`,`${f.date}: ${formattedDate}`,`${f.location}: ${data.location}`,`${f.participants}: ${data.participants}`,`${f.duration}: ${data.duration}`,`${f.interest}: ${f.interests[data.interest]}`,'',`${f.name}: ${data.name}`,`${f.email}: ${data.email}`];
  if(data.phone)lines.push(`${f.phone}: ${data.phone}`);
  if(data.message)lines.push('',`${f.message}:`,data.message);
  lines.push('',f.unbound);
  return {prepared:true,sent:false,recipient,subject:`${f.emailSubject}: ${f.types[data.type]} · ${data.location}`,body:lines.join('\n')};
}
