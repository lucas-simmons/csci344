let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // invoke any drawing functions inside of setup.
  // functions should all go between "createCanvas()" and "drawGrid()"
  draw5Circles();
  draw5RedSquares();
  draw5CirclesFor();
  drawNCircles(20);

  drawNCirclesFlexible(30, 25, 400, 0);
  drawNCirclesFlexible(4, 100, 100, 200);
  drawNCirclesFlexible(8, 50, 700, 100);

  drawNShapesFlexible(30, 30, 335, 0, "square");
  drawNShapesFlexible(4, 100, 120, 200, "circle");
  drawNShapesFlexible(8, 50, 725, 25, "square");

  drawNShapesDirectionFlexible(30, 30, 335, 0, "square", "column");
  drawNShapesDirectionFlexible(4, 100, 120, 200, "circle", "row");
  drawNShapesDirectionFlexible(8, 50, 725, 425, "circle", "row");

  drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5Circles() {
  noFill();
  // fill("red");
  let x = 100;
  let y = 100;
  let d = 10;

  let i = 0;
  while (i < 200) {
    circle(x, y + 10 * i, d++); // centerX, centerY, radius
    circle(x + 200, y + 10 * i, d++); // centerX, centerY, radius

    if (i % 2 === 0) {
      fill("blue");
    } else {
      fill("red");
    }
    ++i;
  }
}
function draw5CirclesFor() {
  noFill();
  let x = 200;
  let y = 200;
  let d = 10;

  for (i = 0; i < 5; i++) {
    circle(x, y + 10 * i, d++); // centerX, centerY, radius
  }
}
function drawNCircles(n) {
  noFill();
  let x = 500;
  let y = 250;
  let d = 10;

  for (i = 0; i < n; i++) {
    circle(x, y + 10 * i, d++); // centerX, centerY, radius
  }
}

function drawNCirclesFlexible(n, size, x, y) {
  noFill();

  for (i = 0; i < n; i++) {
    circle(x, y + i * size, size); // centerX, centerY, radius
  }
}
function drawNShapesFlexible(n, size, x, y, shape) {
  noFill();

  for (i = 0; i < n; i++) {
    if (shape === "square") {
      square(x, y + i * size, size);
      fill("lightblue");
    }
    if (shape === "circle") {
      circle(x, y + i * size, size); // centerX, centerY, radius
      fill("gray");
    }
  }
}
function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
  noFill();

  for (i = 0; i < n; i++) {
    if (direction === "row") {
      if (shape === "square") {
        square(x + i * size, y, size);
        fill("lightblue");
      }
      if (shape === "circle") {
        circle(x + i * size, y, size); // centerX, centerY, radius
        fill("gray");
      }
    } else {
      if (shape === "square") {
        square(x, y + i * size, size);
        fill("lightblue");
      }
      if (shape === "circle") {
        circle(x, y + i * size, size); // centerX, centerY, radius
        fill("gray");
      }
    }
  }
}

function draw5RedSquares() {
  fill("red");
  square(320, 200, 50); // topLeftX, topLeftY, width
  square(320, 250, 50);
  square(320, 300, 50);
  square(320, 350, 50);
  square(320, 400, 50);
}
