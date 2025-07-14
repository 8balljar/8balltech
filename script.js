// ANIME.JS: línea de tiempo de la laptop + subtítulo
window.addEventListener('DOMContentLoaded', () => {
  const tl = anime.timeline({ autoplay: true });

  tl
    // 1) marco
    .add({
      targets: '#screen-outline',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 700, easing: 'easeInOutSine'
    })
    // 2) cámara
    .add({
      targets: '#camera-light',
      opacity: [0,1], duration:300, easing:'easeOutQuad'
    }, '-=200')
    // 3) aro exterior
    .add({
      targets: '#outer-ring',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 600, easing:'easeInOutSine'
    }, '-=200')
    // 4) interior
    .add({
      targets: '#inner-circle',
      scale:[0,1], opacity:[0,1],
      duration:400, easing:'easeOutBack'
    }, '-=200')
    // 5) “8”
    .add({
      targets: '#eight',
      scale:[0,1], opacity:[0,1],
      duration:400, easing:'easeOutBack'
    }, '-=200')
    // 6) base
    .add({
      targets: '#base-slab',
      scaleY:[0,1], opacity:[0,1],
      duration:400, easing:'easeOutBack'
    }, '-=200')
    // 7) “8BallTech”
    .add({
      targets: '#logo-text',
      translateY:[-20,0], opacity:[0,1],
      duration:600, easing:'easeOutBack'
    }, '+=100')
    // 8) aparece subtitle
    .add({
      targets: '#subtitle',
      opacity:[0,1], translateY:[-10,0],
      duration:500, easing:'easeOutQuad'
    }, '+=200');

  // 9) al finalizar, arrancar typewriter
  tl.finished.then(() => {
    typeWriter('#subtitle','Reparamos lo que falla.\nCreamos lo que imaginas',100);
  });
});

// MÁQUINA DE ESCRIBIR
function typeWriter(sel, text, speed) {
  const el = document.querySelector(sel);
  el.innerHTML = '<span class="typewriter-cursor"></span>'; // solo cursor al inicio
  el.style.opacity = 1;
  el.style.transform = 'translateY(0)';
  let i = 0;

  function escribir() {
    if (i < text.length) {
      const char = text.charAt(i++);
      const content = el.innerHTML.replace('<span class="typewriter-cursor"></span>', '');
      el.innerHTML = content + (char === '\n' ? '<br>' : char) + '<span class="typewriter-cursor"></span>';
      setTimeout(escribir, speed);
    } else {
      const cursor = el.querySelector('.typewriter-cursor');
      if (cursor) cursor.remove();
    }
  }

  escribir();
}
  

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

/* hambuerger */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  });

  // Cierra el menú cuando se hace clic en un enlace
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
});

// 1) Capturamos el overlay
const overlay = document.getElementById('services-overlay');

// 2) Para cada tarjeta con subservicios
document.querySelectorAll('.has-subservices')
  .forEach(card => {
    card.addEventListener('mouseenter', () => {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    });
    card.addEventListener('mouseleave', () => {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    });
});

// 3) Para que, si el mouse entra en el pop-over, no desaparezca
document.querySelectorAll('.subservices')
  .forEach(pop => {
    pop.addEventListener('mouseenter', () => {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    });
    pop.addEventListener('mouseleave', () => {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    });
});

document.querySelectorAll('.has-subservices').forEach(card => {
  card.addEventListener('click', (e) => {
    // SOLO EJECUTAR EN ESCRITORIO
    if (window.innerWidth >= 769) {
      e.stopPropagation();
      card.classList.toggle('active');
      document.getElementById('services-overlay').style.opacity = '1';
      document.getElementById('services-overlay').style.pointerEvents = 'auto';
    }
  });
});

// Click fuera para cerrar
document.getElementById('services-overlay').addEventListener('click', () => {
  document.querySelectorAll('.has-subservices').forEach(card => card.classList.remove('active'));
  document.getElementById('services-overlay').style.opacity = '0';
  document.getElementById('services-overlay').style.pointerEvents = 'none';
});


//FAQ
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () =>{
      const isOpen = btn.classList.contains('open');

      //cierra todos
      faqItems.forEach(i => {
        const btn = i.querySelector('.faq-question');
        const ans = i.querySelector('.faq-answer');
        btn.classList.remove('open');
        ans.style.maxHeight = null;
      });

      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('activate');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.pricing-tabs .tab');
  const panels = document.querySelectorAll('.pricing-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => {
        p.classList.remove('show','left-in','right-in');
        p.style.zIndex = 0;
      });

      tab.classList.add('active');
      const selectedId = tab.dataset.tab;
      const panel = document.getElementById(selectedId);

      const isLeft = selectedId === 'programs';
      panel.classList.add('show', isLeft ? 'left-in' : 'right-in');
      panel.style.zIndex = 1;
    });
  });
});