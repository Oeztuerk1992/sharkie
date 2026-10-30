let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('sounds/background.mp3');
let bubbleSound = new Audio('sounds/bubble.mp3');
let snoreSound = new Audio('sounds/snore.mp3');
let enemyTrappedSound = new Audio('sounds/enemy-trapped.mp3');
let isMuted = false;


/**
 * Finds the canvas after the page has loaded and loads all images. The game starts with the start button.
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
  prepareSounds();
  loadMuteState();
  initTouchButtons();
  preloadImages();
}


/**
 * Creates the game once and stops it at once, so the browser loads all images before the player clicks start.
 * @returns {void}
 */
function preloadImages() {
  initLevel();
  world = new World(canvas, keyboard);
  new ThrowableObject(0, 0, false, false);
  new ThrowableObject(0, 0, false, true);
  stopGame();
  enableStartWhenLoaded();
}


/**
 * Checks every 100 ms if all images are loaded and then enables the start button.
 * @returns {void}
 */
function enableStartWhenLoaded() {
  let loadingInterval = setInterval(() => {
    if (areAllImagesLoaded()) {
      clearInterval(loadingInterval);
      document.getElementById('startButton').disabled = false;
    }
  }, 100);
}


/**
 * Checks if the browser has finished loading every image of the game.
 * @returns {boolean} True if all images are loaded.
 */
function areAllImagesLoaded() {
  let images = Object.values(DrawableObject.allImages);
  return images.every(image => image.complete);
}


/**
 * Hides the start and end screen and starts a new game with a fresh level.
 * @returns {void}
 */
function startGame() {
  document.getElementById('startScreen').classList.add('d-none');
  document.getElementById('endScreen').classList.add('d-none');
  document.getElementById('muteButton').classList.remove('d-none');
  keyboard = new Keyboard();
  initLevel();
  world = new World(canvas, keyboard);
  playBackgroundMusic();
}


/**
 * Stops all intervals and the drawing loop of the running game.
 * @returns {void}
 */
function stopGame() {
  let highestIntervalId = setInterval(() => {}, 1000);
  for (let i = 1; i <= highestIntervalId; i++) {
    clearInterval(i);
  }
  cancelAnimationFrame(world.animationFrameId);
  stopSnoring();
}


/**
 * Stops the game and shows the win or game over screen.
 * @param {boolean} isWon - True if the player won the game.
 * @returns {void}
 */
function showEndScreen(isWon) {
  stopGame();
  let endScreen = document.getElementById('endScreen');
  if (isWon) {
    endScreen.innerHTML = getWinScreenTemplate();
  } else {
    endScreen.innerHTML = getGameOverTemplate();
  }
  endScreen.classList.remove('d-none');
}


/**
 * Starts the game again without reloading the page.
 * @returns {void}
 */
function restartGame() {
  startGame();
}


/**
 * Hides the end screen and goes back to the start screen.
 * @returns {void}
 */
function goHome() {
  document.getElementById('endScreen').classList.add('d-none');
  document.getElementById('muteButton').classList.add('d-none');
  document.getElementById('startScreen').classList.remove('d-none');
}


/**
 * Opens the dialog that explains the game and the keys.
 * @returns {void}
 */
function openInstructions() {
  document.getElementById('instructions').showModal();
  playBackgroundMusic();
}


/**
 * Closes the dialog with the game explanation.
 * @returns {void}
 */
function closeInstructions() {
  document.getElementById('instructions').close();
}


/**
 * Closes the dialog when the player clicks next to it.
 * @param {MouseEvent} event - The click event.
 * @returns {void}
 */
function closeInstructionsOnBackdrop(event) {
  if (event.target.id === 'instructions') {
    closeInstructions();
  }
}

window.addEventListener('keydown', (event) => {
  if (!event.repeat) {
    setKey(event.code, true);
  }
});

window.addEventListener('keyup', (event) => {
  setKey(event.code, false);
});


/**
 * Saves in the keyboard object if a key is pressed or released.
 * @param {string} code - The code of the key, for example 'ArrowLeft'.
 * @param {boolean} isPressed - True if pressed, false if released.
 * @returns {void}
 */
function setKey(code, isPressed) {
  setMoveKey(code, isPressed);
  setAttackKey(code, isPressed);
}


/**
 * Saves the keys for swimming left, right and jumping.
 * @param {string} code - The code of the key.
 * @param {boolean} isPressed - True if pressed, false if released.
 * @returns {void}
 */
function setMoveKey(code, isPressed) {
  if (code === 'ArrowLeft') {
    keyboard.left = isPressed;
  }
  if (code === 'ArrowRight') {
    keyboard.right = isPressed;
  }
  if ((code === 'Space' || code === 'ArrowUp') && isPressed) {
    keyboard.jump = true;
  }
}


/**
 * Saves the keys for the bubble attack (D) and the poison bubble attack (F).
 * Jump and attack keys are only set to true. Sharkie sets them back to false after he used them.
 * @param {string} code - The code of the key.
 * @param {boolean} isPressed - True if pressed, false if released.
 * @returns {void}
 */
function setAttackKey(code, isPressed) {
  if (code === 'KeyD' && isPressed) {
    keyboard.shoot = true;
  }
  if (code === 'KeyF' && isPressed) {
    keyboard.shootPoison = true;
  }
}


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


/**
 * Connects every touch button with a key of the keyboard object.
 * @returns {void}
 */
function initTouchButtons() {
  bindHoldButton('touchLeft', 'left');
  bindHoldButton('touchRight', 'right');
  bindTapButton('touchJump', 'jump');
  bindTapButton('touchShoot', 'shoot');
  bindTapButton('touchPoison', 'shootPoison');
}


/**
 * For swimming: the key is true while the finger is on the button and false when it is lifted.
 * @param {string} buttonId - The id of the touch button.
 * @param {string} key - The name of the key in the keyboard object, for example 'left'.
 * @returns {void}
 */
function bindHoldButton(buttonId, key) {
  let button = document.getElementById(buttonId);
  bindTapButton(buttonId, key);
  button.addEventListener('pointerup', () => keyboard[key] = false);
  button.addEventListener('pointerleave', () => keyboard[key] = false);
  button.addEventListener('pointercancel', () => keyboard[key] = false);
}


/**
 * For jumping and attacking: every tap sets the key to true once. It also turns off the
 * context menu that opens when you hold a finger on the button.
 * @param {string} buttonId - The id of the touch button.
 * @param {string} key - The name of the key in the keyboard object, for example 'jump'.
 * @returns {void}
 */
function bindTapButton(buttonId, key) {
  let button = document.getElementById(buttonId);
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    keyboard[key] = true;
  });
  button.addEventListener('contextmenu', (event) => event.preventDefault());
}
