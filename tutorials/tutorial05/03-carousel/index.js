let currentPosition = 0;
let gap = 10;
const slideWidth = 400;

function moveCarousel(direction) {
  // selecting the carousel from the DOM
  const items = document.querySelectorAll(".carousel-item");
  // checking if the forward button was pressed or the back button, back is the only other option, so no need to specify.
  if (direction == "forward") {
    // minus 2 b/c first 2 slides already showing, cannot go forward if at the end of carousel list
    if (currentPosition >= items.length - 2) {
      return false;
    }
    // updating the current carousel item shown's index for going forward
    currentPosition++;
  } else {
    if (currentPosition == 0) {
      // if carousel is at the beginning of the list, it cannot go further back
      return false;
    }
    // updating the current carousel item shown's index for pressing back
    currentPosition--;
  }
  // calculating how much to move the carousel item after button is pressed
  const offset = (slideWidth + gap) * currentPosition;
  // moving the carousel along a direction based on how many items are in the carousel
  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`; // shifting the items to the direction in animation
  }
}
