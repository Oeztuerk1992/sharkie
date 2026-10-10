let canvas;
let world;


/**
 * Starts the game after the page has loaded.
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas);
}