/* ==========================================
   Ahamed Bilaal Portfolio — JavaScript
   ========================================== */


  (function(){
    const bubbles = document.querySelectorAll('#bubbleArena .sk-bubble');
    // entrance animation
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          const idx = Array.from(bubbles).indexOf(e.target);
          e.target.style.animationDelay = (idx * 0.12) + 's';
          e.target.classList.add('pop');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    bubbles.forEach(b => io.observe(b));
    // touch support
    bubbles.forEach(b => {
      b.addEventListener('touchstart', e => {
        e.preventDefault();
        bubbles.forEach(x => { if(x!==b) x.classList.remove('touched'); });
        b.classList.toggle('touched');
      }, {passive:false});
    });
    document.addEventListener('touchstart', e => {
      if(!e.target.closest('.sk-bubble')) bubbles.forEach(b=>b.classList.remove('touched'));
    });
  })();
  // Initialize EmailJS (public key provided)
  if (window.emailjs && typeof emailjs.init === 'function') {
    try { emailjs.init('QgLQyZR6Sg2LgzIRc'); } catch (e) { console.warn('EmailJS init failed', e); }
  }
  


  function flipCard(id) {
    const card = document.getElementById(id);
    card.classList.toggle('active');
  }
  // touch: tap anywhere on card face flips it (except buttons/links)
  document.querySelectorAll('.proj-c').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('a') || e.target.closest('.proj-back-close') || e.target.closest('.proj-cta')) return;
      card.classList.toggle('active');
    });
  });
  // entrance on scroll
  (function(){
    const cards = document.querySelectorAll('.proj-c');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Array.from(cards).indexOf(e.target);
          e.target.style.animationDelay = (idx * 0.15) + 's';
          e.target.classList.add('proj-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(c => io.observe(c));
  })();
  


  (function(){
    const cards = document.querySelectorAll('.svc-card');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Array.from(cards).indexOf(e.target);
          const base = parseFloat(e.target.style.animationDelay) || 0;
          e.target.style.animationDelay = base + 's';
          e.target.classList.add('svc-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(c => io.observe(c));
  })();
  


  // ── Particles ──
  (function(){
    const container = document.getElementById('ctParticles');
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'ct-p';
      p.style.cssText = `
        left: ${Math.random()*100}%;
        bottom: ${Math.random()*30}%;
        width: ${1+Math.random()*2}px;
        height: ${1+Math.random()*2}px;
        animation-duration: ${5+Math.random()*10}s;
        animation-delay: ${Math.random()*8}s;
        opacity: ${0.2+Math.random()*0.4};
      `;
      container.appendChild(p);
    }
  })();

  // ── Intersection Observer for split animation ──
  (function(){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ct-anim');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.ct-left, .ct-right').forEach(el => io.observe(el));
  })();

  // ── Ripple on submit button ──
  document.getElementById('ctSubmit').addEventListener('click', function(e) {
    const btn = this;
    const r = document.createElement('span');
    r.className = 'ct-ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
    `;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  });

  // ── Form validation & submission ──
  document.getElementById('ctSubmit').addEventListener('click', function() {
    const name    = document.getElementById('ct-name');
    const email   = document.getElementById('ct-email');
    const message = document.getElementById('ct-message');
    let valid = true;

    // reset errors
    ['fName','fEmail','fMsg'].forEach(id => document.getElementById(id).classList.remove('error'));

    if (!name.value.trim()) { document.getElementById('fName').classList.add('error'); valid = false; }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email.value.trim())) { document.getElementById('fEmail').classList.add('error'); valid = false; }

    if (!message.value.trim()) { document.getElementById('fMsg').classList.add('error'); valid = false; }

    if (valid) {
      const serviceId = 'service_916cx4w';
      const templateId = 'template_nxx8mlt';
      const templateParams = {
        from_name: name.value.trim(),
        from_email: email.value.trim(),
        message: message.value.trim()
      };

      const submitBtn = document.getElementById('ctSubmit');
      submitBtn.disabled = true;

      if (window.emailjs && typeof emailjs.send === 'function') {
        emailjs.send(serviceId, templateId, templateParams)
          .then(() => {
            document.getElementById('ctFormInner').style.display = 'none';
            document.getElementById('ctSuccess').classList.add('show');
            submitBtn.disabled = false;
            // clear fields
            name.value = '';
            email.value = '';
            message.value = '';
          })
          .catch((err) => {
            console.error('EmailJS send error:', err);
            alert('Failed to send message — please try again later.');
            submitBtn.disabled = false;
          });
      } else {
        // Fallback: show success locally if EmailJS not available
        document.getElementById('ctFormInner').style.display = 'none';
        document.getElementById('ctSuccess').classList.add('show');
        submitBtn.disabled = false;
      }
    }
  });
  


// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// close on outside click
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMenu();
});

// ── Navbar: add .scrolled class on scroll ──
const topnav = document.getElementById('topnav');
window.addEventListener('scroll', () => {
  topnav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Navbar: active link highlight ──
const allSections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.topnav-links a, .mobile-menu a:not(.mobile-menu-cta)');
window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });



/* Scroll Progress */
(function(){
  const bar = document.getElementById('scroll-progress');
  if(!bar) return;
  window.addEventListener('scroll', ()=>{
    const t = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / t * 100) + '%';
  }, {passive:true});
})();

/* Reveal on scroll */
(function(){
  const els = document.querySelectorAll('.section-label,.card,.svc-card,.proj-c,.about-kw,.footer-col,.stat-row');
  els.forEach(el => {
    if(!el.classList.contains('reveal')){
      el.classList.add('reveal');
      const sibs = el.parentElement ? [...el.parentElement.children].filter(c=>c.classList.contains('reveal')) : [];
      const i = sibs.indexOf(el);
      if(i===1) el.classList.add('reveal-delay-1');
      if(i===2) el.classList.add('reveal-delay-2');
      if(i===3) el.classList.add('reveal-delay-3');
    }
  });
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); } });
  }, {threshold:0.1, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* Card Tilt */
(function(){
  document.querySelectorAll('.card,.svc-card,.proj-c').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-0.5;
      const y = (e.clientY-r.top)/r.height-0.5;
      card.style.transform = `perspective(700px) rotateY(${x*7}deg) rotateX(${-y*7}deg) scale(1.012)`;
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)';
      card.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    });
  });
})();

/* Magnetic Buttons */
(function(){
  document.querySelectorAll('.cta-primary,.cta-ghost,.nav-hire,.ct-submit').forEach(btn=>{
    btn.addEventListener('mouseenter', ()=>{ btn.style.transition='transform 0.1s ease'; });
    btn.addEventListener('mousemove', e=>{
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.2}px,${(e.clientY-r.top-r.height/2)*0.2}px)`;
    });
    btn.addEventListener('mouseleave', ()=>{
      btn.style.transition='transform 0.45s cubic-bezier(0.16,1,0.3,1)';
      btn.style.transform='translate(0,0)';
    });
  });
})();

/* Page fade-in */
(function(){
  document.body.style.opacity='0';
  document.body.style.transition='opacity 0.45s ease';
  const show=()=>{document.body.style.opacity='1';};
  window.addEventListener('load',()=>requestAnimationFrame(show));
  setTimeout(show, 600);
})();
