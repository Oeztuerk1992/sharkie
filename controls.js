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
 * Saves the keys for the bubble attack (D), the poison bubble attack (F) and the fin slap (S).
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
  if (code === 'KeyS' && isPressed) {
    keyboard.slap = true;
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
  bindTapButton('touchSlap', 'slap');
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
