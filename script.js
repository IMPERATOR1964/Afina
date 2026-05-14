// Обработка отправки опросника
const form = document.getElementById('quiz-form');
const quizCard = document.getElementById('quiz');
const finalCard = document.getElementById('final');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Проверим что хотя бы один вариант выбран в каждом вопросе
  const questions = ['q1', 'q2', 'q3', 'q4'];
  const allAnswered = questions.every(q => form.querySelector(`input[name="${q}"]:checked`));

  if (!allAnswered) {
    alert('Ответь на все вопросы ❤');
    return;
  }

  // Плавное скрытие опросника и показ финала
  quizCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  quizCard.style.opacity = '0';
  quizCard.style.transform = 'scale(0.9)';

  setTimeout(() => {
    quizCard.classList.add('hidden');
    finalCard.classList.remove('hidden');
    launchConfetti();
  }, 500);
});

// Маленькая анимация "конфетти" из сердечек после прохождения
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

// Добавляем CSS-анимацию падения сердечек динамически
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
