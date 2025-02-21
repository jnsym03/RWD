document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");
  const menuToggleButton = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const overlay = document.querySelector('.menu-overlay');
  menuToggleButton.addEventListener('click', function() {
    if (navbarCollapse.classList.contains('show')) {
      overlay.style.display = 'none';
    } else {
      overlay.style.display = 'block';
    }
  });
  
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbarCollapse.classList.remove('show');
      overlay.style.display = 'none';
    });
  });

  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);

      navLinks.forEach(link => link.classList.remove('active'));

      if (entry.isIntersecting) {
        navLink.classList.add('active');
      }
    });
  }, {
    threshold: [0.5, 1.0],
    rootMargin: '0px',
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  const overlayObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const overlay = entry.target.querySelector('.overlay');
      if (entry.isIntersecting) {
        overlay.style.background = 'rgba(0, 0, 0, 0)';
      } else {
        overlay.style.background = 'rgba(255, 255, 255, 0.6)';
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    overlayObserver.observe(section);
  });
});
