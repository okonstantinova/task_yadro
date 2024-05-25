const video = document.querySelector('video');
const loader = document.querySelector('.video-loader');
const playButton = document.querySelector('.video-play-button');

playButton.addEventListener('click', () => {
    video.play();
    loader.style.display = 'none';
    playButton.style.display = 'none';
});

video.addEventListener('canplay', () => {
    loader.style.display = 'none';
    playButton.style.display = 'none';
});