// Find navigation with id of main
const nav = document.querySelector('#main');
// Figure out where the top of the sticky nav is
const topOfNav = nav.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    // Figure out height of navigation and add padding to body
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);
console.log(sticky);
// When we scroll, how far are we scrolled
// Hit threshold more than top of the navigation
  // Fix Nav
