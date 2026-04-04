const botones = document.querySelectorAll(' .btn-contacto, .btn-porque');
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
const swiperComentarios = new Swiper(".mySwiperComentarios", {
  spaceBetween: 20,
  loop: true,

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  // 🔥 RESPONSIVE
  breakpoints: {
    0: {
      slidesPerView: 1 // 📱 celular
    },
    768: {
      slidesPerView: 2 // 📱 tablet
    },
    1024: {
      slidesPerView: 3 // 💻 pantalla grande
    }
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

    const nombre = document.getElementById("nombre").value;
    const servicio = document.getElementById("servicio").value;
    const comentario = document.getElementById("comentario").value;

    // VALIDACIÓN
    if (!calificacion) {
      alert("Por favor selecciona una calificación ⭐");
      return;
    }

    const data = {
      nombre,
      servicio,
      calificacion,
      comentario
    };

    console.log("Enviando:", data);

    try {
      const res = await fetch('/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const resultado = await res.json();
      console.log(resultado);

      alert("¡Comentario guardado!");

      form.reset();
      calificacion = 0;

      // limpiar estrellas
      estrellas.forEach(e => e.classList.remove("active"));

      modal.classList.remove("active");

      cargarComentarios(); // 🔥 actualizar sin recargar

    } catch (error) {
      console.log("Error enviando comentario:", error);
    }
  });
}


// =====================
// FUNCIÓN PARA MEZCLAR 🎲
// =====================
function mezclarArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


// =====================
// MOSTRAR COMENTARIOS
// =====================
async function cargarComentarios() {
  try {
    const res = await fetch('/comentarios');
    const comentarios = await res.json();

    console.log("Comentarios:", comentarios);

    const contenedor = document.getElementById('contenedorComentarios');

    if (!contenedor) return; // evita errores si no existe

    contenedor.innerHTML = "";

    mezclarArray([...comentarios]).forEach((c, i) => {

      // ⭐ estrellas dinámicas
      let estrellasHTML = "";
      for (let j = 0; j < c.calificacion; j++) {
        estrellasHTML += "⭐";
      }

      const card = `
      <div class="swiper-slide">
        <div class="card-comentarios ${(i % 3) + 1}">
          <p class="star">${estrellasHTML}</p>
          <p>"${c.comentario}"</p>
          <h4> ${c.nombre}</h4>
          <p class="descripcion">${c.servicio}</p>
        </div>
      </div>
      `;

      contenedor.innerHTML += card;
    });

  } catch (error) {
    console.log("Error cargando comentarios:", error);
  }
}


// =====================
// CARGA INICIAL 🔥
// =====================
cargarComentarios();

swiperComentarios.update();

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