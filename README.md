# DVD Escape

A simple JavaScript Canvas game where the player draws walls to redirect a bouncing DVD logo (custom logo drawn in Canvas) while avoiding a moving fireball. [Inspired by this scene from the Office](https://youtu.be/QOtuX0jL85Y?si=fsPQfqBuSAlMn8V4) (not playable on mobile).

## How to Play

- Click **Start** to begin the game.
- Move your mouse while holding the button to draw walls on the canvas.
- Walls redirect the DVD when it collides with them.
- The fireball moves around the screen and can burn through walls.
- The DVD changes color when it hits a wall.
- Get the DVD into a corner to win.
- The DVD can take up to 3 hits from the fireball before the game ends.
- The DVD has 2 seconds of invulnerable recovery time when hit so you don't get trapped by the fireball.
- Click after winning or losing to play again.

## Features

- Interactive mouse-controlled wall drawing
- DVD and fireball movement
- Wall collision and redirection
- Fireball wall destruction
- DVD and Fireball trail effect
- DVD damage animation 
- Hit counter and game states
- Win and game-over screens
- Confetti effect on victory
- Adjustable maximum rendering FPS (60, 30, 15, Unlimited (browser maximum))
- Fixed-timestep game simulation with variable-rate rendering

## Controls

| Input | Action |
| --- | --- |
| Mouse click/drag | Draw walls |
| Click on Start | Start the game |
| Click after Win/Lose | Restart the game |
| Click on Max FPS button | Change rendering limit |

## Game Engine

The game uses a **fixed-timestep simulation with variable-rate rendering**. The game state is updated at a consistent 60 updates per second. Rendering can be limited to different frame rates to showcase this. 

The available rendering settings are:

- 60 FPS
- 30 FPS
- 15 FPS
- Unlimited

This keeps the game simulation independent of the rendering frame rate.

## Technologies

- HTML5 Canvas
- JavaScript
- HTML
- CSS

## Running the Game

Open `index.html` in a web browser, or visit the GitHub Pages version:

**[Play DVD Escape](https://raghavarun.github.io/DVD-Escape/)**

If you download the source code, you can uncomment `drawCollisionBox()` in `index.html` to see the DVD's collision box when you play. 

## Project Structure

```text
DVD-animation/
├── index.html
└── js/
    ├── config.js
    ├── ui.js
    ├── player.js
    ├── dvd.js
    ├── collisions.js
    ├── fireball.js
    └── confetti.js
