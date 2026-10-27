/**
 * Returns the HTML of the end screen after the player has won.
 * @returns {string} The HTML of the win screen.
 */
function getWinScreenTemplate() {
  return `
    <img class="end-title" src="img/6.Botones/Tittles/You win/Recurso 22.png" alt="You win">
    <div class="end-buttons">
      <button class="image-button" onclick="restartGame()">
        <img src="img/6.Botones/Try again/Recurso 15.png" alt="Try again">
      </button>
      <button class="text-button" onclick="goHome()">Home</button>
    </div>
  `;
}


/**
 * Returns the HTML of the end screen after the player has lost.
 * @returns {string} The HTML of the game over screen.
 */
function getGameOverTemplate() {
  return `
    <img class="end-title" src="img/6.Botones/Tittles/Game Over/Recurso 9.png" alt="Game over">
    <div class="end-buttons">
      <button class="image-button" onclick="restartGame()">
        <img src="img/6.Botones/Try again/Recurso 15.png" alt="Try again">
      </button>
      <button class="text-button" onclick="goHome()">Home</button>
    </div>
  `;
}
