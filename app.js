const botones = document.querySelectorAll('.btn-contacto, .btn-porque');
botones.forEach(btn => {
    btn.addEventListener('click', () => {
        window.open('https://wa.me/573233404121?text=Hola%20Estoy%20interesad@%20en%20tus%20servicios','_blank');
    })
})

/*Swiper Imagenes */

const swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 20,
  centeredSlides: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*Swiper comentarios*/
let swiperComentarios;

/*Abrir y Cerrar navbar*/

const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav");


toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// =====================
// MODAL
// =====================
const modal = document.getElementById("modal");
const openBtn = document.querySelector(".testimonio");
const closeBtn = document.getElementById("closeModal");

// abrir modal
if (openBtn) {
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });
}

// cerrar modal
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

// cerrar al hacer click fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});


// =====================
// ESTRELLAS ⭐
// =====================
const estrellas = document.querySelectorAll(".estrellas span");
let calificacion = 0;

estrellas.forEach((estrella) => {
  estrella.addEventListener("click", () => {
    calificacion = estrella.dataset.value;

    estrellas.forEach((e) => e.classList.remove("active"));

    for (let i = 0; i < calificacion; i++) {
      estrellas[i].classList.add("active");
    }
  });
});

// =====================
// FORMULARIO
// =====================
const form = document.getElementById("formComentario");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const servicio = document.getElementById("servicio").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (!calificacion) {
      alert("Por favor selecciona una calificación ⭐");
      return;
    }

    if (!nombre || !servicio || !comentario) {
      alert("Por favor completa todos los campos");
      return;
    }

    const data = {
      nombre,
      servicio,
      comentario,
      calificacion: Number(calificacion),
      fecha: new Date()
    };

    try {
      await firebase.database().ref("comentarios").push(data);

      alert("¡Comentario guardado!");

      form.reset();
      calificacion = 0;
      estrellas.forEach(e => e.classList.remove("active"));

      if (modal) modal.classList.remove("active");

      cargarComentarios();

    } catch (error) {
      console.error("Error Firebase:", error);
      alert("Error al guardar comentario");
    }
  });
}

async function cargarComentarios() {
  try {
    const snapshot = await firebase.database().ref("comentarios").once("value");
    const datos = snapshot.val();

    const contenedor = document.getElementById('contenedorComentarios');
    const promedioTexto = document.getElementById('promedioTexto');

    if (!contenedor) return;

    // 🔥 DESTRUIR SWIPER ANTES DE MODIFICAR EL DOM
    if (swiperComentarios) {
      swiperComentarios.destroy(true, true);
    }

    contenedor.innerHTML = "";

    if (!datos) {
      if (promedioTexto) {
        promedioTexto.innerHTML = "Sin opiniones aún";
      }
      return;
    }

    const comentarios = Object.values(datos);

    let totalEstrellas = 0;

    comentarios.forEach((c, i) => {
      const calif = Number(c.calificacion || 0);
      totalEstrellas += calif;

      let estrellasHTML = "⭐".repeat(calif);

      const card = `
        <div class="swiper-slide">
          <div class="card-comentarios ${(i % 3) + 1}">
            <p class="star">${estrellasHTML}</p>
            <p>"${c.comentario}"</p>
            <h4>${c.nombre}</h4>
            <p class="descripcion">${c.servicio}</p>
          </div>
        </div>
      `;

      contenedor.innerHTML += card;
    });

    // ⭐ PROMEDIO
    const promedio = (totalEstrellas / comentarios.length).toFixed(1);

    if (promedioTexto) {
      promedioTexto.innerHTML = `⭐ ${promedio} / 5 (${comentarios.length} opiniones)`;
    }

    // 🔥 REINICIALIZAR SWIPER
    swiperComentarios = new Swiper(".mySwiperComentarios", {
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      },
      pagination: {
        el: ".comentarios-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".comentarios-next",
        prevEl: ".comentarios-prev",
      },
    });

  } catch (error) {
    console.error("Error cargando:", error);
  }
}

/*ANIMACION CON GSAP*/
gsap.from('.navbar .logo',{
  x:60,
  scale:1.5,
  opacity:0,
  duration:2
});



gsap.from('.a1', {
  x: -110,
  opacity:0,
  scale:1.3,
  duration: 1
});
gsap.from('.a2', {
  x: -90,
  opacity:0,
  scale:1.3,
  duration: 1.1
});
gsap.from('.a3', {
  x: 90,
  opacity:0,
  scale:1.3,
  duration: 1.2
});
gsap.from('.a4', {
  x: 110,
  opacity:0,
  scale:1.3,
  duration: 1.3
});

gsap.from('.btn-contacto', {
  x:-60,
  scale:1.5,
  opacity:0,
  duration:2
});

gsap.from(".hero h1", {
  y: -50,
  opacity: 0,
  duration: 1
});

gsap.from(".hero p", {
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.3
});

gsap.from(".hero .btn", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top 100%"
  },
  opacity: 0,
  y: 50,
  duration: 1
});

const secciones = document.querySelectorAll(".servicios");

secciones.forEach((seccion) => {

  // H2
  gsap.from(seccion.querySelector("h2"), {
    x: 70,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: seccion.querySelector("h2"),
      start: "top 90%",
    }
  });
  gsap.from(seccion.querySelector("p"),{
  y:40,
  opacity:0,
  duration:2,
  scrollTrigger: {
    trigger: seccion.querySelector("p"),
    start: "top 90%", // cuando entra en pantalla
  }
});

  // Card 1
  gsap.from(seccion.querySelector(".card1"), {
    x: 120,
    opacity: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: seccion.querySelector(".card1"),
      start: "top 100%",
    }
  });

  // Card 2
  gsap.from(seccion.querySelector(".card2"), {
    x: 150,
    opacity: 0,
    duration: 0.9,
    scrollTrigger: {
      trigger: seccion.querySelector(".card2"),
      start: "top 100%",
    }
  });

  // Card 3
  gsap.from(seccion.querySelector(".card3"), {
    x: 180,
    opacity: 0,
    duration: 1.1,
    scrollTrigger: {
      trigger: seccion.querySelector(".card3"),
      start: "top 100%",
    }
  });

});

gsap.from('.horario h2',{
  x:-60,
  opacity:0,
  duration:1,
  scrollTrigger: {
    trigger: ".horario h2",
    start: "top 90%", // cuando entra en pantalla
  }
});

gsap.from('.horario .dia',{
  x:40,
  opacity:0,
  duration:2,
  scrollTrigger: {
    trigger: ".horario .dia",
    start: "top 90%", // cuando entra en pantalla
  }
});
gsap.from('.swiper',{
  x:-80,
  opacity:0,
  duration:2,
  scrollTrigger: {
    trigger: ".swiper",
    start: "top 100%", // cuando entra en pantalla
  }
});
gsap.from('.porque-texto',{
  x:80,
  opacity:0,
  duration:1.8,
  scrollTrigger: {
    trigger: ".porque-texto",
    start: "top 100%", // cuando entra en pantalla
  }
});


gsap.from('.f1',{
  x:60,
  opacity:0,
  duration:2,
  
  scrollTrigger: {
    trigger: ".f1",
    start: "top 100%", // cuando entra en pantalla
  }
});
gsap.from('.f2',{
  x:80,
  opacity:0,
  duration:2,
  
  scrollTrigger: {
    trigger: ".f2",
    start: "top 100%", // cuando entra en pantalla
  }
});
gsap.from('.f3',{
  x:100,
  opacity:0,
  duration:2,
  
  scrollTrigger: {
    trigger: ".f3",
    start: "top 100%", // cuando entra en pantalla
  }
});
gsap.from('.f4',{
  x:120,
  opacity:0,
  duration:2,
  
  scrollTrigger: {
    trigger: ".f4",
    start: "top 100%", // cuando entra en pantalla
  }
});
gsap.from('.footer-copy',{
  x:-60,
  opacity:0,
  duration:1.5,
  
  scrollTrigger: {
    trigger: ".footer-copy",
    start: "top 100%", // cuando entra en pantalla
  }
});

gsap.from('.testimonio',{
  y:60,
  opacity:0,
  duration:1.5,
  
  scrollTrigger: {
    trigger: ".testimonio",
    start: "top 100%", // cuando entra en pantalla
  }
})