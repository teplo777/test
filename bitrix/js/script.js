document.addEventListener('DOMContentLoaded', () => {
  // Инициализация Swiper
  const swiper = new Swiper('.swiper-container', {
    loop: true, // Бесконечный цикл
  });

  // Привязка кнопок к слайдеру
  const prevSlide = document.getElementById('prevSlide');
  const nextSlide = document.getElementById('nextSlide');

  // События клика для перелистывания слайдов
  prevSlide.addEventListener('click', () => swiper.slidePrev());
  nextSlide.addEventListener('click', () => swiper.slideNext());
});



// Табы из блока 1С для структур

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Функция для переключения табов
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Удаляем активный класс с других кнопок и контента
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Добавляем активный класс к выбранной кнопке и контенту
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});


// Форма обратной связи

const form = document.getElementById('consultation-form');
const checkbox = document.getElementById('privacy-policy');
const submitButton = document.querySelector('.submit-btn');

// Разблокировать кнопку только если чекбокс отмечен
checkbox.addEventListener('change', () => {
  submitButton.disabled = !checkbox.checked;
});

// Обработка отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Спасибо! Ваша заявка отправлена.');
  form.reset();
  submitButton.disabled = true;
});