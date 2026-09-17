
function drawUI() {

    if (gameState === "start") {

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(250, 180, 700, 360);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.font = "bold 40px Arial";
        ctx.fillText("DVD Escape", canvas.width / 2, 250);

        ctx.font = "22px Arial";
        ctx.fillText(
            "Draw walls with your mouse to redirect the DVD.",
            canvas.width / 2,
            310
        );

        ctx.fillText(
            "Get the DVD into a corner before the fireball catches it.",
            canvas.width / 2,
            350
        );

        ctx.fillText(
            "You can take 3 hits before the DVD dies.",
            canvas.width / 2,
            390
        );

        ctx.fillText(
            "Beware! The fireball can burn down your walls.",
            canvas.width / 2,
            430
        );

        ctx.font = "bold 24px Arial";
        ctx.fillText(
            "Click to Start",
            canvas.width / 2,
            480
        );
    }


    if (gameState === "playing") {

        ctx.fillStyle = dvdColor;
        ctx.textAlign = "left";
        ctx.font = "bold 22px Arial";

        ctx.fillText(
            "Hits: " + hits + " / " + maxHits,
            20,
            35
        );

        ctx.fillText(
            "Max FPS: " + (maxFPS === 0 ? "Unlimited" : maxFPS),
            20,
            65
        );

    }


    if (gameState === "win") {

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(250, 220, 700, 280);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.font = "bold 45px Arial";
        ctx.fillText(
            "YOU WIN!",
            canvas.width / 2,
            310
        );

        ctx.font = "22px Arial";
        ctx.fillText(
            "You made it to the corner!",
            canvas.width / 2,
            360
        );

        ctx.font = "bold 24px Arial";
        ctx.fillText(
            "Click to Play Again",
            canvas.width / 2,
            425
        );
    }

    if (gameState === "lose") {

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(250, 220, 700, 280);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.font = "bold 45px Arial";
        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            310
        );

        ctx.font = "22px Arial";
        ctx.fillText(
            "The fireball caught you!",
            canvas.width / 2,
            360
        );

        ctx.font = "bold 24px Arial";
        ctx.fillText(
            "Click to Play Again",
            canvas.width / 2,
            425
        );
    }

    ctx.textAlign = "left";
}
