// colors

const lightBackgrounds = [
    "#FFFFFF",
    "#E8F1FF",
    "#FFF0F5",
    "#E8FFE8",
    "#FFF8D6"
];

const darkBackgrounds = [
    "#111827",
    "#1E1B4B",
    "#172554",
    "#3F1D3D",
    "#202020"
];

const lightDVDColors = [
    "#FFFFFF",
    "#A7F3D0",
    "#93C5FD",
    "#FDE68A",
    "#FBCFE8"
];

const darkDVDColors = [
    "#000000",
    "#111827",
    "#312E81",
    "#064E3B",
    "#7C2D12"
];

const leftWall = 155;
const rightWall = 1005;
const topWall = 45;
const bottomWall = 617;


// current colors
let backgroundColor = "#FFFFFF";
let dvdColor = "#000000";

// game state
let gameState = "start";
let hits = 0;
const maxHits = 3;

// time const (1/60 sec so like 1 frame in 60 fps)
const timestep = 1000 / 60;

// framerate debug/showcase

let maxFPS = 60;

let lastRenderTime = 0;

let fps = 0;
let frameCount = 0;
let fpsTimer = 0;