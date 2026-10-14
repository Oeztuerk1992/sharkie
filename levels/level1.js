/**
 * Adds all five layers of one background part at a position.
 * @param {BackgroundObject[]} backgroundObjects - The list to add the layers to.
 * @param {number} part - 1 for the left part, 2 for the right part.
 * @param {number} x - The x-coordinate of the part.
 * @returns {void}
 */
function addBackgroundPart(backgroundObjects, part, x) {
  backgroundObjects.push(
    new BackgroundObject('img/3. Background/Layers/5. Water/D' + part + '.png', x),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D' + part + '.png', x),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D' + part + '.png', x),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D' + part + '.png', x),
    new BackgroundObject('img/3. Background/Layers/1. Light/' + part + '.png', x)
  );
}


/**
 * Places the background parts side by side for the whole level.
 * @returns {BackgroundObject[]} All background layers of level 1.
 */
function createBackgroundObjects() {
  let backgroundObjects = [];
  addBackgroundPart(backgroundObjects, 1, 0);
  addBackgroundPart(backgroundObjects, 2, 1280);
  addBackgroundPart(backgroundObjects, 1, 2560);
  addBackgroundPart(backgroundObjects, 2, 3840);
  return backgroundObjects;
}


let level1 = new Level(
  [
    new PufferFish(),
    new JellyFish(),
    new EndBoss()
  ],
  [
    new Barrier('img/3. Background/Barrier/1.png', 0, 0, 1121, 720),
    new Barrier('img/3. Background/Barrier/2.png', 1500, 287, 943, 433),
    new Barrier('img/3. Background/Barrier/3.png', 2700, 116, 294, 604)
  ],
  createBackgroundObjects()
);
