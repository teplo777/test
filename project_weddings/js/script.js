
const playBtn = document.getElementById('play-button');
const audio = document.getElementById('bg-music');
const playShape = document.querySelector('.play-shape');
const pauseShape = document.querySelector('.pause-shape');

playBtn.addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
    playShape.style.display = 'none';
    pauseShape.style.display = 'block';
    this.setAttribute('aria-label', 'Пауза');
  } else {
    audio.pause();
    playShape.style.display = 'block';
    pauseShape.style.display = 'none';
    this.setAttribute('aria-label', 'Воспроизвести');
  }
});

  document.addEventListener('DOMContentLoaded', function() {
    const programSection = document.querySelector('.program');
    
    function checkVisibility() {
      const sectionPosition = programSection.getBoundingClientRect();
      const screenPosition = window.innerHeight / 1.2;
      
      if(sectionPosition.top < screenPosition) {
        programSection.classList.add('visible');
        window.removeEventListener('scroll', checkVisibility);
      }
    }
    
    // Проверяем при загрузке
    checkVisibility();
    
    // И при скролле
    window.addEventListener('scroll', checkVisibility);
  });


  document.addEventListener('DOMContentLoaded', () => {
    const colorBlock = document.querySelector('.dress-code__color');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.3 }); // Срабатывает, когда 30% элемента в зоне видимости
    
    if (colorBlock) {
      observer.observe(colorBlock);
    }
  });





  document.addEventListener('DOMContentLoaded', function() {
    // Показываем поле "Другое" для напитков
    document.getElementById('other-drink').addEventListener('change', function() {
      const otherDrinkText = document.getElementById('otherDrinkText');
      otherDrinkText.style.display = this.checked ? 'block' : 'none';
      if (!this.checked) otherDrinkText.value = '';
    });
  
    // Обработка отправки формы
    document.getElementById('telegramForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Проверка телефона
      const phoneInput = document.getElementById('phone');
      const phoneError = document.getElementById('phoneError');
      const phoneNumber = phoneInput.value.replace(/\D/g, '');
      
      if (phoneNumber.length < 10) {
        phoneError.style.display = 'block';
        return;
      } else {
        phoneError.style.display = 'none';
      }
      
      // Проверка выбора присутствия
      const presenceChoice = document.querySelector('input[name="presence"]:checked');
      if (!presenceChoice) {
        alert("Пожалуйста, укажите, сможете ли вы присутствовать!");
        return;
      }
      
      // Получение данных формы
      const firstName = document.getElementById('firstName').value;
      const phone = phoneInput.value;
      const presence = presenceChoice.value;
      const allergy = document.getElementById('allergy').value; // Новое поле: аллергия
      
      // Получение предпочтений напитков (включая свободный вариант)
      const drinkPreferences = [];
      document.querySelectorAll('input[name="drinkPreferences"]:checked').forEach(checkbox => {
        if (checkbox.id === 'other-drink' && checkbox.checked) {
          const otherDrinkText = document.getElementById('otherDrinkText').value;
          if (otherDrinkText.trim() !== '') {
            drinkPreferences.push(`Другое: ${otherDrinkText}`);
          }
        } else {
          drinkPreferences.push(checkbox.value);
        }
      });
  
      // Настройки бота (оставьте ваши токен и chat_id)
      const botToken = '7850603844:AAH8tgjqf0fq82bRh7zYJJUkHagDx2RvPJU';
      const privateChatId = '1007887235'; // Ваш личный чат
      const groupChatId = '-4701792735'; // ID группы
      
      // Формируем сообщение с новыми полями
      const message = `
        Новая заявка:
        👤 ФИО: ${firstName}
        📞 Телефон: ${phone}
        🎉 Присутствие: ${presence}
        🍷 Напитки: ${drinkPreferences.join(', ') || 'Не указано'}
        ⚠️ Аллергия: ${allergy || 'Нет аллергии'}
      `;
      
      // Функция для отправки в Telegram
      const sendToChat = (chatId) => {
        return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        });
      };
      
      // Отправляем в оба чата
      Promise.all([
        sendToChat(privateChatId),
        sendToChat(groupChatId)
      ])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(data => {
        alert('Данные успешно отправлены!');
        document.getElementById('telegramForm').reset();
        // Скрываем поле "Другое" после сброса формы
        document.getElementById('otherDrinkText').style.display = 'none';
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке данных.');
      });
    });
  });







// Установите дату окончания отсчета
const countDownDate = new Date("Jun 27, 2025 00:00:00").getTime();

// Обновляем таймер каждую секунду
const x = setInterval(function() {

    // Получаем текущую дату и время
    const now = new Date().getTime();
    
    // Разница между текущим и конечным временем
    const distance = countDownDate - now;
    
    // Расчет дней, часов, минут, секунд
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Выводим результат
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    
    // Если отсчет завершен
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Время истекло!";
    }
}, 1000);