let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Finds the canvas after the page has loaded and loads all images. The game starts with the start button.
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
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
  keyboard = new Keyboard();
  initLevel();
  world = new World(canvas, keyboard);
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
  document.getElementById('startScreen').classList.remove('d-none');
}


/**
 * Opens the dialog that explains the game and the keys.
 * @returns {void}
 */
function openInstructions() {
  document.getElementById('instructions').showModal();
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
  if (code === 'Space' || code === 'ArrowUp') {
    keyboard.jump = isPressed;
  }
}


/**
 * Saves the keys for the bubble attack (D) and the poison bubble attack (F).
 * @param {string} code - The code of the key.
 * @param {boolean} isPressed - True if pressed, false if released.
 * @returns {void}
 */
function setAttackKey(code, isPressed) {
  if (code === 'KeyD') {
    keyboard.shoot = isPressed;
  }
  if (code === 'KeyF') {
    keyboard.shootPoison = isPressed;
  }
}
