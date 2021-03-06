import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      winner: undefined
    }
    this.gameState={
      turn: 'X',
      gameEnded: false,
      board: Array(9).fill(''),
      totalMoves: 0,
      gameLocked:false
    }
  }


  clicked(box){

    if(this.gameState.gameEnded || this.gameState.gameLocked) return;

    if(this.gameState.board[box.dataset.square]=='')
    {
        this.gameState.board[box.dataset.square]=this.gameState.turn;
        box.innerText=this.gameState.turn;
        this.gameState.turn= this.gameState.turn == 'X' ? 'O' : 'X';
        this.gameState.totalMoves++;
    }

    var result= this.checkWinner();
    if(result == 'X') {
      this.gameState.gameEnded=true;
      this.setState({
        winner: 'X',
        winnerline:'Match won by X',
        reloadline:'Refresh page to play again'
      });
    }
    else if(result == 'O'){
      this.gameState.gameEnded=true;
      this.setState({
        winner: 'O',
        winnerline:'Match won by O',
        reloadline:'Refresh page to play again'
      });
    }
    else if (result=='draw'){
      this.gameState.gameEnded=true;
      this.setState({
        winner: 'draw',
        winnerline:'Match is drawn',
        reloadline:'Refresh page to play again'
      });
    }

    if(this.gameState.turn == 'O' && !this.gameState.gameEnded){
      this.gameState.gameLocked=true;
      setTimeout(()=>{
        do{
        var random = Math.floor(Math.random()*9);
      } while(this.gameState.board[random] != '');
      this.gameState.gameLocked=false;
      this.clicked(document.querySelectorAll('.square')[random])

      },1000); 
    }
  }

  checkWinner(){

    var moves=[
    /*column*/
    [0,3,6], [1,4,7], [2,5,8], 
    /*diagonal*/
    [0,4,8], [2,4,6],
    /*rows*/
    [0,1,2], [3,4,5], [6,7,8]
    ];
    var board = this.gameState.board;
    for(let i=0; i<moves.length; i++){
      if(board[moves[i][0]] == board[moves[i][1]] 
            && board[moves[i][1]] == board[moves[i][2]])
      return board[moves[i][0]];
    }

    if(this.gameState.totalMoves==9){
      return 'draw';
    }
  }

  render(){
  return (
      <div id="game">
        <div id="head">
          Dumb Tic-Tac-Toe AI Tutorial
          <div id="delay">
            AI responds in 1 second
          </div>
        </div>
        <div id="board" onClick={(e)=>this.clicked(e.target)}>
            <div class="square" data-square="0"></div>
            <div class="square" data-square="1"></div>
            <div class="square" data-square="2"></div>
            <div class="square" data-square="3"></div>
            <div class="square" data-square="4"></div>
            <div class="square" data-square="5"></div>
            <div class="square" data-square="6"></div>
            <div class="square" data-square="7"></div>
            <div class="square" data-square="8"></div>
        </div> 
        <div id="status">{this.state.winnerline}</div>
        <div id="status">{this.state.reloadline}</div>
      </div>
    );
  }
}

export default App;
