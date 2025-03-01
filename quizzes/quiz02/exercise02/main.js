const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // function invocations goes here:

  drawGrid(canvasWidth, canvasHeight);

  drawMonster(100, 100, 150, "#0bc9cd", false);
  drawMonster(300, 200, 75, "#8093f1", true);
  drawMonster(100, 325, 100, "#8093f1", false);
  drawMonster(250, 375, 125, "#7fb285", true);
  drawMonster(550, 200, 250, "#7fb285", false);
}

// function definition goes here:
function drawMonster(x, y, size, color, isSurprised) {
  rectMode(CENTER);
  fill(color);
  rect(x, y, size, size);
  fill("white");
  rect(x - size * 0.25, y - size * 0.25, size / 6, size / 6);
  rect(x + size * 0.25, y - size * 0.25, size / 6, size / 6);
  fill("black");

  rect(x - size * 0.25, y - size * 0.25, size / 10, size / 10);
  rect(x + size * 0.25, y - size * 0.25, size / 10, size / 10);

  if (isSurprised) {
    rect(x, y + size * 0.25, size / 3.5, size / 3);
  } else {
    rect(x, y + size * 0.25, size / 2, size / 8);
  }
}
