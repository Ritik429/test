
/* ===========================
   Forex Ritik — Shared JS
   =========================== */

const $$ = sel => Array.from(document.querySelectorAll(sel));

// Mobile menu
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
if(burger){
  burger.addEventListener('click', ()=> mobileMenu.classList.toggle('open'));
}

// Page transition sweep on link click
const overlay = document.querySelector('.page-transition');
$$('a[data-transition]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    // Only intercept internal links
    const url = new URL(a.href, window.location.href);
    const isExternal = url.origin !== window.location.origin;
    if(isExternal || a.target === "_blank") return;
    e.preventDefault();
    overlay?.classList.add('active');
    setTimeout(()=> window.location.href = a.href, 380);
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){ ent.target.classList.add('show'); io.unobserve(ent.target); }
  })
},{threshold:.12});
$$('.reveal').forEach(el=> io.observe(el));

// Simple form handler (Contact page)
const contactForm = document.querySelector('#contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = "Sending...";
    setTimeout(()=>{
      btn.disabled = false; btn.textContent = "Send Message";
      document.querySelector('#form-status').textContent = "Thanks! We'll reach out within 24 hours.";
      document.querySelector('#form-status').className = "success";
      contactForm.reset();
    }, 900);
  });
}
