// Locale navigation only; the existing German page behaviour is unchanged.
(() => {
  document.querySelectorAll('.site-languages a').forEach(link => {
    link.addEventListener('click', () => {
      const url = new URL(link.href);
      const selected = document.querySelector('[data-enquiry="event"] input[name="type"]:checked')?.value;
      const type = selected || new URLSearchParams(location.search).get('art');
      if (['camp', 'event', 'tournament'].includes(type)) url.searchParams.set('art', type);
      else url.searchParams.delete('art');
      url.hash = location.hash;
      link.href = url.href;
    });
  });
})();
