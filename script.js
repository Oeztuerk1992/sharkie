let canvas;
let world;
let keyboard = new Keyboard();



/**
 * Starts the game after the page has loaded.
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas,keyboard); 
}

window.addEventListener('keydown', (event) =>{
  setKey(event.code, true);
});

window.addEventListener('keyup', (event) =>{
  setKey(event.code, false);
});


/**
 * Saves in the keyboard object if an arrow key is pressed or released.
 * @param {string} code - The code of the key, for example 'ArrowLeft'.
 * @param {boolean} isPressed - True if pressed, false if released.
 * @returns {void}
 */
function setKey(code, isPressed) {
  if (code === 'ArrowLeft') {
    keyboard.left = isPressed;
  }
  if (code === 'ArrowRight') {
    keyboard.right = isPressed;
  }
  if (code === 'ArrowUp') {
    keyboard.up = isPressed;
  }
  if (code === 'ArrowDown') {
    keyboard.down = isPressed;
  }
}