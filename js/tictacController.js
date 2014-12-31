
angular
  .module("tictacApp")
  .controller("tictacController", tictacController);

function tictacController(){ 

	 //set property 
   this.gameBoard = ["", "", "", "", "","", "", "",""];
   gameBoard = this.gameBoard;

   this.xturn = true; 
   xturn = this.xturn; 

   this.playerOne = "Player One";
   this.playerTwo = "Player Two";

   this.playerOne = ""; 
   this.playerTwo = "";
   this.formOne = true; 
   this.playerOneWelcome = false;
   this.formTwo = true;
   this.playerTwoWelcome = false;
   this.submitGame = submitGame;
   this.startGame = startGame; 
   this.gameDisabled = true; 
   this.playerXwins = playerXwins; 
   this.playerOwins = playerOwins; 
   this.tieCheck = tieCheck; 
   this.resetGame = resetGame; 

   //startgame function 

   function submitGame(player){
    if (player==1){
      this.formOne = false; 
      this.playerOneWelcome = true; 
      this.playerOne = this.inputOne; 

    } else if (player == 2){
      this.formTwo = false; 
      this.playerTwoWelcome = true; 
      this.playerTwo = this.inputTwo; 
    }
   }

   function startGame(){
    this.playerOneWelcome = false;
    this.playerTwoWelcome = false;
    this.gameDisabled = false; 
   }
   
  //Play game function
   this.playTile = playTile;
   function playTile(position){
      if(this.gameBoard[position] == ""){
       if (this.xturn){
           this.gameBoard[position]= "x"; 
           playerXwins(); tieCheck(); 
       }else {
            console.log(this);
          this.gameBoard[position]= "o";
          playerOwins(); tieCheck(); 
      }

      this.xturn = !this.xturn;

    }
  }

 //Reset game & Tie game function 
    function resetGame(){
        for(i=0; i < gameBoard.length; i++){
            gameBoard[i] = "";
        }
        this.xturn = false;
        this.playerOne = ""; 
        this.playerTwo = "";
        this.formOne = true; 
        this.playerOneWelcome = false;
        this.formTwo = true;
        this.playerTwoWelcome = false;
        this.submitGame = submitGame;
        this.startGame = startGame; 
        this.gameDisabled = true;  
}

    function tieCheck() {
        var check = 0;
        for(i = 0; i < 9; i++){
           if(!gameBoard[i] == ""){
            check++;
        }
    }
    if(check > 8){
        alert("Tie Game!"); resetGame(); 
    }

    return check; 
  
  }
  
//check Winner function
function playerXwins() {
    console.log(gameBoard);
    if(gameBoard[0] == "x" && gameBoard[1] == "x" && gameBoard[2] == "x"){
        alert(this.playerOne + " Wins"); resetGame(); 
    }  
    else if(gameBoard[3] == "x" && gameBoard[4] == "x" && gameBoard[5] == "x"){
        alert(this.playerOne + " Wins"); resetGame();
    }
    else if(gameBoard[6] == "x" && gameBoard[7] == "x" && gameBoard[8] == "x"){
        alert(this.playerOne + " Wins"); resetGame();
    }
    else if(gameBoard[0] == "x" && gameBoard[3] == "x" && gameBoard[6] == "x"){
        alert(this.playerOne + " Wins"); resetGame();
    }
    else if(gameBoard[1] == "x" && gameBoard[4] == "x" && gameBoard[7] == "x"){
        alert(this.playerOne + " Wins"); resetGame();
    }
    else if(gameBoard[2] == "x" && gameBoard[5] == "x" && gameBoard[8] == "x"){
        alert(this.playerOne + " Wins"); resetGame();
    }
    else if(gameBoard[0] == "x" && gameBoard[4] == "x" && gameBoard[8] == "x"){
        alert(this.playerOne + " Wins"); resetGame();
    }
    else if(gameBoard[2] == "x" && gameBoard[4] == "x" && gameBoard[6] == "x"){
        alert(this.playerOne + " Wins"); resetGame();
    }    
}

function playerOwins() {
    if(gameBoard[0] == "o" && gameBoard[1] == "o" && gameBoard[2] == "o"){
        alert(this.playerTwo + " Wins"); resetGame();
    }
    else if(gameBoard[3] == "o" && gameBoard[4] == "o" && gameBoard[5] == "o"){
        alert(this.playerTwo + " Wins"); resetGame();
    }
    else if(gameBoard[6] == "o" && gameBoard[7] == "o" && gameBoard[8] == "o"){
        alert(this.playerTwo + " Wins"); resetGame();
    }
    else if(gameBoard[0] == "o" && gameBoard[3] == "o" && gameBoard[6] == "o"){
        alert(this.playerTwo + " Wins"); resetGame();
    }
    else if(gameBoard[1] == "o" && gameBoard[4] == "o" && gameBoard[7] == "o"){
        alert(this.playerTwo + " Wins"); resetGame();
    }
    else if(gameBoard[2] == "o" && gameBoard[5] == "o" && gameBoard[8] == "o"){
        alert(this.playerTwo + " Wins"); resetGame();
    }
    else if(gameBoard[0] == "o" && gameBoard[4] == "o" && gameBoard[8] == "o"){
        alert(this.playerTwo + " Wins"); resetGame();
    }
    else if(gameBoard[2] == "o" && gameBoard[4] == "o" && gameBoard[6] == "o"){
        alert(this.playerTwo + " Wins"); resetGame();    
    }}   

}