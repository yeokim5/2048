// make empty tile
let nonEmptyArray = [];
const tileArray = " ".repeat(16).split("");
const tileGrid = tileArray
  .map((t) => `<button class="tile"><h1 class="typing-text"></h1></button>`)
  .join("");

const tiles = document.querySelector(".tiles");
tiles.innerHTML = tileGrid;

// inital randomtile
makeRandomTile();
window.addEventListener("keydown", handleArrowKey);

function resetGame() {
  // Reset tileArray
  tileArray.fill(" ");

  // Clear the nonEmptyArray
  nonEmptyArray = [];

  // Reset the tiles on the HTML grid
  modifyTileArray();

  // Remove the hidden class from the gameover element
  gameover.classList.add("hidden");

  // Make the initial random tile
  makeRandomTile();
}

const gameover = document.querySelector(".gameover");
gameover.textContent = "RESTART";
gameover.addEventListener("click", () => {
  resetGame();
});

// make random Tile
function makeRandomTile() {
  if (nonEmptyArray.length === 16) {
    console.log(`game over`);
    gameover.classList.remove("hidden");
    return; // Exit the function if the grid is full
  }

  let randomTile;
  do {
    randomTile = Math.floor(Math.random() * 16);
  } while (tileArray[randomTile] !== " "); // Keep generating randomTile until it's an empty slot

  const randomNumber = Math.random();
  tileArray[randomTile] = randomNumber < 0.5 ? 2 : 4;
  const newTile = tiles.children[randomTile].children[0];
  newTile.textContent = tileArray[randomTile];
  newTile.dataset.value = tileArray[randomTile];
}

function modifyTileArray() {
  for (let i = 0; i < tileArray.length; i++) {
    nonEmptyArray = [];
    const tile = tileArray[i];
    tiles.children[i].children[0].textContent = tile;
    tiles.children[i].children[0].dataset.value = tile;
    tileArray.map((tile) => {
      if (tile !== " ") {
        nonEmptyArray.push(tile);
      }
    });
  }
}

// control functions
function handleArrowKey(event) {
  switch (event.key) {
    case "ArrowUp":
      keyUP();
      makeRandomTile();
      break;
    case "ArrowDown":
      keyDOWN();
      makeRandomTile();
      break;
    case "ArrowLeft":
      keyLEFT();
      makeRandomTile();
      break;
    case "ArrowRight":
      keyRIGHT();
      makeRandomTile();
      break;
  }
}
function move(upArray) {
  // check if it's all empty
  const emptyIndices = upArray.filter((index) => tileArray[index] === " ");
  if (emptyIndices.length === 4) {
    // If all tiles are empty, do nothing
    return;
  }

  // modify array
  const nonEmptyTiles = upArray
    .map((index) => tileArray[index])
    .filter((tile) => tile !== " ");

  // merge tiles with the same value
  const mergedTiles = [];
  let i = 0;
  while (i < nonEmptyTiles.length) {
    if (
      i < nonEmptyTiles.length - 1 &&
      nonEmptyTiles[i] === nonEmptyTiles[i + 1]
    ) {
      const mergedValue = parseInt(nonEmptyTiles[i]) * 2; // Merge tiles by doubling their value
      mergedTiles.push(mergedValue);
      i += 2; // Skip the next tile since it was merged
    } else {
      mergedTiles.push(nonEmptyTiles[i]);
      i++;
    }
  }

  // Fill the rest with empty tiles
  const newTiles = mergedTiles.concat(Array(4 - mergedTiles.length).fill(" "));

  // change tileArray
  for (let i = 0; i < upArray.length; i++) {
    tileArray[upArray[i]] = newTiles[i];
  }
  modifyTileArray();
}

function keyUP() {
  const arr = [
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
  ];
  arr.forEach((a) => {
    move(a);
    modifyTileArray();
  });
}
function keyDOWN() {
  const arr = [
    [12, 8, 4, 0],
    [13, 9, 5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
  ];
  arr.forEach((a) => {
    move(a);
    modifyTileArray();
  });
}

function keyLEFT() {
  const arr = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
  ];
  arr.forEach((a) => {
    move(a);
    modifyTileArray();
  });
}

function keyRIGHT() {
  const arr = [
    [3, 2, 1, 0],
    [7, 6, 5, 4],
    [11, 10, 9, 8],
    [15, 14, 13, 12],
  ];
  arr.forEach((a) => {
    move(a);
    modifyTileArray();
  });
}

// key down for mobile
let startX, startY;
let isSwiping = false;

document.addEventListener("touchstart", (e) => {
  if (!isSwiping) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
  }
});

document.addEventListener("touchmove", (e) => {
  if (!isSwiping) return;

  const endX = e.touches[0].clientX;
  const endY = e.touches[0].clientY;
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      keyRIGHT();
    } else {
      keyLEFT();
    }
  } else {
    if (deltaY > 0) {
      keyDOWN();
    } else {
      keyUP();
    }
  }

  startX = endX;
  startY = endY;
  isSwiping = false; // Reset the flag to allow the next swipe
});

// Prevent the default behavior of arrow keys (e.g., scrolling)
window.addEventListener("keydown", function (event) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
  }
});

/* [O] put random num in any tile 
        [] gth 1 :  it's background color 
    and color is diff by the num

    [O] every 1 second random tile displays in empty title, 
        [] gth 1 :  as time goes tile display X2


    [O] when i arrow key it adds shift the array


    []  high score

    [] add animation whenever i modify tiles

    [] if achieve high score graphetii, every 100 point chagne text color 

    [] make the restart to work

*/
