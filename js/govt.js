// govt.js

document.addEventListener('DOMContentLoaded', function() {
  const services = document.querySelectorAll('.service');

  window.addEventListener('scroll', function() {
    services.forEach(service => {
      const serviceTop = service.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (serviceTop < windowHeight * 0.8) {
        service.classList.add('visible');
      }
    });
  });
});
