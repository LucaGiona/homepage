document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section-heading').forEach((heading) => {
    const body = heading.nextElementSibling;
    if (!body || !body.classList.contains('accordion-body')) return;

    heading.setAttribute('aria-expanded', 'false');

    function toggle() {
      const isExpanded = heading.getAttribute('aria-expanded') === 'true';
      heading.setAttribute('aria-expanded', String(!isExpanded));
    }

    heading.addEventListener('click', toggle);
  });
});
