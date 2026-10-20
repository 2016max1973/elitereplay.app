const $ = (selector,root=document) => root.querySelector(selector);
const $$ = (selector,root=document) => [...root.querySelectorAll(selector)];
const pageCopy = $('#eventCopy') ? JSON.parse($('#eventCopy').textContent) : null;
const uiCopy = pageCopy?.chrome;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroVideo = $('#heroVideo');
const trainingVideo = $('#trainingVideo');
const dialog = $('#filmDialog');
const dialogVideo = $('#dialogVideo');
let returnFocus = null;
let heroPaused = reduced;
let trainingPaused = reduced;
const safePlay = video => { if(!video)return; const p=video.play(); if(p) p.catch(()=>{}); };
const setPauseIcon = (button,paused,label) => { if(!button)return; button.setAttribute('aria-label',`${label} ${paused?'abspielen':'pausieren'}`); $('use',button).setAttribute('href',paused?'#play':'#pause'); };
if(reduced&&heroVideo) heroVideo.pause();
setPauseIcon($('#heroPause'),heroPaused,'Hintergrundvideo');
setPauseIcon($('#trainingPause'),trainingPaused,'Trainingsvideo');
$('#heroPause')?.addEventListener('click',()=>{heroPaused=!heroPaused;heroPaused?heroVideo.pause():safePlay(heroVideo);setPauseIcon($('#heroPause'),heroPaused,'Hintergrundvideo');});
$('#trainingPause')?.addEventListener('click',()=>{trainingPaused=!trainingPaused;trainingPaused?trainingVideo.pause():safePlay(trainingVideo);setPauseIcon($('#trainingPause'),trainingPaused,'Trainingsvideo');});
const scenes={match:{file:'hero',label:'Echte ÉliteReplay-Aufnahme · Seitenkamera'},training:{file:'training',label:'Echte ÉliteReplay-Trainingsaufnahme'},capture:{file:'capture-loop',label:'Capture-Produktdemo · echte Oberfläche und echtes Material'}};
$$('[data-scene]').forEach(button=>button.addEventListener('click',()=>{const scene=scenes[button.dataset.scene];$$('[data-scene]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});heroVideo.poster=`/website-2026/assets/${scene.file}-poster.jpg`;heroVideo.src=`/website-2026/assets/${scene.file}.mp4`;heroVideo.load();$('#sceneCaption').textContent=scene.label;if(!heroPaused)safePlay(heroVideo);}));
const filmData={
  match:{src:'match-replay.mp4',title:'ÉliteReplay · Ein Punkt. Mehrere Perspektiven.',caption:'Euer Ballwechsel aus der Vogelperspektive, von der Seite und direkt am Netz — mit dem Spielstand im Bild. Welche Replays ihr auf eurem Court nutzen könnt, klären wir gemeinsam.'},
  capture:{src:'capture-demo.mp4',title:'ÉliteReplay Capture · Produktfilm',caption:'Replay ansehen, persönlich Feedback geben und einen Coach-Clip mitgeben. Illustrative App-Ansichten mit echtem Trainingsmaterial. Die Bewegungsansicht wird im Capture-Piloten erprobt und weiterentwickelt.'},
  coach:{src:'coach-demo.mp4',title:'Capture · Trainer-Modus',caption:'Haltung und Bewegung gemeinsam ansehen und besprechen. Die Bewegungsansicht mit Körperlinien wird im Capture-Piloten weiterentwickelt. Sie bewertet die Technik nicht automatisch.'},
  player:{src:'player-demo.mp4',title:'Capture · Spieler-Modus',caption:'Produktdemo mit echtem Matchmaterial und Beispieloberfläche. Im Spieler-Modus markierst du deine Szenen bewusst selbst. Die Punktesammlung im Film dient der Veranschaulichung.'}
};
if(uiCopy){filmData.match.title=uiCopy.filmTitle;filmData.match.caption=uiCopy.filmDetail;}
function setFilm(key){const film=filmData[key];$('#filmTitle').textContent=film.title;$('#filmCaption').textContent=film.caption;dialog.classList.toggle('portrait',key==='player');dialogVideo.src=`/website-2026/assets/${film.src}`;dialogVideo.load();dialogVideo.muted=false;$$('[data-film-switch]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filmSwitch===key)));safePlay(dialogVideo);}
$$('[data-film]').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;document.body.classList.add('modal-open');$$('video').forEach(v=>v.pause());dialog.showModal();setFilm(button.dataset.film);$('.close-dialog',dialog).focus();}));
$$('[data-film-switch]').forEach(button=>button.addEventListener('click',()=>setFilm(button.dataset.filmSwitch)));
$('.close-dialog',dialog).addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{dialogVideo.pause();dialogVideo.removeAttribute('src');dialogVideo.load();document.body.classList.remove('modal-open');if(!heroPaused&&heroVideo&&heroVideo.getBoundingClientRect().bottom>0)safePlay(heroVideo);$$('.ambient').forEach(v=>{const r=v.getBoundingClientRect();if(!reduced&&v.dataset.userPaused!=='true'&&r.bottom>0&&r.top<innerHeight&&!(v===trainingVideo&&trainingPaused))safePlay(v);});if(returnFocus)returnFocus.focus({preventScroll:true});});
$$('[data-training]').forEach(button=>button.addEventListener('click',()=>{const isMotion=button.dataset.training==='motion';$$('[data-training]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});trainingVideo.src=`/website-2026/assets/${isMotion?'motion':'training'}.mp4`;trainingVideo.poster=`/website-2026/assets/${isMotion?'motion':'training'}-poster.jpg`;trainingVideo.load();$('#trainingLabel').textContent=isMotion?'BEWEGUNGSANSICHT · DEMO':'ECHTES TRAINING';$('#trainingNote').textContent=isMotion?'Haltung und Bewegung im Trainingsvideo ansehen. Im Capture-Piloten in Erprobung; keine automatische Technikbewertung.':'Echte ÉliteReplay-Trainingsaufnahme. Zum Vergleich die Bewegungsansicht auswählen.';if(!trainingPaused)safePlay(trainingVideo);}));
function selectHistory(button){$$('[data-history]').forEach(b=>{const selected=b===button;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;$(`#history-${b.dataset.history}`).hidden=!selected;});}
$$('[data-history]').forEach(button=>{button.addEventListener('click',()=>selectHistory(button));button.addEventListener('keydown',e=>{const tabs=$$('[data-history]');let next;if(e.key==='ArrowRight')next=(tabs.indexOf(button)+1)%tabs.length;if(e.key==='ArrowLeft')next=(tabs.indexOf(button)+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectHistory(tabs[next]);tabs[next].focus();}});});
const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?(uiCopy?.menuClose||'Menü schließen'):(uiCopy?.menuOpen||'Menü öffnen'));$('#mainNav').classList.toggle('open',open);});
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',uiCopy?.menuOpen||'Menü öffnen');$('#mainNav').classList.remove('open');}));
menu.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',uiCopy?.menuOpen||'Menü öffnen');$('#mainNav').classList.remove('open');}});
$('#mainNav').addEventListener('keydown',event=>{if(event.key==='Escape'){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',uiCopy?.menuOpen||'Menü öffnen');$('#mainNav').classList.remove('open');menu.focus();}});
const requestOffers={
  "Club": {
    "button": "MatchBoard-Vorführung anfragen",
    "title": "Deine Anfrage: MatchBoard für euren Court",
    "detail": "Erlebe die Court-Anzeige, den Player Button und echte Replays. Gemeinsam planen wir die passende Ausstattung und euren begleiteten Start im Club."
  },
  "History": {
    "button": "MatchBoard History anfragen",
    "title": "Deine Anfrage: eure persönliche Matchgeschichte",
    "detail": "Entdecke Spielerprofile, Partnerbilanzen und direkte Duelle in einer persönlichen Vorführung. Wir besprechen mit dir, wie History eure MatchBoard-Welt ergänzt und wie eure Spielrunde einsteigt."
  },
  "Highlights": {
    "button": "Highlights anfragen",
    "title": "Deine Anfrage: eure eigenen Highlights",
    "detail": "Sieh echte Matchfilme und MyMoment-Highlights aus mehreren Perspektiven. Für euren Einsatz vereinbaren wir die ausgewählten Matches, den Clipumfang und den Termin zur Bereitstellung."
  },
  "Trainer": {
    "button": "Capture-Zugang anfragen",
    "title": "Deine Anfrage: Capture für dein Training",
    "detail": "Nutze Replays und persönliches Video-Feedback im begleiteten Capture-Piloten. Wir stimmen dein iPhone und die passenden Funktionen mit dir ab und schalten deinen Zugang über Apple TestFlight persönlich frei."
  },
  "Spieler": {
    "button": "Capture-Zugang anfragen",
    "title": "Deine Anfrage: Capture für deine Spielmomente",
    "detail": "Eigene Szenen sichern, wiederansehen und mitnehmen: Wir begleiten deinen Einstieg in den Spieler-Modus im Capture-Piloten und stimmen iPhone, Funktionen und Start mit dir ab."
  }
};
function updateRequest(value){const offer=requestOffers[value];if(!offer||!$('#requestTitle'))return;$('#requestTitle').textContent=offer.title;$('#requestDetail').textContent=offer.detail;}
$$('input[name="interest"]').forEach(input=>input.addEventListener('change',()=>updateRequest(input.value)));
$$('[data-interest]').forEach(a=>a.addEventListener('click',()=>{const input=$(`input[name="interest"][value="${a.dataset.interest}"]`);if(input&&!input.disabled){input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));}}));
$$('[data-walk]').forEach(walk=>{
  const tabs=$$('[data-walk-step]',walk);
  function selectStep(button){tabs.forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;const panel=$('#'+tab.getAttribute('aria-controls'),walk);panel.hidden=!active;if(!active)$$('video',panel).forEach(v=>v.pause());});}
  tabs.forEach((button,index)=>{button.addEventListener('click',()=>selectStep(button));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectStep(tabs[next]);tabs[next].focus();}});});
});
$$('[data-proof-switch]').forEach(proof=>{
  const tabs=$$('[data-proof-tab]',proof);
  const videos=$$('video',proof);
  const panelFor=tab=>$('#'+tab.getAttribute('aria-controls'),proof);
  function selectProof(button){
    const oldTab=tabs.find(tab=>tab.getAttribute('aria-selected')==='true');
    if(oldTab===button)return;
    const oldVideo=$('video',panelFor(oldTab));
    const position=oldVideo.currentTime;
    const resume=!oldVideo.paused;
    videos.forEach(video=>video.pause());
    tabs.forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;panelFor(tab).hidden=!active;});
    const nextVideo=$('video',panelFor(button));
    const sync=()=>{nextVideo.currentTime=Math.min(position,Math.max(0,nextVideo.duration-.05));if(resume)safePlay(nextVideo);};
    if(nextVideo.readyState>=1)sync();else nextVideo.addEventListener('loadedmetadata',sync,{once:true});
  }
  tabs.forEach((button,index)=>{button.addEventListener('click',()=>selectProof(button));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectProof(tabs[next]);tabs[next].focus();}});});
  $('[data-proof-speed]',proof)?.addEventListener('click',event=>{const button=event.currentTarget;const slow=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(slow));videos.forEach(video=>video.playbackRate=slow?.5:1);});
});
$$('.proof-video').forEach(video=>video.addEventListener('play',()=>{$$('video').forEach(other=>{if(other!==video)other.pause();});}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const v=entry.target;if(entry.isIntersecting&&!reduced&&!dialog.open&&v.dataset.userPaused!=='true'&&!(v===trainingVideo&&trainingPaused)&&!(v===heroVideo&&heroPaused))safePlay(v);else v.pause();}),{threshold:.15});
$$('video.ambient, #heroVideo').forEach(v=>observer.observe(v));
document.addEventListener('visibilitychange',()=>{if(document.hidden)$$('video').forEach(v=>v.pause());else{$$('.ambient, #heroVideo').forEach(v=>{const r=v.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight&&!dialog.open&&!reduced&&v.dataset.userPaused!=='true'&&!(v===trainingVideo&&trainingPaused)&&!(v===heroVideo&&heroPaused))safePlay(v);});}});

// Original camera perspectives; these are image examples, not a live court feed.
$$('[data-angle]').forEach(button=>button.addEventListener('click',()=>{
 const image=$('.v-angle-main'); image.src='/website-2026/assets/'+button.dataset.angle; image.alt=button.dataset.alt;
 $('#angleLabel').textContent=button.dataset.label;
 $$('[data-angle]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
}));
// Local pause controls for each prominent ambient film.
$$('.v-media,.v-capture-stage,.v-match-screen,.v-player-film').forEach(frame=>{
 const video=frame.querySelector(':scope > video.ambient'); if(!video)return;
 const pause=document.createElement('button'); pause.type='button';pause.className='v-motion-control';
 pause.setAttribute('aria-label','Video pausieren');pause.innerHTML='<svg aria-hidden="true"><use href="#pause"/></svg>';
 frame.appendChild(pause);
 const refresh=()=>{pause.setAttribute('aria-label',video.paused?(uiCopy?.videoPlay||'Video abspielen'):(uiCopy?.videoPause||'Video pausieren'));$('use',pause).setAttribute('href',video.paused?'#play':'#pause');};
 pause.addEventListener('click',()=>{const resume=video.paused;$$('video',frame).forEach(v=>{v.dataset.userPaused=String(!resume);resume?safePlay(v):v.pause();});});
 video.addEventListener('play',refresh);video.addEventListener('pause',refresh);refresh();
});
$$('.v-controlled').forEach(video=>video.addEventListener('play',()=>{$$('video').forEach(other=>{if(other!==video)other.pause();});}));
