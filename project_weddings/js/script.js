
  const btn = document.getElementById('play-button');
  const music = document.getElementById('bg-music');
  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (!isPlaying) {
      music.play();
      btn.textContent = '⏸'; // Меняем значок на паузу
    } else {
      music.pause();
      btn.textContent = '▶'; // Назад на play
    }
    isPlaying = !isPlaying;
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