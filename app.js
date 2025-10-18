// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');

if(hamburger){
  hamburger.addEventListener('click', ()=>{
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('active');
  });
}

// Back to top visibility
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 120) backToTop.style.display = 'block';
  else backToTop.style.display = 'none';
});

if(backToTop){
  backToTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}

// Close nav on Escape for accessibility
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && navMenu.classList.contains('active')){
    navMenu.classList.remove('active');
    if(hamburger) hamburger.setAttribute('aria-expanded','false');
  }
});

// Optional: keyboard focus trap when nav is open (simple)
navMenu.addEventListener('keydown', (e)=>{
  if(e.key === 'Tab' && navMenu.classList.contains('active')){
    // let it behave normally for now — can enhance later
  }
});

// (Optional) Add simple poster keyboard navigation: left/right scroll for each horizontal row
const rows = document.querySelectorAll('.posters, .continue-list');
rows.forEach(row => {
  row.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight') row.scrollBy({left:220, behavior:'smooth'});
    if(e.key === 'ArrowLeft') row.scrollBy({left:-220, behavior:'smooth'});
  });
  // make container focusable
  row.setAttribute('tabindex', '0');
});
