const toggle = document.getElementById('navbar-toggle');
const links = document.querySelector('.navbar__links');

toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  toggle.classList.toggle('active');
});
