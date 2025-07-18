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
document.addEventListener('click', () => {
  if (audio.paused) audio.play();
}, { once: true });

// 🌸 Flores flotantes al mover el mouse
window.addEventListener('mousemove', (e) => {
  const flowerContainer = document.getElementById('floating-flowers-container');
  const flower = document.createElement('div');
  flower.classList.add('floating-flower');
  flower.style.left = `${e.clientX}px`;
  flower.style.top = `${e.clientY}px`;
  flowerContainer.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 3000);
});
window.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const flowerContainer = document.getElementById('floating-flowers-container');
  const flower = document.createElement('div');
  flower.classList.add('floating-flower');
  flower.style.left = `${touch.clientX}px`;
  flower.style.top = `${touch.clientY}px`;
  flowerContainer.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 3000);
});
// 📆 Contador de días juntos
const inicio = new Date('2024-07-21'); // Cambia a tu fecha especial
const hoy = new Date();
const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
document.getElementById('contador-dias').innerText = `Llevamos ${dias} días juntos 💞`;
