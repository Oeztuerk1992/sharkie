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


let level1;


/**
 * Creates level 1 with fresh objects. Called every time a game starts.
 * @returns {void}
 */
function initLevel() {
  level1 = new Level(createEnemies(), createBarriers(), createBackgroundObjects(), createCoins(), createPoisonBottles());
}


/**
 * Creates all enemies of level 1.
 * @returns {MovableObject[]} The enemies.
 */
function createEnemies() {
  return [
    new PufferFish(),
    new JellyFish(1950, 'yellow'),
    new JellyFish(3040, 'green'),
    new JellyFish(3190, 'pink'),
    new EndBoss()
  ];
}


/**
 * Creates all barriers of level 1.
 * @returns {Barrier[]} The barriers.
 */
function createBarriers() {
  return [
    new Barrier('img/3. Background/Barrier/1-top.png', 800, 0, 840, 197),
    new Barrier('img/3. Background/Barrier/1-bottom.png', 800, 582, 840, 138),
    new Barrier('img/3. Background/Barrier/2.png', 2300, 395, 707, 325),
    new Barrier('img/3. Background/Barrier/3.png', 3330, 297, 206, 423)
  ];
}


/**
 * Creates all coins of level 1.
 * @returns {Coin[]} The coins.
 */
function createCoins() {
  return [
    new Coin(520, 480),
    new Coin(590, 480),
    new Coin(660, 480),
    new Coin(1100, 370),
    new Coin(1180, 370),
    new Coin(1260, 370),
    new Coin(2500, 280),
    new Coin(2580, 280),
    new Coin(2660, 280),
    new Coin(3410, 220)
  ];
}


/**
 * Creates all poison bottles of level 1.
 * @returns {PoisonBottle[]} The poison bottles.
 */
function createPoisonBottles() {
  return [
    new PoisonBottle(740, 540),
    new PoisonBottle(1900, 540),
    new PoisonBottle(2150, 440),
    new PoisonBottle(3150, 540),
    new PoisonBottle(3700, 540)
  ];
}
