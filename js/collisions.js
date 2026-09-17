function checkWallCollision(wall) {

    // DVD collision box
    const dvdLeft = dvdX - dvdWidth / 2 + 18;
    const dvdRight = dvdX + dvdWidth / 2 + 18;
    const dvdTop = dvdY + 30 - dvdHeight / 2;
    const dvdBottom = dvdY + 30 + dvdHeight / 2;


    // check if a point is inside DVD
    function pointInsideDVD(x, y) {
        return (
            x >= dvdLeft &&
            x <= dvdRight &&
            y >= dvdTop &&
            y <= dvdBottom
        );
    }


    // check whether two line segments intersect
    function linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {

        const denominator =
            (x1 - x2) * (y3 - y4) -
            (y1 - y2) * (x3 - x4);

        if (denominator === 0) {
            return false;
        }

        const t =
            ((x1 - x3) * (y3 - y4) -
             (y1 - y3) * (x3 - x4))
            / denominator;

        const u =
            -((x1 - x2) * (y1 - y3) -
              (y1 - y2) * (x1 - x3))
            / denominator;

        return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }


    // check DVD edges 
    const edges = [
        // top
        [dvdLeft, dvdTop, dvdRight, dvdTop],

        // right
        [dvdRight, dvdTop, dvdRight, dvdBottom],

        // bottom
        [dvdLeft, dvdBottom, dvdRight, dvdBottom],

        // left
        [dvdLeft, dvdTop, dvdLeft, dvdBottom]
    ];


    // if either endpoint of wall is inside DVD
    if (
        pointInsideDVD(wall.startX, wall.startY) ||
        pointInsideDVD(wall.endX, wall.endY)
    ) {
        return true;
    }


    // check whether wall intersects any DVD edge
    for (let edge of edges) {

        if (
            linesIntersect(
                wall.startX,
                wall.startY,
                wall.endX,
                wall.endY,

                edge[0],
                edge[1],
                edge[2],
                edge[3]
            )
        ) {
            return true;
        }
    }

    return false;
}

function bounceOffWall(wall) {

    // wall direction
    const wallX = wall.endX - wall.startX;
    const wallY = wall.endY - wall.startY;

    const wallLengthSquared =
        wallX * wallX +
        wallY * wallY;

    // find point on wall segment closest to center of DVD
    let t =
        ((dvdX - wall.startX) * wallX +
         (dvdY - wall.startY) * wallY)
        / wallLengthSquared;

    // keep point on actual line segment
    t = Math.max(0, Math.min(1, t));

    const closestX =
        wall.startX + t * wallX;

    const closestY =
        wall.startY + t * wallY;


    // direction from wall to DVD
    let normalX = dvdX - closestX;
    let normalY = dvdY - closestY;

    const normalLength =
        Math.sqrt(
            normalX * normalX +
            normalY * normalY
        );

    // avoid divide by zero
    if (normalLength === 0) {
        return;
    }

    normalX /= normalLength;
    normalY /= normalLength;


    // only bounce if DVD is moving toward wall
    const velocityTowardWall =
        dvdSpeedX * normalX +
        dvdSpeedY * normalY;

    if (velocityTowardWall >= 0) {
        return;
    }


    // reflect velocity
    const dot =
        dvdSpeedX * normalX +
        dvdSpeedY * normalY;

    dvdSpeedX =
        dvdSpeedX - 2 * dot * normalX;

    dvdSpeedY =
        dvdSpeedY - 2 * dot * normalY;
}

function updateFadingWalls() {

    for (let wall of fadingWalls) {
        wall.alpha -= 0.05;
    }

    fadingWalls = fadingWalls.filter(wall => wall.alpha > 0);
}

function checkFireballWallCollision(wall) {

    const radius = 15;

    // wall direction
    const wallX = wall.endX - wall.startX;
    const wallY = wall.endY - wall.startY;

    const wallLengthSquared =
        wallX * wallX +
        wallY * wallY;

    // find closest point on wall to fireball
    let t =
        ((fireballX - wall.startX) * wallX +
         (fireballY - wall.startY) * wallY)
        / wallLengthSquared;

    // keep point on wall segment
    t = Math.max(0, Math.min(1, t));

    const closestX =
        wall.startX + t * wallX;

    const closestY =
        wall.startY + t * wallY;

    // distance from fireball to closest point
    const distanceX = fireballX - closestX;
    const distanceY = fireballY - closestY;

    const distance =
        Math.sqrt(
            distanceX * distanceX +
            distanceY * distanceY
        );

    return distance <= radius;
}

function checkFireballDVDCollision() {
    const dvdLeft = dvdX - dvdWidth / 2;
    const dvdRight = dvdX + dvdWidth / 2;
    const dvdTop = dvdY - dvdHeight / 2;
    const dvdBottom = dvdY + dvdHeight / 2;

    const closestX = Math.max(dvdLeft, Math.min(fireballX, dvdRight));
    const closestY = Math.max(dvdTop, Math.min(fireballY, dvdBottom));

    const distanceX = fireballX - closestX;
    const distanceY = fireballY - closestY;

    return Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
    ) <= 10;
}

