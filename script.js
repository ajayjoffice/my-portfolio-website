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

const certificateList = document.querySelector('#certificate-list');
const moreCertificatesButton = document.querySelector('.view-more-certificates');
let certificates = [];
let showAllCertificates = false;

function getVisibleCertificateCount() {
  if (window.innerWidth <= 640) return 3;
  if (window.innerWidth <= 900) return 4;
  return certificates.length;
}

function updateCertificates() {
  if (!certificateList || !moreCertificatesButton) return;

  const visibleCount = getVisibleCertificateCount();
  Array.from(certificateList.children).forEach((item, index) => {
    item.hidden = !showAllCertificates && index >= visibleCount;
  });

  const canExpand = visibleCount < certificates.length;
  moreCertificatesButton.hidden = !canExpand;
  moreCertificatesButton.setAttribute('aria-expanded', String(showAllCertificates));
  moreCertificatesButton.innerHTML = showAllCertificates
    ? 'Show fewer certificates <span>−</span>'
    : 'View more certificates <span>＋</span>';
}

async function renderCertificates() {
  if (!certificateList) return;

  try {
    const response = await fetch('certificates.json');
    if (!response.ok) throw new Error('Could not load certificates');
    certificates = await response.json();

    certificates.forEach(({ title, url, label = 'Certificate information' }) => {
      const item = document.createElement('article');
      item.className = 'certificate';

      const heading = document.createElement('h4');
      heading.textContent = title;

      const link = document.createElement('a');
      link.className = 'certificate-button';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.append(document.createTextNode(`${label} `));

      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      link.append(arrow);

      item.append(heading, link);
      certificateList.append(item);
    });
    updateCertificates();
  } catch (error) {
    certificateList.textContent = 'Certificate details are temporarily unavailable.';
  }
}

renderCertificates();
moreCertificatesButton?.addEventListener('click', () => {
  showAllCertificates = !showAllCertificates;
  updateCertificates();
});
window.addEventListener('resize', updateCertificates);
