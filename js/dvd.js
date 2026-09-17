// starting position
let dvdX = 400;
let dvdY = 250;

// movement speed
let dvdSpeedX = 2.4;
let dvdSpeedY = 1.6;

// confetti
let confetti = [];

// trail
let dvdTrail = [];
let trailCounter = 0;

// original center position of the logo
const originalX = 400;
const originalY = 250;


// letter settings
const letterSize = 110;
const letterSpacing = 60;


// disc settings
const discX = 400;
const discY = 330;
const discRadiusX = 160;
const discRadiusY = 30;

const dvdWidth = 358;
const dvdHeight = 160;

// hole settings
const holeRadiusX = 38;
const holeRadiusY = 8;

function drawDVD() {

    ctx.save();

    if (hitCooldown > 0 && Math.floor(hitCooldown / 10) % 2 === 0 && hits < 3) {
        ctx.globalAlpha = 0.5;
    }

    // move entire DVD as one object
    ctx.translate(
        dvdX - originalX,
        dvdY - originalY
    );

    // disc

    ctx.beginPath();

    ctx.ellipse(
        discX,
        discY,
        discRadiusX,
        discRadiusY,
        0,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = dvdColor;
    ctx.fill();

    // hole in disc

    ctx.beginPath();

    ctx.ellipse(
        discX,
        discY,
        holeRadiusX,
        holeRadiusY,
        0,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = backgroundColor;
    ctx.fill();

    // DVD Letters

    ctx.save();

    ctx.fillStyle = dvdColor;

    ctx.font =
        `italic 900 ${letterSize}px Arial Black, Arial, sans-serif`;

    ctx.textBaseline = "middle";

    // make letters wider to mirror real DVD logo
    ctx.scale(1.5, 1);

    const letters = ["D", "D"];

    let x = 160;

    for (const letter of letters) {

        ctx.fillText(
            letter,
            x,
            originalY
        );

        x +=
            ctx.measureText(letter).width
            + letterSpacing;
    }

    ctx.restore();

    // slit in first D

    ctx.beginPath();

    ctx.moveTo(275, 220);
    ctx.lineTo(314, 220);
    ctx.lineTo(312, 225);
    ctx.lineTo(270, 225);

    ctx.closePath();

    ctx.fillStyle = backgroundColor;
    ctx.fill();


    // slit in second D

    ctx.beginPath();

    ctx.moveTo(493, 220);
    ctx.lineTo(532, 220);
    ctx.lineTo(530, 225);
    ctx.lineTo(488, 225);

    ctx.closePath();

    ctx.fillStyle = backgroundColor;
    ctx.fill();


    // V Drawing (it's a pointy bottom so has to be drawn)

    ctx.beginPath();

    // top-left
    ctx.moveTo(370, 202.5);

    // inner-left
    ctx.lineTo(400, 202.5);

    // bottom point
    ctx.lineTo(425, 250);

    // inner-right
    ctx.lineTo(470, 202.5);

    // top-right
    ctx.lineTo(500, 202.5);

    // outer-bottom/right
    ctx.lineTo(420, 300);

    ctx.closePath();

    ctx.fillStyle = dvdColor;
    ctx.fill();

    ctx.restore();
}
// debug: draw line around collision box 
function drawCollisionBox() {

    const dvdLeft = dvdX - dvdWidth / 2 + 18;
    const dvdRight = dvdX + dvdWidth / 2 + 18;
    const dvdTop = dvdY + 30 - dvdHeight / 2;
    const dvdBottom = dvdY + 30 + dvdHeight / 2;

    ctx.beginPath();

    ctx.moveTo(dvdLeft, dvdTop);
    ctx.lineTo(dvdRight, dvdTop);
    ctx.lineTo(dvdRight, dvdBottom);
    ctx.lineTo(dvdLeft, dvdBottom);
    ctx.closePath();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// UPDATE DVD POSITION

function updateDVD() {

    trailCounter++;

    if (trailCounter >= 8) {
        dvdTrail.push({
            x: dvdX,
            y: dvdY
        });

        trailCounter = 0;
    }

    if (dvdTrail.length > 25) {
        dvdTrail.shift();
    }

    dvdX += dvdSpeedX;
    dvdY += dvdSpeedY;

    // check which walls DVD has reached

    const hitLeft = dvdX <= leftWall;
    const hitRight = dvdX >= rightWall;

    const hitTop = dvdY <= topWall;
    const hitBottom = dvdY >= bottomWall;

    const cornerDistance = 10;

    const reachedCorner =
        (dvdX <= leftWall + cornerDistance &&
        dvdY <= topWall + cornerDistance) ||

        (dvdX >= rightWall - cornerDistance &&
        dvdY <= topWall + cornerDistance) ||

        (dvdX <= leftWall + cornerDistance &&
        dvdY >= bottomWall - cornerDistance) ||

        (dvdX >= rightWall - cornerDistance &&
        dvdY >= bottomWall - cornerDistance);

    // corner

    if (reachedCorner) {
        gameState = "win";

        createConfetti(dvdX, dvdY);
        createConfetti(dvdX + 40, dvdY);
        createConfetti(dvdX - 40, dvdY);
        createConfetti(dvdX, dvdY + 40);
        createConfetti(dvdX, dvdY - 40);

        return;
    }


    // left / right walls

    else if (hitLeft || hitRight) {

        // reverse horizontal direction
        dvdSpeedX *= -1;

        // change colors
        changeColors();
    }


    // top / bottom walls

    else if (hitTop || hitBottom) {

        // reverse vertical direction
        dvdSpeedY *= -1;

        // change colors
        changeColors();
    }

    // drawn walls 

    for (let i = 0; i < walls.length; i++) {

        if (checkWallCollision(walls[i])) {

            bounceOffWall(walls[i]);

            changeColors();

            fadingWalls.push({
                startX: walls[i].startX,
                startY: walls[i].startY,
                endX: walls[i].endX,
                endY: walls[i].endY,
                color: walls[i].color,
                alpha: 1
            });

            walls.splice(i, 1);

            break;
        }
    }
}

// trail

function drawTrail() {
    for (let i = 0; i < dvdTrail.length; i++) {
        const point = dvdTrail[i];

        const opacity = (i / dvdTrail.length) * 0.4;

        ctx.save();

        ctx.globalAlpha = opacity;

        ctx.translate(
            point.x - originalX,
            point.y - originalY
        );

        // small trail DVD

        ctx.beginPath();

        ctx.ellipse(
            discX,
            discY,
            20,
            4,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = dvdColor;
        ctx.fill();

        // small hole

        ctx.beginPath();

        ctx.ellipse(
            discX,
            discY,
            6,
            1.4,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = backgroundColor;
        ctx.fill();

        ctx.restore();
    }
}