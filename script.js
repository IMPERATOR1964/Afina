// ═══════════════════════════════════════════════════════════
//   НАСТРОЙКИ ФОТО — меняйте только этот блок
//   Можно вставлять любые ссылки (https://...) или пути (images/...)
// ═══════════════════════════════════════════════════════════
const PHOTOS = {
  // Левая колонка (сколько угодно фото)
  left: [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
  ],

  // Правая колонка (сколько угодно фото)
  right: [
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg',
  ],

  // Галерея в финале (сколько угодно фото)
  gallery: [
    'images/g1.jpg',
    'images/g2.jpg',
    'images/g3.jpg',
    'images/g4.jpg',
    'images/g5.jpg',
    'images/g6.jpg',
  ],

  // Одно фото для оверлея при неправильном ответе
  wrong: 'images/wrong.jpg',
};
// ═══════════════════════════════════════════════════════════

// Заполняем фотографии из массивов
function populatePhotos() {
  fillContainer(document.getElementById('side-left'), PHOTOS.left, 'side-photo');
  fillContainer(document.getElementById('side-right'), PHOTOS.right, 'side-photo');
  fillContainer(document.getElementById('gallery'), PHOTOS.gallery);

  const wrongPhoto = document.getElementById('wrong-photo');
  wrongPhoto.src = PHOTOS.wrong;
  wrongPhoto.onerror = () => wrongPhoto.classList.add('placeholder');
}

function fillContainer(container, urls, extraClass) {
  if (!container) return;
  container.innerHTML = '';

  urls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = '';
    if (extraClass) img.classList.add(extraClass);
    img.onerror = () => img.classList.add('placeholder');
    container.appendChild(img);
  });
}

populatePhotos();

// ─── Логика опросника ──────────────────────────────────────
const form = document.getElementById('quiz-form');
const quizCard = document.getElementById('quiz');
const finalCard = document.getElementById('final');
const wrongOverlay = document.getElementById('wrong-overlay');

let overlayTimer = null;

// Проверка ответа при клике на вариант
form.addEventListener('change', (e) => {
  if (e.target.type !== 'radio') return;

  const isCorrect = e.target.dataset.correct === 'true';

  if (!isCorrect) {
    const wrongInput = e.target;
    showWrongOverlay();

    setTimeout(() => {
      wrongInput.checked = false;
    }, 100);
  }
});

function showWrongOverlay() {
  if (overlayTimer) {
    clearTimeout(overlayTimer);
    wrongOverlay.classList.remove('fade-out');
  }

  wrongOverlay.classList.remove('hidden');

  overlayTimer = setTimeout(() => {
    wrongOverlay.classList.add('fade-out');

    setTimeout(() => {
      wrongOverlay.classList.add('hidden');
      wrongOverlay.classList.remove('fade-out');
      overlayTimer = null;
    }, 500);
  }, 4000);
}

// Отправка опросника
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const questions = ['q1', 'q2', 'q3', 'q4'];
  const allAnswered = questions.every(q => form.querySelector(`input[name="${q}"]:checked`));

  if (!allAnswered) {
    alert('Ответь на все вопросы ❤');
    return;
  }

  quizCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  quizCard.style.opacity = '0';
  quizCard.style.transform = 'scale(0.9)';

  setTimeout(() => {
    quizCard.classList.add('hidden');
    finalCard.classList.remove('hidden');
    launchConfetti();
  }, 500);
});

// Анимация сердечек после прохождения
function launchConfetti() {
  const colors = ['#ff6b9d', '#ff85a2', '#ffd700', '#ffd1dc'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.textContent = '❤';
    heart.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -30px;
      font-size: ${15 + Math.random() * 20}px;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      z-index: 999;
      animation: fall ${3 + Math.random() * 3}s linear forwards;
    `;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(105vh) rotate(${Math.random() > 0.5 ? 360 : -360}deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
