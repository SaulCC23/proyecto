// ========================================================
//  BOTÓN SUBIR ARRIBA
//  Requisito: botón que regrese al inicio suavemente
// ========================================================

const btnSubir = document.getElementById('btnSubir');

if (btnSubir) {
  // Mostrar u ocultar el botón según la posición del scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btnSubir.style.display = 'flex';
    } else {
      btnSubir.style.display = 'none';
    }
  });

  // Al hacer click, regreso suave al tope de la página
  btnSubir.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ============================================================
   NAVBAR CHANGE ON SCROLL
   ============================================================ */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('header-scroll');
  } else {
    header.classList.remove('header-scroll');
  }
});

/* ============================================================
   MENÚ MÓVIL (con animación slideDown del CSS)
   ============================================================ */
const btnMenu = document.getElementById("btnMenu");
const navPrincipal = document.querySelector(".nav-principal");

if (btnMenu && navPrincipal) {
  btnMenu.addEventListener('click', () => {
    // Solo alternamos la clase nav-activo.
    // En movil.css esa clase hace que el menú se muestre.
    navPrincipal.classList.toggle('nav-activo');
  });
}

// Opcional: cerrar el menú al dar click en un enlace (en móvil)
const enlacesNav = document.querySelectorAll('.nav-principal a');
enlacesNav.forEach(enlace => {
  enlace.addEventListener('click', () => {
    if (navPrincipal.classList.contains('nav-activo')) {
      navPrincipal.classList.remove('nav-activo');
    }
  });
});

// ========================================================
//  PORTFOLIO - FILTROS
//  Requisito: manipulación del DOM (filtros de imágenes)
// ========================================================

const botonesFiltro = document.querySelectorAll('.btn-filtro');
const itemsPortfolio = document.querySelectorAll('.item-portfolio');

if (botonesFiltro.length && itemsPortfolio.length) {
  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      const filtro = boton.getAttribute('data-filtro');

      // Quitar clase activo a todos los botones
      botonesFiltro.forEach(b => b.classList.remove('activo'));
      boton.classList.add('activo');

      // Mostrar u ocultar imágenes según categoría
      itemsPortfolio.forEach(item => {
        const categoria = item.getAttribute('data-cat');

        if (filtro === 'all' || filtro === categoria) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ========================================================
//  SLIDER CLIENTES (CARRUSEL)
//  Requisito: CARRUSEL con flechas izquierda/derecha y puntos
// ========================================================

const contSlider = document.getElementById('sliderClientes');
const itemsTestimonio = document.querySelectorAll('.item-testimonio');
const puntosSlider = document.querySelectorAll('.punto');

let indiceActual = 0;
let intervaloSlider = null;

function mostrarTestimonio(indice) {
  if (!itemsTestimonio.length) return;

  // Normalizamos el índice para que nunca se salga de rango
  if (indice < 0) indice = itemsTestimonio.length - 1;
  if (indice >= itemsTestimonio.length) indice = 0;

  // Ocultamos todos los slides
  itemsTestimonio.forEach(t => t.classList.remove('activo'));
  puntosSlider.forEach(p => p.classList.remove('activo'));

  // Mostramos el slide y el punto actual
  itemsTestimonio[indice].classList.add('activo');
  if (puntosSlider[indice]) {
    puntosSlider[indice].classList.add('activo');
  }

  indiceActual = indice;
}

// Función para iniciar el auto-play del carrusel
function iniciarAutoSlider() {
  // Limpio cualquier intervalo anterior
  if (intervaloSlider) clearInterval(intervaloSlider);

  // Cambio automático cada 7 segundos
  intervaloSlider = setInterval(() => {
    mostrarTestimonio(indiceActual + 1);
  }, 7000);
}

// Inicialización del slider si hay elementos
if (contSlider && itemsTestimonio.length) {
  // Mostrar el primer testimonio
  mostrarTestimonio(0);
  iniciarAutoSlider();

  // --- Puntos del slider ---
  puntosSlider.forEach(punto => {
    punto.addEventListener('click', () => {
      const indice = parseInt(punto.getAttribute('data-indice'), 10);
      mostrarTestimonio(indice);
      iniciarAutoSlider(); // reset al usar los puntos
    });
  });

  // --- Flechas izquierda/derecha (creadas dinámicamente) ---

  // Botón izquierda
  const btnPrev = document.createElement('button');
  btnPrev.className = 'btn-slider prev';
  btnPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

  // Botón derecha
  const btnNext = document.createElement('button');
  btnNext.className = 'btn-slider next';
  btnNext.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

  // Agregamos las flechas al contenedor del slider
  contSlider.appendChild(btnPrev);
  contSlider.appendChild(btnNext);

  // Eventos de click en las flechas
  btnPrev.addEventListener('click', () => {
    mostrarTestimonio(indiceActual - 1);
    iniciarAutoSlider();
  });

  btnNext.addEventListener('click', () => {
    mostrarTestimonio(indiceActual + 1);
    iniciarAutoSlider();
  });
}

// ========================================================
//  CARRUSEL BLOQUE ABOUT (3 IMÁGENES + FLECHAS)
//  Requisito: slider de imágenes en el About y la del medio
//  se queda como principal (con el botón de play encima).
// ========================================================

const aboutSlider = document.getElementById('aboutSlider');

if (aboutSlider) {
  const aboutSlides = aboutSlider.querySelectorAll('.about-slide');
  const btnPrevAbout = aboutSlider.querySelector('.flecha-about--prev');
  const btnNextAbout = aboutSlider.querySelector('.flecha-about--next');

  // Empezamos en la imagen central (índice 1)
  let indiceAbout = 1;

  function mostrarSlideAbout(indice) {
    if (!aboutSlides.length) return;

    // Normalizamos el índice para que no se salga del rango
    if (indice < 0) {
      indiceAbout = aboutSlides.length - 1;
    } else if (indice >= aboutSlides.length) {
      indiceAbout = 0;
    } else {
      indiceAbout = indice;
    }

    // Quitamos la clase activo de todos
    aboutSlides.forEach(slide => slide.classList.remove('activo'));
    // Activamos sólo el slide actual
    aboutSlides[indiceAbout].classList.add('activo');
  }

  // Mostrar el slide inicial (la imagen del medio)
  mostrarSlideAbout(indiceAbout);

  // Flecha izquierda
  if (btnPrevAbout) {
    btnPrevAbout.addEventListener('click', () => {
      mostrarSlideAbout(indiceAbout - 1);
    });
  }

  // Flecha derecha
  if (btnNextAbout) {
    btnNextAbout.addEventListener('click', () => {
      mostrarSlideAbout(indiceAbout + 1);
    });
  }
}

// ========================================================
//  ACORDEÓN FAQ
//  Requisito: uso de jQuery/JS para mostrar/ocultar contenido
// ========================================================

const itemsAcordeon = document.querySelectorAll('.item-acordeon');

if (itemsAcordeon.length) {
  itemsAcordeon.forEach(item => {
    const titulo = item.querySelector('.titulo-acordeon');

    titulo.addEventListener('click', () => {
      // Si ya está abierto se cierra
      if (item.classList.contains('activo')) {
        item.classList.remove('activo');
        const icono = titulo.querySelector('i');
        if (icono) {
          icono.classList.remove('fa-chevron-up');
          icono.classList.add('fa-chevron-down');
        }
      } else {
        // Cerrar todos primero
        itemsAcordeon.forEach(it => {
          it.classList.remove('activo');
          const icono = it.querySelector('.titulo-acordeon i');
          if (icono) {
            icono.classList.remove('fa-chevron-up');
            icono.classList.add('fa-chevron-down');
          }
        });

        // Abrir el actual
        item.classList.add('activo');
        const iconoActual = titulo.querySelector('i');
        if (iconoActual) {
          iconoActual.classList.remove('fa-chevron-down');
          iconoActual.classList.add('fa-chevron-up');
        }
      }
    });
  });
}

// ========================================================
//  FANCYBOX - GALERÍA DE FOTOS
//  Requisito 22: LIGHTBOX para las imágenes del sitio
// ========================================================

if (window.Fancybox) {
  // Las imágenes del portfolio tienen data-fancybox="galeria"
  Fancybox.bind('[data-fancybox="galeria"]', {
    Thumbs: {
      autoStart: false
    }
    // Se puede ampliar la config si el profe lo pide
  });
}

// ========================================================
//  VIDEO EN MODAL CON FANCYBOX
//  Requisito: mostrar video en modal (usa mismo Fancybox)
// ========================================================

const btnPlay = document.querySelector('.btn-play');

if (btnPlay && window.Fancybox) {
  btnPlay.addEventListener('click', (e) => {
    e.preventDefault();

    // Abrimos un video de YouTube dentro de Fancybox.
    // Puedes cambiar la URL por otra que prefieras.
    Fancybox.show([
      {
        src: 'https://www.youtube.com/embed/8hP9D6kZseM?autoplay=1',
        type: 'iframe'
      }
    ]);
  });
}

// ========================================================
//  VALIDACIÓN FORMULARIO CITA (REQ 16)
//  Requisito: validación de campos vacíos en el formulario de cita
// ========================================================

const btnCita = document.getElementById('btnCita');

if (btnCita) {
  btnCita.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el submit real (si fuera un form) o recarga

    const nombre = document.getElementById('citaNombre').value.trim();
    const correo = document.getElementById('citaCorreo').value.trim();
    const telefono = document.getElementById('citaTelefono').value.trim();
    const fecha = document.getElementById('citaFecha').value.trim();
    const categoria = document.getElementById('citaCategoria').value;

    if (nombre === '' || correo === '' || telefono === '' || fecha === '' || categoria === '') {
      alert('Por favor completa todos los campos para agendar tu cita.');
    } else {
      // Aquí iría la lógica backend (AJAX/Fetch)
      alert('¡Cita solicitada con éxito!\nNos pondremos en contacto contigo.');
      // Opcional: limpiar campos
      document.getElementById('citaNombre').value = '';
      document.getElementById('citaCorreo').value = '';
      document.getElementById('citaTelefono').value = '';
      document.getElementById('citaFecha').value = '';
      document.getElementById('citaCategoria').value = '';
    }
  });
}

// ========================================================
//  VALIDACIÓN FORMULARIO CONTACTO (REQ 16)
//  Requisito: validación de contacto
// ========================================================

const formConsult = document.getElementById('formConsult');

if (formConsult) {
  formConsult.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('consultName').value.trim();
    const email = document.getElementById('consultEmail').value.trim();
    const asunto = document.getElementById('consultSubject').value.trim();
    const mensaje = document.getElementById('consultMessage').value.trim();

    if (nombre === '' || email === '' || asunto === '' || mensaje === '') {
      alert('Por favor rellena todos los datos de contacto.');
    } else {
      alert('Mensaje enviado. ¡Gracias por contactarnos!');
      formConsult.reset();
    }
  });
}

// ========================================================
//  VALIDACIÓN NEWSLETTER
// ========================================================

const formNews = document.getElementById('formNews');

if (formNews) {
  formNews.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsEmail').value.trim();

    if (email === '') {
      alert('Escribe tu correo para suscribirte.');
    } else {
      alert('¡Gracias por suscribirte a nuestro newsletter!');
      formNews.reset();
    }
  });
}

// ========================================================
//  MODAL OFERTA ESPECIAL (REQ 23)
//  Requisito: ventana modal con información/oferta
// ========================================================

const btnAbrirModal = document.getElementById('btnAbrirModal');

if (btnAbrirModal && window.Fancybox) {
  btnAbrirModal.addEventListener('click', () => {
    Fancybox.show([
      {
        src: `
          <div style="padding:40px; text-align:center; max-width:500px;">
            <h2 style="color:#c6857d; margin-bottom:20px;">SPECIAL OFFER!</h2>
            <p style="font-size:1.1rem; color:#444;">
              Get <strong>50% OFF</strong> on your first Hair Treatment this week.
            </p>
            <p style="margin-top:20px; color:#666;">
              Use code: <strong>BASIT50</strong>
            </p>
          </div>
        `,
        type: 'html'
      }
    ]);
  });
}


/* ============================================================
   ANIMACIONES EXACTAS: Scroll Reveal + Hero Reveal
   ============================================================ */

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.25
  }
);

// Aplicar animado a TODAS las secciones
document.querySelectorAll(".animado").forEach((el) => observador.observe(el));

// HERO animación especial
const hero = document.querySelector(".hero");
if (hero) observador.observe(hero);

// Tarjetas individuales (services, blog, specialists)
document.querySelectorAll(".tarjeta-servicio").forEach((el) => observador.observe(el));
document.querySelectorAll(".card-blog").forEach((el) => observador.observe(el));
document.querySelectorAll(".card-especialista").forEach((el) => observador.observe(el));




