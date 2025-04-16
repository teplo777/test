
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
