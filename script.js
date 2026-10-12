let canvas;
let world;



/**
 * Starts the game after the page has loaded.
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas);


  console.log('My Character is', world.character);
  console.log('My Enemies are', world.enemies);
  console.log('My World is', world);
}

