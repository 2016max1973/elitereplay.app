// Page-specific copy. The existing navigation, player and form handlers are reused.
(() => {
  const t = text => window.EliteReplayTranslations?.[document.documentElement.lang]?.[text] || text;
  const films = {
    capture: 'Vorhandener Capture-Produktfilm mit echtem Trainingsmaterial und illustrativen App-Ansichten. Die neuen Funktionen und originalen Clipkarten findest du auf dieser Seite.',
    coach: 'Bewegungslinien helfen, Haltung und Bewegungsablauf gemeinsam zu besprechen. In der aktuellen App lassen sich bis zu zwei erkannte Spieler auswählen und die Bewegungsansicht exportieren.',
    player: 'Ein echter Matchmoment aus der iPhone-Perspektive: Golden Point bei 40:40, mit Namen und Spielstand im Bild. Ausschnitt aus einem vorhandenen Clip mit Beispielnamen.'
  };
  Object.keys(films).forEach(key => { films[key] = t(films[key]); });
  document.querySelectorAll('[data-film], [data-film-switch]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.film || button.dataset.filmSwitch;
      if (films[key]) document.getElementById('filmCaption').textContent = films[key];
      if (key === 'player') {
        const video = document.getElementById('dialogVideo');
        document.getElementById('filmDialog').classList.remove('portrait');
        document.getElementById('filmTitle').textContent = t('Player Mode · Replay mit Spielstand');
        video.src = '/website-2026/assets/capture-2026-11/player-replay-score.mp4';
        video.poster = '/website-2026/assets/capture-2026-11/player-replay-score-poster.jpg';
        video.load();
        video.play().catch(() => {});
      } else {
        document.getElementById('dialogVideo').removeAttribute('poster');
      }
    });
  });
  const update = () => {
    const player = document.querySelector('input[name="interest"]:checked')?.value === 'Spieler';
    document.getElementById('requestTitle').textContent = t(player
      ? 'Deine Anfrage: Player Mode für eure Matches' : 'Deine Anfrage: Capture für dein Training');
    document.getElementById('requestDetail').textContent = t(player
      ? 'Spielstand, Punkt-Clips und MatchBoard-Overlay auf eurem Gerät. Wir stimmen Kameraaufstellung und Steuerung mit euch ab und begleiten euren Einstieg über Apple TestFlight.'
      : 'Replays, persönliches Video-Feedback und Bewegungsansicht. Wir stimmen Gerät und Steuerung mit dir ab und begleiten deinen Einstieg über Apple TestFlight.');
  };
  document.querySelectorAll('input[name="interest"]').forEach(input => input.addEventListener('change', update));
  update();
})();
