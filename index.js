"use strict";
let duration = 1000;
let blocksContainer = document.querySelector(".memory-blocks-game");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
let timer = document.querySelector(".timer span");
let bool = false;
let matchedItems = 0;
document
  .querySelector(".control-buttons span")
  .addEventListener("click", () => {
    let yourName = prompt("Enter your name: ");

    //make all blocks visible
    blocks.forEach((block) => {
      block.classList.add("is-flipped");
    });

    // after one second >> all blocks will be un visible
    setTimeout(() => {
      blocks.forEach((block) => {
        block.classList.remove("is-flipped");
      });
    }, duration);
    if (yourName == "" || yourName == null) {
      document.querySelector(".name span").innerHTML = "unknown";
    } else {
      document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
    // changing on the timer.

    let counter1 = setInterval(() => {
      timer.innerHTML -= 1;
      if (timer.innerHTML == 0 || matchedItems == 10) {
        clearInterval(counter1);
        checkAllMatched();
      }
    }, duration);
  });

function checkAllMatched() {
  blocks.forEach((block) => {
    if (block.classList.contains("has-match")) {
      bool = true;
    } else {
      bool = false;
    }
  });

  if (bool == false) {
    document.querySelector(".loser").style.display = "block";
  } else {
    document.querySelector(".success").style.display = "block";
  }
}

// call the shuffle function to randomize the orderRange
shuffling(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // add click event
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

// flip block function
function flipBlock(selectedBlock) {
  // set the class to selected block.
  selectedBlock.classList.add("is-flipped");

  // collect the  flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    // stop clicking function .
    stopClick();

    // check match block function.
    matching(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// stop click function
function stopClick(blocks) {
  // add class no clicking on my container that has all  block.
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    // remove class no clicking on my container
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// matching blocks.
function matching(block1, block2) {
  let triesElement = document.querySelector(".info-container .tries span");

  if (block1.dataset.shuffle === block2.dataset.shuffle) {
    // to prevent the conflict that will be happened  in teh flipped block function.
    block1.classList.remove("is-flipped");
    block2.classList.remove("is-flipped");

    block1.classList.add("has-match");
    block2.classList.add("has-match");
    matchedItems += 1;
    console.log(matchedItems);
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      block1.classList.remove("is-flipped");
      block2.classList.remove("is-flipped");
    }, duration);
  }
}

// to make a random array .
function shuffling(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current); //get random number in the range of the orderRange array
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
    current--;
  }
  return array;
}

//# sourceMappingURL=index.js.map
