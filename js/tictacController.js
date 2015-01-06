angular.module("tictacApp").controller("tictacController", tictacController);
  
  tictacController.$inject = ["$firebase"];

function tictacController($firebase) {
  var that = this;

  function getFirebaseGame() {
    var ref = new Firebase('https://saveherojoe.firebaseio.com/game');
    var game = $firebase(ref).$asObject();
    return game;
  }
  
  that.game = getFirebaseGame();
  that.started = false;

//submitGame function
  that.submitGame = function(player) {
    if(that.started) {
      return false;
    }
    if (player == 1 && that.game.inputOne) {
      that.game.playerOne = that.game.inputOne;
      that.game.formOne = false;
      that.game.playerOneWelcome = true;
      that.game.playerOne = that.game.inputOne;

    } else if (player == 2 && that.game.inputTwo) {
      that.game.playerTwo = that.game.inputTwo;
      that.game.formTwo = false;
      that.game.playerTwoWelcome = true;
      that.game.playerTwo = that.game.inputTwo;
    }
    that.game.$save(); 
  };

//startgame fuction
  that.startGame = function() {
    if(that.started) {
      return false;
    }
    that.started = true;
    that.game.playerOneWelcome = false;
    that.game.playerTwoWelcome = false;
    that.game.gameDisabled = false;
    that.game.$save(); 
  };
  
  //newgame function
  that.newGame = function() {
      if(!that.started) {
        return false;
      }
    that.game.gameDisabled = false;
      that.resetGame();
      that.game.$save();
  };
  //restart game function
  that.restartGame = function() {
    if(!that.started) {
      return false;
    }
    if(confirm('I AM GIVING YOU A SECOND CHANCE!')) {
    that.game.gameDisabled = false;
      that.resetGame();
    }
    that.game.$save();
  };

  that.playerXwins = function() {
    return that.findWinner("x", that.game.playerOne);
  };

  that.playerOwins = function() {
    return that.findWinner("o", that.game.playerTwo);
  };

  that.tieCheck = function() {
    var check = 0;
    for (i = 0; i < 9; i++) {
      if (!that.game.gameBoard[i] == "") {
        check++;
      }

    }
    if (check > 8) {
      that.endGame("Tie Game!");
    }

    return check;

  };

  //reset function 
  that.resetGame = function(newGame) {
    for (i = 0; i < that.game.gameBoard.length; i++) {
      that.game.gameBoard[i] = "";
      // that.game.gameBoardImg[i] = "";
    }
    that.xturn = true;
    that.game.message = "";
    that.game.messageNewGame = "";

    if(newGame) {
      that.game.playerOne = "";
      that.game.playerTwo = "";
      that.game.playerOneWelcome = false;
      that.game.playerTwoWelcome = false;
      that.game.gameDisabled = true;
      that.game.formOne = true;
      that.game.formTwo = true;
      that.game.stat = {Total:0, Xwins:0, Owins:0, Draw:0};
      that.game.$save();
    }
  };

  // Play game function
  that.playTile = function(position) {
    if (that.game.gameBoard[position] == "") {
      if (that.xturn) {
        that.game.gameBoard[position] = "x";
        that.game.$save();
        if(!that.playerXwins()) {
          that.tieCheck();
        }
      } else {
        that.game.gameBoard[position] = "o";
        that.game.$save();
        if(!that.playerOwins()) {
          that.tieCheck();
        }
      }
      that.xturn = !that.xturn;

    }
  }

  // set property
  that.game.gameBoard = [ "", "", "", "", "", "", "", "", "" ];
  // that.game.gameBoardImg = [ "", "", "", "", "", "", "", "", "" ];

  that.game.inputOne = "Player One";
  that.game.inputTwo = "Player Two";

  that.game.playerOne = "";
  that.game.playerTwo = "";
  that.game.$save();
  
  that.resetGame(true);

  // check Winner function
  that.findWinner = function(player, playerName) {
    if (that.game.gameBoard[0] == player && that.game.gameBoard[1] == player
        && that.game.gameBoard[2] == player) {
      return that.isWinner(player, playerName);
    } else if (that.game.gameBoard[3] == player && that.game.gameBoard[4] == player
        && that.game.gameBoard[5] == player) {
      return that.isWinner(player, playerName);
    } else if (that.game.gameBoard[6] == player && that.game.gameBoard[7] == player
        && that.game.gameBoard[8] == player) {
      return that.isWinner(player, playerName);
    } else if (that.game.gameBoard[0] == player && that.game.gameBoard[3] == player
        && that.game.gameBoard[6] == player) {
      return that.isWinner(player, playerName);
    } else if (that.game.gameBoard[1] == player && that.game.gameBoard[4] == player
        && that.game.gameBoard[7] == player) {
      return that.isWinner(player, playerName);
    } else if (that.game.gameBoard[2] == player && that.game.gameBoard[5] == player
        && that.game.gameBoard[8] == player) {
      return that.isWinner(player, playerName);
    } else if (that.game.gameBoard[0] == player && that.game.gameBoard[4] == player
        && that.game.gameBoard[8] == player) {
      return that.isWinner(player, playerName);
    } else if (that.game.gameBoard[2] == player && that.game.gameBoard[4] == player
        && that.game.gameBoard[6] == player) {
      return that.isWinner(player, playerName);
    }
    return false;
  };

  that.isWinner = function(player, playerName) {
    that.endGame(playerName + " Wins", player);
    return true;

  };
  
  that.endGame = function(msg, winner) {
    that.game.gameDisabled = true;
    that.showMessage(msg, true);
    that.game.stat.Total++;
    if(winner=="x") {
      that.game.stat.Xwins++;
    } else if(winner=="o") {
      that.game.stat.Owins++;
    } else {
      that.game.stat.Draw++;
    }
    that.game.$save();
  };

  that.showMessage = function(msg, newGame) {
    that.game.message = msg;
    that.game.messageNewGame = (msg) ? newGame :  false;
    that.game.$save();
  };
}