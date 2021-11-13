const player = document.querySelector('.video__frame');
const video = player.querySelector('.video__content');
const controlPanel = player.querySelector('.video__control-panel');
const buttonPlayBig = player.querySelector('.button-play-big');
const buttonPrev = player.querySelector('.button-previous');
const buttonPlay = player.querySelector('.toogle-play-pause');
const buttonNext = player.querySelector('.button-next');
const buttonVolume = player.querySelector('.toggle-volume');
const buttonFullScr = player.querySelector('.button-full-screen');
const ranges = player.querySelectorAll('.range');
const currTime = player.querySelector('.curr-time');
const durationTime = player.querySelector('.duration-time');
const progressVideo = document.querySelector('.progress-video');
const rangeVolume = document.querySelector('.range-volume');
let a = 123;
let b = '123';
let c = true;
console.log(typeof a);
[]
{}
() =>

function togglePlay() {
  if (video.paused) 
    video.play();
  else 
    video.pause();
}
function updateButton() { // Меняем иконки Play или Pause
  if (!this.paused) {
    buttonPlayBig.classList.add('visually-hidden');
    buttonPlay.classList.remove('button-play');
    buttonPlay.classList.add('button-pause');
  } else {
    buttonPlayBig.classList.remove('visually-hidden');
    buttonPlay.classList.remove('button-pause');
    buttonPlay.classList.add('button-play');
  }
}

function videoMute() { // Убираем звук при клике на кнопку динамика
  if(video.volume == 0) {
    video.volume = rangeVolume.value / 100;
    buttonVolume.classList.remove('toggle-volume-mute');
    buttonVolume.classList.add('toggle-volume-volume');
  } else {
    video.volume = 0;
    buttonVolume.classList.remove('toggle-volume-volume');
    buttonVolume.classList.add('toggle-volume-mute');
  }
}

function volumeUpdate(e) { // Изменяем уровень громкости при использовании range
  let volume = e.offsetX / rangeVolume.offsetWidth;
  volume = Math.floor(volume * 100) / 100;
  if (volume < 0.95)
    volume += 0.05;
  else if (volume >= 0.95)
    volume = 1;
  else if (volume > 0.05)
    volume -= 0.05;
  if (volume <= 0.05) 
    volume = 0;
  video.volume = volume;
  rangeVolume.value = volume * 100
  rangeVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volume * 100}%, #ffffff ${volume * 100}%, #ffffff 100%)`;
  if(video.volume == 0) {
    buttonVolume.classList.remove('toggle-volume-volume');
    buttonVolume.classList.add('toggle-volume-mute');
  } else {
    buttonVolume.classList.remove('toggle-volume-mute');
    buttonVolume.classList.add('toggle-volume-volume');
  }
}

function volumeUpdate2(volume) { // Изменяем уровень громкости при использовании стрелок
  volume = Math.floor(volume * 100) / 100;
  video.volume = volume;
  rangeVolume.value = volume * 100
  rangeVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volume * 100}%, #ffffff ${volume * 100}%, #ffffff 100%)`;
  if(video.volume == 0) {
    buttonVolume.classList.remove('toggle-volume-volume');
    buttonVolume.classList.add('toggle-volume-mute');
  } else {
    buttonVolume.classList.remove('toggle-volume-mute');
    buttonVolume.classList.add('toggle-volume-volume');
  }
}


function videoProgress() { // Отображаем время воспроизведения
  progress = ((Math.floor(video.currentTime) / Math.floor(video.duration)) * 100);
  progressVideo.value = progress;
  currTime.innerHTML = videoTime(video.currentTime);
  /* durationTime.innerHTML = videoTime(video.duration); */
  progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress}%, #ffffff ${progress}%, #ffffff 100%)`
}

function scrub(e) { // Перематываем
  const scrubTime = (e.offsetX / progressVideo.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullScreen() { // Переключатель полноэкранного режима
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Задаём события при кажатии кнопок клавиатуры учитывая возможность активной русской раскладки
document.addEventListener("keypress", function(e) { 
  if (e.keyCode === 32 || e.key === 'k' || e.key === 'K' || e.key === 'л' || e.key === 'Л') { 
    togglePlay();
  } else if (e.key === 'm' || e.key === 'M' || e.key === 'ь' || e.key === 'Ь') { 
    videoMute();
  } else if (e.key === 'f' || e.key === 'F' || e.key === 'а' || e.key === 'А') { 
    toggleFullScreen();
  } else if (e.key === 'l' || e.key === 'L' || e.key === 'д' || e.key === 'Д') {
    video.currentTime += 10; 
  } else if (e.key === 'j' || e.key === 'J' || e.key === 'о' || e.key === 'О') {
    video.currentTime += -10;
  } else if (e.key === '>' || e.key === 'Ю') { 
    if (video.playbackRate >= 15.75) 
      video.playbackRate = 16;
    else 
      video.playbackRate += 0.25; 
  } else if (e.key === '<' || e.key === 'Б') { 
    if (video.playbackRate >= 0.5) {
      video.playbackRate -= 0.25;
    } else {
      video.playbackRate = 0.25;
    }
  } else if (e.key === 'n' || e.key === 'N' || e.key === 'т' || e.key === 'Т') {
    video.playbackRate = 1;
  } else if (e.key >= 0 && e.key <= 9) {
    video.currentTime = (video.duration / 10) * e.key;
  }
}, false);

// События для срелок клавиатуры
document.addEventListener('keydown', function(e) {
  let volume;
  if (e.keyCode === 39) { // Стрелка вправо
    video.currentTime += 5; 
  } else if (e.keyCode === 37) {  // Стрелка влево
    video.currentTime += -5;
  } else if (e.keyCode === 38) {  // Стрелка вверх
    if (video.volume < 0.95) {
      volume = video.volume += 0.05;
      volumeUpdate2(volume);
    } else if (video.volume >= 0.95) {
      volume = 1;
      volumeUpdate2(volume);
    }
  } else if (e.keyCode === 40) {  // Стрелка Вниз
    if (video.volume > 0.05) {
      volume = video.volume - 0.05;
      volumeUpdate2(volume);
    }
    else if (video.volume <= 0.05) {
      volume = 0;
      volumeUpdate2(volume)
    }
  }
}, false);


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', videoProgress);
// video.addEventListener('volumechange', volumeBar)

buttonPlay.addEventListener('click', togglePlay);
buttonVolume.addEventListener('click', videoMute);
buttonFullScr.addEventListener('click', toggleFullScreen);
buttonPlayBig.addEventListener('click', togglePlay);

let mousedown = false;
progressVideo.addEventListener('click', scrub);
progressVideo.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressVideo.addEventListener('mousedown', () => mousedown = true);
progressVideo.addEventListener('mouseup', () => mousedown = false);

rangeVolume.addEventListener('click', volumeUpdate);
rangeVolume.addEventListener('mousemove', (e) => mousedown && volumeUpdate(e));
rangeVolume.addEventListener('mousedown', () => mousedown = true);
rangeVolume.addEventListener('mouseup', () => mousedown = false);