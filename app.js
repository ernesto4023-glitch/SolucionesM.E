const botones = document.querySelectorAll('.btn-content, .btn-hero');

botones.forEach(btn => {
    btn.addEventListener('click', () => {
        window.open('https://wa.me/573233404121?text=Hola%20Estoy%20interesad@%20en%20tus%20servicios','_black');
    })
})

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

const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});