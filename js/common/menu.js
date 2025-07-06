const toggle = document.getElementById('navbar-toggle');
const links = document.querySelector('.navbar__links');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  toggle.classList.toggle('active');
});

  // <!-- 滾動動畫 Intersection Observer -->
    const fadeIns = document.querySelectorAll('.fade-in');
    const options = {
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    fadeIns.forEach(el => {
      observer.observe(el);
    });