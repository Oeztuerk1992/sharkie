let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Starts the game after the page has loaded.
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
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
