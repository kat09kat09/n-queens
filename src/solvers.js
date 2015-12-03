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

window.findNRooksSolution = function(n) { //n=5
  var solution = undefined; //fixme

  var board = new Board({n: n});
  var rookCount = n;

  var colNumbers = _.range(0, n); //[0,1,2,3,4]
  var rowNumbers = _.range(0, n); //[0,1,2,3,4]

  colNumbers.forEach(function(colIndex) {
    rowNumbers.forEach(function(rowIndex) {
     board.togglePiece(rowIndex, colIndex);
     var hasConflicts = board.hasAnyRooksConflicts();
     if (hasConflicts) {
      board.togglePiece(rowIndex, colIndex);
     } else {
      rookCount--;
     }
    });
  });

  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
