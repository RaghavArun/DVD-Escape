let fireballX = 700;
let fireballY = 400;

let fireballSpeedX = 6;
let fireballSpeedY = 5;

let fireballTrail = [];
let fireballTrailCounter = 0;

let hitCooldown = 0;

function updateFireball() {

    if (hitCooldown > 0) {
        hitCooldown--;
    }

    fireballTrailCounter++;

    if (fireballTrailCounter >= 4) {
        fireballTrail.push({
            x: fireballX,
            y: fireballY
        });

        fireballTrailCounter = 0;
    }

    if (fireballTrail.length > 25) {
        fireballTrail.shift();
    }

    fireballX += fireballSpeedX;
    fireballY += fireballSpeedY;

    // bounce off left and right walls
    if (fireballX <= 0 || fireballX >= canvas.width) {
        fireballSpeedX *= -1;
    }

    // bounce off top and bottom walls
    if (fireballY <= 0 || fireballY >= canvas.height) {
        fireballSpeedY *= -1;
    }

    for (let i = 0; i < walls.length; i++) {

        if (checkFireballWallCollision(walls[i])) {

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
    
    if (checkFireballDVDCollision() && hitCooldown === 0) {
        hits++;
        hitCooldown = 120;

        if (hits >= maxHits) {
            gameState = "lose";
        }
    }
}

function drawFireball() {

    // outer glow
    ctx.save();

    ctx.beginPath();
    ctx.arc(
        fireballX,
        fireballY,
        24,
        0,
        Math.PI * 2
    );

    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "#FF4500";
    ctx.fill();

    ctx.restore();


    // main fireball
    ctx.beginPath();
    ctx.arc(
        fireballX,
        fireballY,
        15,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#FF4500";
    ctx.fill();
}

function drawFireballTrail() {

    for (let i = 0; i < fireballTrail.length; i++) {

        const point = fireballTrail[i];

        const opacity =
            (i / fireballTrail.length) * 0.25;

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            15,
            0,
            Math.PI * 2
        );

        ctx.globalAlpha = opacity;
        ctx.fillStyle = "#FF4500";
        ctx.fill();

        ctx.globalAlpha = 1;
    }
}
