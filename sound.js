let backgroundMusic = new Audio('sounds/background.mp3');
let bubbleSound = new Audio('sounds/bubble.mp3');
let snoreSound = new Audio('sounds/snore.mp3');
let enemyTrappedSound = new Audio('sounds/enemy-trapped.mp3');
let bossSplashSound = new Audio('sounds/boss-splash.mp3');
let bossBiteSound = new Audio('sounds/boss-bite.mp3');
let winSound = new Audio('sounds/win.mp3');
let gameOverSound = new Audio('sounds/game-over.mp3');
let isMuted = false;


/**
 * Sets the volume of all sounds and lets the music repeat.
 * @returns {void}
 */
function prepareSounds() {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.25;
  bubbleSound.volume = 0.4;
  snoreSound.loop = true;
  snoreSound.volume = 0.5;
  enemyTrappedSound.volume = 0.6;
  bossSplashSound.volume = 0.7;
  bossBiteSound.volume = 0.7;
  winSound.volume = 0.6;
  gameOverSound.volume = 0.6;
}


/**
 * Reads from the local storage if the sound was muted last time.
 * @returns {void}
 */
function loadMuteState() {
  isMuted = localStorage.getItem('sharkieMuted') === 'true';
  updateMuteButton();
}


/**
 * Plays a sound effect from the beginning, but only if the sound is not muted.
 * @param {HTMLAudioElement} sound - The sound to play, for example bubbleSound.
 * @returns {void}
 */
function playSound(sound) {
  if (isMuted) {
    return;
  }
  sound.currentTime = 0;
  sound.play();
}


/**
 * Turns the sound on or off and saves the choice in the local storage.
 * @returns {void}
 */
function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('sharkieMuted', isMuted);
  updateMuteButton();
  document.getElementById('muteButton').blur();
  if (isMuted) {
    backgroundMusic.pause();
    stopSnoring();
  } else {
    backgroundMusic.play();
  }
}


/**
 * Starts the background music, but only if the sound is not muted.
 * @returns {void}
 */
function playBackgroundMusic() {
  if (!isMuted) {
    backgroundMusic.play();
  }
}


/**
 * Starts the snoring sound while Sharkie sleeps, if it is not already playing.
 * @returns {void}
 */
function startSnoring() {
  if (!isMuted && snoreSound.paused) {
    snoreSound.play();
  }
}


/**
 * Stops the snoring sound and rewinds it.
 * @returns {void}
 */
function stopSnoring() {
  snoreSound.pause();
  snoreSound.currentTime = 0;
}


/**
 * Shows the crossed out speaker when the sound is muted.
 * @returns {void}
 */
function updateMuteButton() {
  let muteIcon = document.getElementById('muteIcon');
  if (isMuted) {
    muteIcon.src = 'img/6.Botones/Sound/sound-off.svg';
  } else {
    muteIcon.src = 'img/6.Botones/Sound/sound-on.svg';
  }
}
