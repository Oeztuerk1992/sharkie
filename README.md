# Sharkie – 2D Underwater Jump and Run

Sharkie is a 2D jump-and-run game in the deep sea. You play a little shark who swims through a coral reef, collects coins and poison bottles, fights puffer fish and jelly fish and finally faces the big whale.
It was built as a student project at the Developer Akademie with plain HTML, CSS and JavaScript on an HTML5 canvas – object-oriented, no frameworks.

---

## Features

- **Smooth character animations** – Idle, swimming, attack, hurt and dead animations for Sharkie.
- **Gravity and jumping** – Sharkie slowly sinks to the ground and can push himself up again with several jumps in a row.
- **Bubble attack** – Normal bubbles trap puffer fish and jelly fish. Poison bubbles use a collected poison bottle.
- **Two enemy types + end boss** – Puffer fish that inflate themselves, jelly fish that swim up and down (the green and pink ones are extra dangerous) and a whale that dives in from above at the end of the level.
- **Collectibles** – Coins and poison bottles, each with its own status bar.
- **Health system** – Sharkie loses energy when he touches an enemy and is invulnerable for a short time after each hit. When his life bar is empty, the game is lost.
- **Precise hit boxes** – Every object has its own offsets, so collisions only happen where the object is really visible.
- **Scrolling camera** – The camera follows Sharkie through a seamless background with five parallax layers.
- **Landscape only** – On phones and tablets in portrait mode a hint asks you to turn your device.

---

## Controls

| Key | Action |
|-----|--------|
| ← / → | Swim left / right |
| Space or ↑ | Jump / swim up |
| D | Shoot a bubble |
| F | Shoot a poison bubble (needs a poison bottle) |

---

## Tech Stack

- HTML5 Canvas
- CSS3
- JavaScript (Vanilla, ES6 classes)

---

## Getting Started

1. Clone the repository:
```bash
   git clone https://github.com/Oeztuerk1992/sharkie.git
```
2. Open the project folder in VS Code.
3. Start **Live Server** from the project root folder.
4. Open `index.html` and start playing.

---

## Project Structure

```
index.html            Start page with the game canvas
impressum.html        Legal notice
script.js             Starts the game and reads the keyboard
style.css             Layout of the page
classes/              One file per class (World, Character, enemies, status bars, ...)
levels/               Level data – where enemies, barriers, coins and bottles are placed
templates/            Functions that return HTML templates
img/                  All graphics (Sharkie, enemies, background, status bars, buttons)
fonts/                Local font files
sounds/               Music and sound effects
```

### Class overview

```
DrawableObject                Everything that is drawn on the canvas
├── BackgroundObject          One background layer
├── Barrier                   Rocks and reefs
├── StatusBar                 Life, coin and poison bar
└── MovableObject             Everything that moves, gets hit or is animated
    ├── Character             Sharkie
    ├── PufferFish            Enemy type 1
    ├── JellyFish             Enemy type 2
    ├── EndBoss               The whale
    ├── ThrowableObject       Bubble and poison bubble
    ├── Coin
    └── PoisonBottle

World                         Draws everything, moves the camera and checks collisions
Level                         Holds all objects of one level
Keyboard                      Remembers which keys are pressed
```

---

## Clean Code

- Max. 14 lines per function, one task per function
- Max. 400 lines per file
- Every function documented with [JSDoc](https://jsdoc.app/about-getting-started.html)
- camelCase names in English
- No `console.log` and no console errors

---

## Author

| Name | GitHub |
|------|--------|
| Sinan Öztürk | [@Oeztuerk1992](https://github.com/Oeztuerk1992) |

---

## Credits

- Graphics: provided by the [Developer Akademie](https://developerakademie.com/)
- Font: [Luckiest Guy](https://fonts.google.com/specimen/Luckiest+Guy) (Apache License 2.0)
- Snore sound: "Cartoon Whistle Snore" by [BudgetPixel AI](https://budgetpixel.com/sfx/cartoon-whistle-snore-f5c02db6) (CC BY 4.0)
