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

  var slotOccupied = function(loc){
    if(_board_array[loc[0]][loc[1]] !== ''){
      return true;
    } else {
      return false;
    }
  };

  return{
    init: init,
    addMark: addMark,
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
      switchTurns();
    }  
  };

  var switchTurns = function() {
    if(_player === PLAYER_ONE) {
      _player = PLAYER_TWO;
    } else {
      _player = PLAYER_ONE;
    }
  };

  return{
    init: init,
  }

})();

$(document).ready(function() {
  board.init();
  ticTacToeGame.init(board);
});