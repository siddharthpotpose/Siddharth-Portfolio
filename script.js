  
    // ===== PRELOADER =====
    const loaderFill = document.getElementById('loaderFill');
    let pct = 0;
    const loaderTimer = setInterval(() => {
      pct += Math.random() * 20;
      if (pct >= 100) {
        pct = 100; clearInterval(loaderTimer);
        setTimeout(() => {
          const pre = document.getElementById('preloader');
          pre.style.transition = 'opacity 0.5s';
          pre.style.opacity = '0';
          setTimeout(() => { pre.style.display = 'none'; initAll(); }, 500);
        }, 250);
      }
      loaderFill.style.width = Math.min(pct, 100) + '%';
    }, 70);

    // ===== CURSOR GLOW EFFECT =====
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', e => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });

    // ===== PARTICLES JS =====
    particlesJS('particles-js', {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 1000 } },
        color: { value: ['#6C63FF', '#00D4FF', '#FF4D8D'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#6C63FF',
          opacity: 0.3,
          width: 1
        },
        move: { enable: true, speed: 2, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' }
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });

    function initAll() {
      // ===== TYPED.JS =====
      new Typed('#typed-el', {
        strings: ['Front-End Developer','Angular Developer','TypeScript Developer','Website Operations','API Integration','Digital Content Manager'],
        typeSpeed: 60, backSpeed: 30, backDelay: 2200, loop: true
      });

      // ===== AOS =====
      AOS.init({ duration: 820, easing: 'ease-out-cubic', once: true, offset: 60 });

      // ===== GSAP =====
      gsap.registerPlugin(ScrollTrigger);

      // Hero
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-badge', { opacity:0, y:30, duration:.7 }, 0.1)
        .from('.hero-title', { opacity:0, y:50, duration:.85 }, 0.25)
        .from('.hero-typed-wrap', { opacity:0, y:25, duration:.7 }, 0.45)
        .from('.hero-desc', { opacity:0, y:25, duration:.7 }, 0.6)
        .from('.hero-cta', { opacity:0, y:25, duration:.7 }, 0.75)
        .from('.avatar-wrap', { opacity:0, scale:0.75, duration:1, ease:'back.out(1.7)' }, 0.3)
        .from('.float-chip', { opacity:0, y:20, stagger:.15, duration:.7 }, 0.9);

      // Avatar parallax
      gsap.to('.avatar-wrap', { yPercent:-18, ease:'none',
        scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:true }});

      // Counters
      document.querySelectorAll('.counter').forEach(el => {
        const tgt = parseInt(el.dataset.target);
        ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:() => {
          gsap.to({v:0},{v:tgt,duration:2,ease:'power2.out',
            onUpdate:function(){ el.textContent = Math.ceil(this.targets()[0].v)+(tgt===100?'%':'+'); }});
        }});
      });

      // Services stagger
      gsap.from('.svc-card',{ opacity:0,y:50,stagger:.1,duration:.8,
        scrollTrigger:{trigger:'#services',start:'top 72%'}});

      // Timeline
      gsap.from('.tl-item',{ opacity:0,x:-36,stagger:.18,duration:.85,
        scrollTrigger:{trigger:'.tl',start:'top 80%'}});

      // AI cards
      gsap.from('.ai-card',{ opacity:0,y:55,stagger:.1,duration:.8,
        scrollTrigger:{trigger:'#ai-skills',start:'top 72%'}});

      // Skill bars on scroll
      function animBars() {
        document.querySelectorAll('.sk-fill:not(.done)').forEach(b => {
          if(b.getBoundingClientRect().top < window.innerHeight+20) {
            b.classList.add('done'); b.style.width = b.dataset.fill+'%';
          }
        });
      }
      window.addEventListener('scroll', animBars, {passive:true});
      animBars();

      // ===== VANILLA TILT =====
      VanillaTilt.init(document.querySelectorAll('.svc-card'), { max:7, speed:400, glare:true, 'max-glare':.12 });
      VanillaTilt.init(document.querySelectorAll('.ai-card'), { max:5, speed:400, glare:true, 'max-glare':.08 });

      // ===== SWIPER =====
      if (document.querySelector('.mySwiper')) {
        new Swiper('.mySwiper', {
          slidesPerView:1, spaceBetween:22, loop:true,
          autoplay:{ delay:4200, disableOnInteraction:false },
          pagination:{ el:'.swiper-pagination', clickable:true },
          breakpoints:{ 768:{slidesPerView:2}, 1200:{slidesPerView:3} }
        });
      }
    }

    // ===== SCROLL PERFORMANCE =====
    const scrollCache = {
      mainNav: document.getElementById('mainNav'),
      btt: document.getElementById('btt'),
      blob1: document.querySelector('.blob-1'),
      blob2: document.querySelector('.blob-2'),
      blob3: document.querySelector('.blob-3'),
      secEls: document.querySelectorAll('section[id]'),
      navLinks: document.querySelectorAll('.nav-link')
    };

    let scrollRaf = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;

      if (scrollCache.mainNav) {
        scrollCache.mainNav.classList.toggle('scrolled', scrollY > 50);
      }
      if (scrollCache.btt) {
        scrollCache.btt.classList.toggle('show', scrollY > 600);
      }

      if (scrollCache.blob1) scrollCache.blob1.style.transform = `translateY(${scrollY * 0.15}px)`;
      if (scrollCache.blob2) scrollCache.blob2.style.transform = `translateY(${scrollY * -0.12}px)`;
      if (scrollCache.blob3) scrollCache.blob3.style.transform = `translateY(${scrollY * 0.08}px)`;

      if (scrollCache.secEls.length) {
        let cur = '';
        scrollCache.secEls.forEach(s => {
          if (scrollY >= s.offsetTop - 110) {
            cur = s.id;
          }
        });
        scrollCache.navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
        });
      }

      scrollRaf = false;
    };

    window.addEventListener('scroll', () => {
      if (!scrollRaf) {
        scrollRaf = true;
        requestAnimationFrame(updateScrollState);
      }
    }, {passive:true});

    // ===== SKILLS TABS =====
    document.querySelectorAll('.stab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.stab').forEach(b=>b.classList.remove('active'));
        document.querySelectorAll('.skill-panel').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        const p = document.getElementById('stab-'+btn.dataset.stab);
        if(p) {
          p.classList.add('active');
          setTimeout(()=>p.querySelectorAll('.sk-fill').forEach(b=>b.style.width=b.dataset.fill+'%'),60);
        }
      });
    });

    // ===== PORTFOLIO FILTER =====
    document.querySelectorAll('.pf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pf-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.pf;
        document.querySelectorAll('.pf-item').forEach(item => {
          const show = f==='all'||item.dataset.cat===f;
          item.style.transition = 'opacity .35s, transform .35s';
          item.style.opacity = show?'1':'0.2';
          item.style.transform = show?'scale(1)':'scale(0.95)';
          item.style.pointerEvents = show?'all':'none';
        });
      });
    });

    // ===== CONTACT FORM =====
    setupWhatsAppContactForm();

    // ===== YOUTUBE CHANNEL CHOOSER =====
    (function(){
      const channels = [
        { name: 'ConsTru', url: 'https://www.youtube.com/@constru-ind' },
        { name: 'The Detox Mind', url: 'https://www.youtube.com/@thedetoxmind-7/shorts' }
      ];

      const ytWrapper = document.querySelector('.yt-wrapper');
      if (!ytWrapper) return;

      const menu = document.createElement('div');
      menu.id = 'yt-choice-menu';
      menu.innerHTML = channels.map(c => `<a href="${c.url}" target="_blank" rel="noopener">${c.name}</a>`).join('');
      ytWrapper.appendChild(menu);
    })();

    // ===== INSTAGRAM CHANNEL CHOOSER =====
    (function(){
      const igAccounts = [
        { name: 'ConsTru India', url: 'https://www.instagram.com/constru.india' },
        { name: 'Siddharth', url: null }
      ];

      const igWrapper = document.querySelector('.ig-wrapper');
      if (!igWrapper) return;

      const menu = document.createElement('div');
      menu.id = 'ig-choice-menu';
      menu.innerHTML = igAccounts.map(a => a.url ? `<a href="${a.url}" target="_blank" rel="noopener">${a.name}</a>` : `<span class="ig-disabled">${a.name}</span>`).join('');
      igWrapper.appendChild(menu);
    })();
  
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('btt');
  const cursorGlow = document.querySelector('.cursor-glow');
  const loaderFill = document.getElementById('loaderFill');
  const preloader = document.getElementById('preloader');

  if (loaderFill) {
    let progress = 0;
    const loaderTimer = window.setInterval(() => {
      progress = Math.min(progress + Math.floor(Math.random() * 18) + 8, 100);
      loaderFill.style.width = `${progress}%`;

      if (progress >= 100) {
        window.clearInterval(loaderTimer);
        window.setTimeout(() => {
          if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            preloader.style.transition = 'opacity 0.45s ease';
          }
        }, 250);
      }
    }, 120);
  }

  if (cursorGlow) {
    window.addEventListener('pointermove', (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }

  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  if (window.Typed && document.getElementById('typed-el')) {
    new Typed('#typed-el', {
      strings: [
        'Angular Front-End Developer',
        'REST API Integration',
        'Responsive SPA Development',
        'Website and Digital Operations'
      ],
      typeSpeed: 45,
      backSpeed: 24,
      backDelay: 1400,
      loop: true
    });
  }

  if (window.particlesJS && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: ['#7c3aed', '#06b6d4', '#ec4899'] },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#7c3aed',
          opacity: 0.18,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.4,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.28 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  const updateScrollUi = () => {
    const scrolled = window.scrollY > 80;
    nav?.classList.toggle('scrolled', scrolled);
    backToTop?.classList.toggle('show', window.scrollY > 500);
  };

  updateScrollUi();
  window.addEventListener('scroll', updateScrollUi, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const navMenu = document.getElementById('navMenu');
      if (navMenu?.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });

  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll('.stab').forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.dataset.stab;
      if (!tab) return;

      document.querySelectorAll('.stab').forEach((item) => item.classList.remove('active'));
      document.querySelectorAll('.skill-panel').forEach((panel) => panel.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(`stab-${tab}`)?.classList.add('active');
      animateSkillBars();
    });
  });

  const animateSkillBars = () => {
    document.querySelectorAll('.skill-panel.active .sk-fill').forEach((bar) => {
      bar.style.width = `${bar.dataset.fill || 0}%`;
    });
  };

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateSkillBars();
        observer.disconnect();
      }
    }, { threshold: 0.25 });

    skillObserver.observe(skillsSection);
  }

  document.querySelectorAll('.pf-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.pf || 'all';

      document.querySelectorAll('.pf-btn').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      document.querySelectorAll('.pf-item').forEach((item) => {
        const shouldShow = filter === 'all' || item.dataset.cat === filter;
        item.style.display = shouldShow ? '' : 'none';
      });

      if (window.AOS) AOS.refresh();
    });
  });

  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target || 0);
        const duration = 1100;
        const start = performance.now();

        const tick = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          counter.textContent = Math.round(target * progress);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(counter);
      });
    }, { threshold: 0.6 });

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.svc-card, .pf-item, .ai-card, .plat-card'), {
      max: 8,
      speed: 500,
      glare: true,
      'max-glare': 0.12
    });
  }

  if (window.gsap) {
    gsap.from('.hero-badge, .hero-title, .hero-typed-wrap, .hero-desc, .hero-cta, .info-strip', {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.11,
      ease: 'power3.out',
      delay: 0.25
    });
  }

  setupWhatsAppContactForm();
  setupYoutubeVideoCards();

  createSocialMenu({
    wrapperSelector: '.yt-wrapper',
    menuId: 'yt-choice-menu',
    links: [
      { label: 'The Detox Mind', href: 'https://youtube.com/@thedetoxmind-7' },
      { label: 'ConsTru', href: 'https://youtube.com/@Constru-Ind' }
    ]
  });

  createSocialMenu({
    wrapperSelector: '.ig-wrapper',
    menuId: 'ig-choice-menu',
    links: [
      { label: 'Instagram link coming soon', disabled: true }
    ]
  });
});

function setupWhatsAppContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm || contactForm.dataset.whatsappReady === 'true') return;

  contactForm.dataset.whatsappReady = 'true';
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const text = [
      'New portfolio inquiry',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Message: ${message}`
    ].join('\n');
    const whatsAppUrl = `https://wa.me/918485896373?text=${encodeURIComponent(text)}`;
    const btn = contactForm.querySelector('.sub-btn');

    if (btn) {
      btn.innerHTML = '<i class="fa-brands fa-whatsapp me-2"></i>Opening WhatsApp';
      btn.style.background = '#25D366';
    }

    window.open(whatsAppUrl, '_blank', 'noopener');

    window.setTimeout(() => {
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Send Message';
        btn.style.background = '';
      }
      contactForm.reset();
    }, 1200);
  });
}

function setupYoutubeVideoCards() {
  document.querySelectorAll('.yt-audio-btn').forEach((button) => {
    if (button.dataset.audioReady === 'true') return;
    button.dataset.audioReady = 'true';

    button.addEventListener('click', () => {
      const iframe = button.closest('.yt-frame-wrap')?.querySelector('iframe');
      if (!iframe?.contentWindow) return;

      const isMuted = button.dataset.muted !== 'false';
      const command = isMuted ? 'unMute' : 'mute';
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
      }), '*');

      button.dataset.muted = isMuted ? 'false' : 'true';
      button.setAttribute('aria-label', isMuted ? 'Mute video' : 'Unmute video');
      button.setAttribute('title', isMuted ? 'Mute video' : 'Unmute video');
      button.innerHTML = isMuted
        ? '<i class="fa-solid fa-volume-high"></i>'
        : '<i class="fa-solid fa-volume-xmark"></i>';
    });
  });
}

function createSocialMenu({ wrapperSelector, menuId, links }) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper || document.getElementById(menuId)) return;

  const menu = document.createElement('div');
  menu.id = menuId;

  links.forEach((item) => {
    const node = document.createElement(item.disabled ? 'span' : 'a');
    node.textContent = item.label;

    if (item.disabled) {
      node.className = 'ig-disabled';
    } else {
      node.href = item.href;
      node.target = '_blank';
      node.rel = 'noopener';
    }

    menu.appendChild(node);
  });

  wrapper.appendChild(menu);

  const trigger = wrapper.querySelector('a');
  trigger?.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = menu.style.display === 'flex';
    document.querySelectorAll('#yt-choice-menu, #ig-choice-menu').forEach((item) => {
      item.style.display = 'none';
    });
    menu.style.display = isOpen ? 'none' : 'flex';
  });

  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
}
