/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//[[1,0,0,0,0],
//[0,1,0,0,0],
//[0,0,1,0,0],
//[0,0,0,1,0],
//[0,0,0,0,1]]

//[[0,0,0,0,0],
//[0,0,0,0,0],
//[0,0,0,0,0],
//[0,0,0,0,0],
//[0,0,0,0,0]]

window.findNRooksSolution = function(n, startCol, startRow) { //n=5
  var solution = undefined;

  var board = new Board({
    n: n
  });
  var rookCount = n - 1;
  startCol = startCol || 0;
  startRow = startRow || 0;


  var colNumbers = _.range(0, n); //[0,1,2,3,4]
  var rowNumbers = _.range(0, n); //[0,1,2,3,4]


  board.togglePiece(startRow, startCol);

  colNumbers.forEach(function(colIndex) { //0
    rowNumbers.forEach(function(rowIndex) { //0,
      var pieceOnBoard = board.get(rowIndex)[colIndex];

      if (pieceOnBoard === 0) {
        board.togglePiece(rowIndex, colIndex);
        var hasConflicts = board.hasAnyRooksConflicts();
        if (hasConflicts) {
          board.togglePiece(rowIndex, colIndex);
        } else {
          rookCount--;
        }
      }
    });
  });

  if (rookCount === 0) {
    solution = board.rows();
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board= new Board({n:n});

  //wrap recursion logic in a fxn to call later
  var theRecursion = function(rowCnt) {
    //base case
    // console.log('rowCnt', rowCnt);
    // console.log('n', n);

    if (rowCnt === n) {
      //stop the recursion (down the tree), if the row count is at "n" (aka max row idx)

      // you found a solution!! ==> must increment solution count
      solutionCount++;

      //remember to put a return statement in order to
      return;

    }
    //recurse case
    // iterate through decision A=> C
    for (var i = 0; i < n; i++) {
      // chosen decision : place your rook at a position
      board.togglePiece(rowCnt, i);
      //if there are no conflicts based on chosen decision
      if (!board.hasAnyRooksConflicts()) {
        //recurse based on the state of the board currently (after your decsiion)
        theRecursion(rowCnt+1);
      }

      // must clear the board of your most recent decision
      board.togglePiece(rowCnt, i);
    }
  };

  //called the recursive fxn
  theRecursion(0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0; //fixme
  var board= new Board({n:n});

  //wrap recursion logic in a fxn to call later
  var theRecursion = function(rowCnt) {
    //base case

    if (rowCnt === n) {
      //stop the recursion (down the tree), if the row count is at "n" (aka max row idx)

      // you found a solution!! ==> must increment solution count
      solutionCount++;

      //remember to put a return statement in order to
      return;

    }
    //recurse case
    // iterate through decisions
    for (var i = 0; i < n; i++) {
      // chosen decision : place your rook at a position
      board.togglePiece(rowCnt, i);
      //if there are no conflicts based on chosen decision
      if (!board.hasAnyQueensConflicts()) {
        //recurse based on the state of the board currently (after your decsiion)
        theRecursion(rowCnt+1);
      }

      // must clear the board of your most recent decision
      board.togglePiece(rowCnt, i);
    }
  };

  //called the recursive fxn
  theRecursion(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


