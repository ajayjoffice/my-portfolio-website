const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  primaryNav.classList.toggle('open', !isOpen);
});

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    primaryNav.classList.remove('open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const viewMoreButton = document.querySelector('.view-more-projects');
const projects = Array.from(document.querySelectorAll('.project-card'));
let showAllProjects = false;

function getVisibleProjectCount() {
  if (window.innerWidth >= 1280) return projects.length;
  if (window.innerWidth >= 760) return 3;
  if (window.innerWidth >= 520) return 2;
  return 1;
}

function updateProjects() {
  const visibleCount = getVisibleProjectCount();
  projects.forEach((project, index) => {
    project.hidden = !showAllProjects && index >= visibleCount;
  });

  const canExpand = visibleCount < projects.length;
  viewMoreButton.hidden = !canExpand;
  viewMoreButton.setAttribute('aria-expanded', String(showAllProjects));
  viewMoreButton.innerHTML = showAllProjects
    ? 'Show fewer projects <span>−</span>'
    : 'View more projects <span>＋</span>';
}

viewMoreButton.addEventListener('click', () => {
  showAllProjects = !showAllProjects;
  updateProjects();
});

window.addEventListener('resize', updateProjects);
updateProjects();
