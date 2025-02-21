let canvasWidth = document.documentElement.clientWidth - 10;
let canvasHeight = document.documentElement.clientHeight - 10;

// in p5.js, the function runs on page load:
function setup() {
  rectMode(CENTER);
  createCanvas(canvasWidth, canvasHeight);
}

// in p5.js, special event handler that listens for click events:
function mouseClicked() {
  // in p5.js, mouseX and mouseY are
  // built-in global variabls that track the
  // current position of your mouse.
  let randomNumber = Math.random();
  let randShapeNum = Math.random();
  if (randShapeNum > 0.5) {
    circle(mouseX, mouseY, randomNumber * 100);
  } else {
    square(mouseX, mouseY, randomNumber * 100);
  }

  //   if (mouseX % 2 === 0) {
  //     fill("blue");
  //   } else {
  //     fill("yellow");
  //   }
  randomColor();
}

function randomColor() {
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = math.random() * 255;

  let randomNumber = Math.random();
  let randShapeNum = Math.random();
  fill(...getColor());
  if (randShapeNum > 0.5) {
    circle(mouseX, mouseY, randomNumber * 100);
  } else {
    square(mouseX, mouseY, randomNumber * 100);
  }
}

// in p5.js, special event handler that listens for drag events:
function mouseDragged() {
  let randomNumber = Math.random();
  let randShapeNum = Math.random();

  if (randShapeNum > 0.5) {
    circle(mouseX, mouseY, randomNumber * 100);
  } else {
    square(mouseX, mouseY, randomNumber * 100);
  }
  randomColor();
}

/**
 * Challenges:
 * 1. As you click / drag, can the circles have different colors and sizes?
 *      * Try using the Math.random() function
 * 2. Can you make the click / drag sometimes make circles and sometimes make rectangles
 *      * Sample rectangle function invocation: rect(mouseX, mouseY, 100, 100);
 * 3. Can you make each click create a bulleye of different colors?
 *      * Hint: make sure you draw the bigger circles before you draw the smaller circles.
 */
