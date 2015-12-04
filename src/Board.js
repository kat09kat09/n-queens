// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function(params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);

      var sum = 0;
      row.forEach(function(val) {
        sum += val;
      });

      if (sum > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowIndexes = _.range(this.get('n'));

      return rowIndexes.some(function(index) {
        return this.hasRowConflictAt(index);
      }, this);
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rowIndexes = _.range(this.get('n'));
      var sum = 0;

      return rowIndexes.some(function(rowIdx) {
        sum += this.get(rowIdx)[colIndex];
        return sum > 1;
      }, this);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var colIndexes = _.range(this.get('n'));

      return colIndexes.some(function(index) {
        return this.hasColConflictAt(index);
      }, this);

    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var colIndex = majorDiagonalColumnIndexAtFirstRow; 
      var rowIndexes= _.range(0, this.get('n')); 
      var colIndexes= _.range(majorDiagonalColumnIndexAtFirstRow, this.get('n')); 

      var rowIndex = 0;
      var sum = 0;
      var topRowConflicts= false;
      var leftColumnConflicts= false;

      if(colIndex===0) {
        //need to check major diagonals on each row
        return rowIndexes.some(function (row) {
          //check the sum of the diagonal starting at the current row, column 0
          var sum=0; 
          var colIdx= 0; 

          for(var i = row; i< this.get('n'); i++) {
              sum+= this.get(i)[colIdx]; 
              colIdx++; 
              //there's a conflict if the sum at anypoint is >1
              if(sum >1) { return true; }  
            
          }
          return false; 
        }, this); 
      } else {
        //otherwise just need to check major diagonal starting at specified column, row 0
        return colIndexes.some(function(index) {
          sum += this.get(rowIndex)[index];
          rowIndex++;
          return sum > 1;
        }, this);
      }

      

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var colIndexes = _.range(this.get('n')); //[0,1,2,3]

      return colIndexes.some(function(index) {
        return this.hasMajorDiagonalConflictAt(index);
      }, this);
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var colIndexes = _.range(minorDiagonalColumnIndexAtFirstRow, -1, -1); //[1,0]
      var rowIndexes= _.range(0, this.get('n')-1); 
      var rowIndex = 0;
      var sum = 0;

      //if we're checking the last column, need to check all the minor diagonals on that column & every row
      if(minorDiagonalColumnIndexAtFirstRow=== this.get('n')-1){
        return rowIndexes.some(function (rowIdx){
          var sum=0; 

          for(var colIdx=this.get('n')-1; colIdx>=0; colIdx--) {
            sum+= this.get(rowIdx)[colIdx];
            rowIdx++; 
            if(sum >1) { return true; }
            if(rowIdx > this.get('n')-1) { return false}
          }
          return false; 
        }, this);
      }else {
        return colIndexes.some(function(index) {
          sum += this.get(rowIndex)[index]; //row 0, col : 3
          rowIndex++;
          return sum > 1;
        }, this);  
      }

      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var colIndexes = _.range(this.get('n') - 1, -1, -1); //[3,2,1,0]

      return colIndexes.some(function(index) {
        return this.hasMinorDiagonalConflictAt(index);
      }, this);

    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
