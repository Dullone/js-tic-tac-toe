var board = (function() {
  var _board_array = [];

  var init = function(){
    clearBoard();

  };

  var clearBoard = function(){
    _board_array =  [   ['', '', ''],
                        ['', '', ''],
                        ['', '', '']];
  };

  var addMark = function(id, mark){
    var loc = divIdToArrayLocation(id);
    
    if(slotOccupied(loc)){
      console.log("occupied: " + loc);
      return false;
    }

    _board_array[loc[0]][loc[1]] = mark;
    addMarkToHtmlBoard(id, mark);

    return true;
  };

  var divIdToArrayLocation = function(id){
    var loc = [];
    loc.push(Number(id.charAt(4)  - 1));
    loc.push(Number(id.charAt(10) - 1));
    return loc;
  };

  var addMarkToHtmlBoard = function(id, mark){
    $('#' + id).text(mark);
  };

  var getRow = function(row) {
    return _board_array[row];
  };

  var getColumn = function(col) {
    var column = _board_array.map(function(val, idx) { return val[col]; } );
    return column;
  };

  var getDiagonal = function(diag){
    var ar = [];
    //upper right to lower left
    if(diag === 1){
      for (var i = 0; i < _board_array.length; i++) {
        ar.push(_board_array[i][_board_array.length - 1 - i])
      };
    }
    //upper left to lower right
    if(diag === 0){
      for (var i = 0; i < _board_array.length; i++) {
        ar.push(_board_array[i][i])
      };
    }
   return ar;
  };

  var slotOccupied = function(loc){
    if(_board_array[loc[0]][loc[1]] !== ''){
      return true;
    } else {
      return false;
    }
  };

  var size = function(){
    return _board_array.length;
  }

  return{
    init: init,
    addMark: addMark,
    getColumn: getColumn,
    getRow: getRow,
    getDiagonal: getDiagonal,
    size: size,
  }

})();

var ticTacToeGame = (function(){
  var _board;
  const PLAYER_ONE = 'X';
  const PLAYER_TWO = 'O';
  var _player;

  var init = function(board){
    _board = board;
    _player = PLAYER_ONE;
    $('#board div .game-square').click(clickBoard.bind(this));
  };

  var clickBoard = function(event){
    //if we recieve false, mark was not added
    if(_board.addMark(event.currentTarget.id, _player)) {
      if(checkForWin()) {
        console.log('win!');
      }
      switchTurns();
      _board.getColumn(1);
    }  
  };

  var switchTurns = function() {
    if(_player === PLAYER_ONE) {
      _player = PLAYER_TWO;
    } else {
      _player = PLAYER_ONE;
    }
  };

  var checkForWin = function() {
    console.log('_______________________')
    //rows
    for (var i = _board.size() - 1; i >= 0; i--) {
      if(arrayHasWin(_board.getRow(i))) {
        return true;
      }
    };

    //columns
    for (var i = _board.size() - 1; i >= 0; i--) {
      if(arrayHasWin(_board.getColumn(i))) {
        return true;
      }
    };
    //diag
    if(arrayHasWin(_board.getDiagonal(0)) || arrayHasWin(_board.getDiagonal(1))) {
      return true;
    }
    return false;
  };

  var arrayHasWin = function(ar){
    //console.log(ar);
    for (var i = ar.length - 1; i >= 1; i--) {
      if(ar[i] !== ar[i-1] || ar[i] === ''){
        return false
      }
    };

    return true;
  };

  return{
    init: init,
  }

})();

$(document).ready(function() {
  board.init();
  ticTacToeGame.init(board);
});