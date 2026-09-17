let walls = [];
let fadingWalls = [];
let isDrawingWall = false;
let wallStartX = 0;
let wallStartY = 0;
let wallEndX = 0;
let wallEndY = 0;

canvas.addEventListener("mousedown", function(event) {
    if (gameState !== "playing") {
        return;
    }

    isDrawingWall = true;

    wallStartX = event.offsetX;
    wallStartY = event.offsetY;

    wallEndX = wallStartX;
    wallEndY = wallStartY;
});


canvas.addEventListener("mousemove", function(event) {
    if (isDrawingWall) {
        wallEndX = event.offsetX;
        wallEndY = event.offsetY;
    }
});


canvas.addEventListener("mouseup", function(event) {
    if (isDrawingWall) {
        wallEndX = event.offsetX;
        wallEndY = event.offsetY;

        const wallLength = Math.sqrt(
            (wallEndX - wallStartX) ** 2 +
            (wallEndY - wallStartY) ** 2
        );

        if (wallLength >= 10) {
            walls.push({
                startX: wallStartX,
                startY: wallStartY,
                endX: wallEndX,
                endY: wallEndY,
                color: dvdColor
            });
        }

        isDrawingWall = false;
    }
});

canvas.addEventListener("click", function(event) {

    // Max FPS setting
    if (gameState === "playing" &&
        event.offsetX >= 20 &&
        event.offsetX <= 220 &&
        event.offsetY >= 40 &&
        event.offsetY <= 75) {

        if (maxFPS === 60) {
            maxFPS = 30;
        } else if (maxFPS === 30) {
            maxFPS = 15;
        } else if (maxFPS === 15) {
            maxFPS = 0;
        } else {
            maxFPS = 60;
        }

        // draw();
        return;
    }

    if (gameState === "start") {
        gameState = "playing";
    }

    else if (gameState === "win" || gameState === "lose") {
        restartGame();
    }

});

// PLAYER WALLS
function drawWalls() {

    // Draw active walls
    for (let wall of walls) {

        ctx.beginPath();

        ctx.moveTo(wall.startX, wall.startY);
        ctx.lineTo(wall.endX, wall.endY);

        ctx.lineWidth = 6;
        ctx.strokeStyle = wall.color;
        ctx.globalAlpha = 1;
        ctx.stroke();
    }


    // Draw fading walls
    for (let wall of fadingWalls) {

        ctx.beginPath();

        ctx.moveTo(wall.startX, wall.startY);
        ctx.lineTo(wall.endX, wall.endY);

        ctx.lineWidth = 6;
        ctx.strokeStyle = wall.color;
        ctx.globalAlpha = wall.alpha;
        ctx.stroke();
    }


    // Reset transparency
    ctx.globalAlpha = 1;


    // Draw wall currently being created
    if (isDrawingWall) {

        ctx.beginPath();

        ctx.moveTo(wallStartX, wallStartY);
        ctx.lineTo(wallEndX, wallEndY);

        ctx.lineWidth = 6;
        ctx.strokeStyle = dvdColor;
        ctx.globalAlpha = 1;
        ctx.stroke();
    }
}