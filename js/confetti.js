// confetti

function createConfetti(x, y) {
    for (let i = 0; i < 50; i++) {

        confetti.push({
            x: x,
            y: y,

            // shoot in a random direction
            speedX: (Math.random() - 0.5) * 8,
            speedY: (Math.random() - 0.5) * 8,

            // small random circle
            radius: Math.random() * 4 + 2,

            // fall downward over time
            gravity: 0.15,

            // random color
            color: dvdColor
        });
    }
}

function updateConfetti() {
    for (let piece of confetti) {
        piece.x += piece.speedX;
        piece.y += piece.speedY;

        // gravity
        piece.speedY += piece.gravity;
    }

    // remove confetti that has fallen off the screen
    confetti = confetti.filter(piece => piece.y < canvas.height + 20);
}

function drawConfetti() {
    for (let piece of confetti) {
        ctx.beginPath();
        ctx.arc(piece.x, piece.y, piece.radius, 0, Math.PI * 2);
        ctx.fillStyle = piece.color;
        ctx.fill();
    }
}