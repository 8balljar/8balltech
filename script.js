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
  

// STICKY NAV + FONDO DINÁMICO
window.addEventListener('scroll', () => {
  const nav  = document.getElementById('navbar'),
        hero = document.getElementById('hero'),
        max  = window.innerHeight,
        y    = Math.min(window.scrollY, max),
        p    = y/max,
        h1   = Math.round(230 + (280-230)*p),
        h2   = (h1+30)%360;

  // navbar
  if(window.scrollY>50){
    nav.classList.add('scrolled');
    nav.classList.remove('transparent');
  } else {
    nav.classList.add('transparent');
    nav.classList.remove('scrolled');
  }
  // fondo hero
  hero.style.background =
    `linear-gradient(135deg,
       hsl(${h1},70%,60%) ${Math.round(p*100)}%,
       hsl(${h2},60%,50%) 100%)`;
});

// ------------------------
// CALCULADORA DE SERVICIOS
// ------------------------
const servicesData = {
  web:         { price:200000, requiresHours:false },
  ecommerce:   { price:500000, requiresHours:false },
  maintenance: { price:30000,  requiresHours:true  },
  repair:      { price:40000,  requiresHours:true  }
};

document.addEventListener('DOMContentLoaded', () => {
  const cards      = document.querySelectorAll('.service-card');
  const form       = document.getElementById('calc-form');
  const svcs       = form.querySelectorAll('input[name="svc"]');
  const hoursField = document.getElementById('hours-field');
  const hoursInput = document.getElementById('hours');
  const svcErr     = document.getElementById('svc-error');
  const hrsErr     = document.getElementById('hours-error');
  const btnCalc    = document.getElementById('calculate-btn');
  const resultBox  = document.getElementById('result');

  // 1) Sincronizar tarjetas ↔ checkboxes
  cards.forEach(card => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      const key = card.dataset.service;
      const cb  = form.querySelector(`input[value="${key}"]`);
      cb.checked = !cb.checked;
      btn.classList.toggle('selected', cb.checked);
      toggleHoursField();
    });
  });

  // 2) Mostrar/ocultar horas
  svcs.forEach(cb => cb.addEventListener('change', toggleHoursField));
  function toggleHoursField(){
    const any = Array.from(svcs)
      .some(i=>i.checked && servicesData[i.value].requiresHours);
    hoursField.style.display = any ? 'block' : 'none';
  }

  // 3) Calcular
  btnCalc.addEventListener('click', () => {
    svcErr.textContent = '';
    hrsErr.textContent = '';
    resultBox.classList.remove('visible');

    const sel = Array.from(svcs).filter(i=>i.checked).map(i=>i.value);
    if(sel.length===0){
      svcErr.textContent = 'Selecciona al menos un servicio.';
      return;
    }
    const needsHours = sel.some(k=>servicesData[k].requiresHours);
    let hrs = 1;
    if(needsHours){
      hrs = parseInt(hoursInput.value,10);
      if(isNaN(hrs)||hrs<1){
        hrsErr.textContent = 'Horas ≥ 1.';
        return;
      }
    }

    let total = 0;
    sel.forEach(k => {
      const {price,requiresHours} = servicesData[k];
      total += requiresHours? price*hrs : price;
    });

    resultBox.textContent = `Total estimado: $${total.toLocaleString('es-CL')} CLP`;
    resultBox.classList.add('visible');
  });
});

// cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // delega clicks desde todo #services
  document.getElementById('services')
    .addEventListener('click', function(e) {
      if (e.target.classList.contains('add-sub')) {
        const card    = e.target.closest('.subservice');
        const title   = card.querySelector('h4').textContent;
        const price   = card.querySelector('.price').textContent;
        // aquí haces lo que quieras, por ejemplo:
        console.log(`Agregaste el sub-servicio "${title}" (${price})`);
        // más adelante podrías actualizar tu calculadora...
        alert(`Agregaste "${title}" al presupuesto`);
      }
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
  card.addEventListener('click', e => {
    // Mostrar u ocultar pop-over
    const pop = card.querySelector('.subservices');
    const isOpen = pop.style.opacity === '1';
    pop.style.opacity = isOpen ? '0' : '1';
    pop.style.pointerEvents = isOpen ? 'none' : 'auto';
  });
});

// Para cerrar al hacer clic fuera
document.addEventListener('click', e => {
  if (!e.target.closest('.has-subservices')) {
    document.querySelectorAll('.subservices').forEach(pop => {
      pop.style.opacity = '0';
      pop.style.pointerEvents = 'none';
    });
  }
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