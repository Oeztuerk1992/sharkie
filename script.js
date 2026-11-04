let canvas;
let world;
let keyboard = new Keyboard();


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
    showLoadingProgress();
    if (areAllImagesLoaded()) {
      clearInterval(loadingInterval);
      document.getElementById('loadingText').classList.add('d-none');
      document.getElementById('startButton').disabled = false;
    }
  }, 100);
}


/**
 * Shows how many percent of the images are already loaded, so the player knows why the start button is not ready yet.
 * @returns {void}
 */
function showLoadingProgress() {
  let images = Object.values(DrawableObject.allImages);
  let loadedImages = images.filter(image => image.complete);
  let percent = Math.round(loadedImages.length / images.length * 100);
  document.getElementById('loadingText').innerHTML = `Loading ${percent} %`;
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
  winSound.pause();
  gameOverSound.pause();
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
 * Stops the game and the music and shows the win or game over screen.
 * @param {boolean} isWon - True if the player won the game.
 * @returns {void}
 */
function showEndScreen(isWon) {
  stopGame();
  backgroundMusic.pause();
  let endScreen = document.getElementById('endScreen');
  if (isWon) {
    endScreen.innerHTML = getWinScreenTemplate();
    playSound(winSound);
  } else {
    endScreen.innerHTML = getGameOverTemplate();
    playSound(gameOverSound);
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
