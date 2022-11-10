let currentPlayer = 1

let gameOver = false
let board = [] // array of rows, each row is array of cells  (board[y][x])

let rows = 6
let columns = 7

let currColumns = [5, 5, 5, 5, 5, 5, 5]


function makeGame () {

    for (let r = 0; r < rows; r++ ) {
        board.push(Array.from({length: columns}))
      for (let c = 0; c < columns; c++ ) {


        /* <div id = "0-0" class ="tile"></div> */
          let tile = document.createElement('div');
          tile.classList.add('tile')
          tile.setAttribute('id',`${r}-${c}`)
          document.getElementById("board").append(tile)
          tile.addEventListener('click', setPiece)



      }
   }
}
// ✅need to create tiles to append to the board
// ✅create a hover effect for each tile
// ✅create alternating tile color for each player
// ✅create a way for tiles to fill from the bottom up row by row

/* create an end game result when a player connects 4 tiles
diagonal, horizontal, vertical */
// creates a draw game results if all tiles are filled

function setPiece(event){
   if(gameOver) {
      return
   }
    const id = event.target.id // 0-5

    let c = id[2]
    let r = currColumns[c]
    if (r < 0) {
        return
    }
    board[r][c] = currentPlayer
   let tile = document.getElementById(`${r}-${c}`)


    if (currentPlayer === 1) {
        tile.classList.add("red-piece")
        currentPlayer = 2
    }
    else{
        tile.classList.add("black-piece")
        currentPlayer = 1
    }
    r -= 1
    currColumns[c] = r

    function endGame(msg) {
        alert(msg)
        gameOver = true

    }

    if (checkForWin()){
        return endGame(`Player ${currentPlayer} won! `)
    }
    if (board.every(columns => columns.every(tile => tile))) {
        return endGame('Tie!');
    }

}

function checkForWin () {
    function win(tiles) {


        return tiles.every(
            ([r,c]) =>
                r >= 0 &&
                r < columns &&
                c >= 0 &&
                c < rows &&
                board[r][c] === currentPlayer
        )


    }
    for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
        // ways to win
        const horiz = [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]]
        const vert = [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]]
        const diagDR = [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]]
        const diagDL = [[r, c], [r + 1, c - 1], [r + 2, c - 2], [r + 3, c -3]];


        if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
            return true;
        }
    }
}
makeGame()
