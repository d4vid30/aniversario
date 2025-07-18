// Flor SVG al hacer scroll
window.addEventListener('scroll', () => {
  const flower = document.getElementById('flower');
  const scrollY = window.scrollY;
  const scale = 0.5 + scrollY / 800;
  const opacity = Math.min(0.8, 0.1 + scrollY / 600);
  flower.style.transform = `scale(${scale})`;
  flower.style.opacity = opacity;
});

// Carta animada
function openLetter() {
  document.querySelector('.letter').classList.add('open');
}

// Estrellas flotantes con canvas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Reproducir música al primer clic
const audio = document.getElementById('bg-music');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const volumeSlider = document.getElementById('volume');

document.addEventListener('click', () => {
  if (audio.paused) audio.play();
}, { once: true });

playBtn.addEventListener('click', () => {
  audio.play();
  playBtn.classList.add('active');
  pauseBtn.classList.remove('active');
});
pauseBtn.addEventListener('click', () => {
  audio.pause();
  pauseBtn.classList.add('active');
  playBtn.classList.remove('active');
});
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// 🌸 Flores flotantes al mover el mouse
function crearFlor(x, y) {
  const flowerContainer = document.getElementById('floating-flowers-container');
  const flower = document.createElement('div');
  flower.classList.add('floating-flower');
  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;
  flowerContainer.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 3000);
}

window.addEventListener('mousemove', (e) => crearFlor(e.clientX, e.clientY));
window.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  crearFlor(touch.clientX, touch.clientY);
});

// 📆 Contador de días juntos
window.addEventListener('DOMContentLoaded', () => {
  const contador = document.getElementById('contador-dias');
  if (contador) {
    const inicio = new Date('2024-07-21'); // Cambia a tu fecha especial
    const hoy = new Date();
    const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
    contador.innerText = `Llevamos ${dias} días juntos 💞`;
  } else {
    console.log('No se encontró el elemento #contador-dias');
  }
});

// Modal de fotos
const galleryImages = Array.from(document.querySelectorAll('.gallery img'));
const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.modal .close');
const prevBtn = document.getElementById('prev-photo');
const nextBtn = document.getElementById('next-photo');
let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  modalImg.src = galleryImages[currentIndex].src;
  document.getElementById('photo-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
}

galleryImages.forEach((img, idx) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openModal(idx));
});

closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Cerrar modal con ESC o clic fuera de la imagen
window.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex' && e.key === 'Escape') closeModal();
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function showConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  const ctx = canvas.getContext('2d');
  let confettis = [];
  for (let i = 0; i < 80; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: -10,
      r: Math.random() * 8 + 4,
      d: Math.random() * 80,
      color: `hsl(${Math.random()*360},80%,70%)`,
      tilt: Math.random() * 10 - 5,
      tiltAngle: 0
    });
  }
  let angle = 0;
  let frame = 0;
  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.r, c.r/2, c.tilt, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    updateConfetti();
    frame++;
    if (frame < 90) requestAnimationFrame(drawConfetti);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function updateConfetti() {
    angle += 0.01;
    confettis.forEach(c => {
      c.y += Math.cos(angle + c.d) + 2 + c.r / 2;
      c.x += Math.sin(angle) * 2;
      c.tiltAngle += 0.1;
      c.tilt = Math.sin(c.tiltAngle) * 8;
    });
  }
  drawConfetti();
}
