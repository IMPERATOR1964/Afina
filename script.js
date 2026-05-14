// ═══════════════════════════════════════════════════════════
//   НАСТРОЙКИ ФОТО — меняйте только этот блок
//   Можно вставлять любые ссылки (https://...) или пути (images/...)
// ═══════════════════════════════════════════════════════════
const PHOTOS = {
  // Левая колонка (сколько угодно фото)
  left: [
    'https://i.postimg.cc/q0kr0t1s/a5f44284-39a0-43a2-a257-df34c687335f.jpg',
    'https://i.postimg.cc/nHDFs6ms/9a9baefc-a340-45b8-bbcc-88ad9578a10f.jpg',
    'https://i.postimg.cc/YpWr4JFz/ecb2281c-c227-4cb3-b997-4614acf63616.jpg',
  ],

  // Правая колонка (сколько угодно фото)
  right: [
    'https://i.postimg.cc/mTcRq08S/6fb33357-1072-4e11-90c5-7eb8c269d4be.jpg',
    'https://i.postimg.cc/nHDFs6m4/bed71745-1b8a-41ae-81c2-0933bf0b3f44.jpg',
    'https://i.postimg.cc/Y0VPrdfz/48e44012-38c8-4505-beed-40d30192dc9e.jpg',
  ],

  // Галерея в финале (сколько угодно фото)
  gallery: [
    'https://i.postimg.cc/d1JPpN4q/7dd8d483-bac0-4af8-a007-e01042548122.jpg',
    'https://i.postimg.cc/vMPJs0g8/f31adaaa-ef68-47bf-8a82-fe4fe82e84c8.jpg',
    'https://i.postimg.cc/KZMGKdT3/44e7ca99-7fb7-458e-a45f-24a1755806cc.jpg',
    'https://i.postimg.cc/HpyYJfM5/a9441a59-0b6b-4e1b-944e-b850f7f1fb66.jpg',
    'https://i.postimg.cc/D2Lhf1VM/8bc605be-9bc7-4eec-990d-34b7685c9765.jpg',
    'https://i.postimg.cc/F9ytXmcp/cd5a73c2-38c0-425e-bd5c-a8da93a56312.jpg',
  ],

  // Одно фото для оверлея при неправильном ответе
  wrong: 'https://i.postimg.cc/7hCBWg8x/de24ebec-7404-43ff-8b3e-f939a3a9c046.jpg',
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
