import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  generateBoard() {
    return [ 
             [...Array.from(new Array(3), () => null)], 
             [...Array.from(new Array(3), () => null)], 
             [...Array.from(new Array(3), () => null)] 
           ];
  }

  state = {
            started: false,
            gameOver: false, 
            board: this.generateBoard(), 
            player1: { name: '', piece: 'fa-hand-lizard-o', wins: 0 }, 
            player2: { name: '', piece: 'fa-hand-spock-o', wins: 0 },
            ties: 0,
            turn: 0
          };


  winLogic(arr) {
    if(arr.length && arr.filter(a => a !== null).length)
      if( (arr[0] === arr[1]) && (arr[1] === arr[2])) {
        let { player1, player2 } = this.state;
        const winPlayer = player1.piece === arr[0] ? {stateString: 'player1', obj: player1} : {stateString: 'player2', obj: player2};
        alert(`${winPlayer.obj.name} Wins This Round!`);
        this.setState({ gameOver: true, [winPlayer.stateString]: {...winPlayer.obj, wins: winPlayer.obj.wins + 1}});
      }
  }

  checkTie() {
    let { board, ties } = this.state;
    let filledCount = 0;
    board.forEach(row => {
      row.forEach( cell => {
        if(cell)
         filledCount++;
      });
    });
    if(filledCount === 9) {
      alert('CATS GAME!');
      this.setState({gameOver: true, ties: ties + 1 });
    }
  }

  checkWin() {
    let { board } = this.state;

    // Row Wins
    board.forEach( row => {
      this.winLogic(row);
    });

    // Column Wins
    this.winLogic([board[0][0], board[1][0], board[2][0]]);
    this.winLogic([board[0][1], board[1][1], board[2][1]]);
    this.winLogic([board[0][2], board[1][2], board[2][2]]);

    // Diagonal Wins
    this.winLogic([board[0][0], board[1][1], board[2][2]]);
    this.winLogic([board[2][0], board[1][1], board[0][2]]);

    // Tie
    this.checkTie();
  }

  placePiece = (row, index) => {
    let { turn, player1, player2, board, gameOver } = this.state;
    if(!gameOver && !board[row][index]) {
      let piece, newTurn;

      if(turn === 0) {
        piece = player1.piece;
        newTurn = 1;
      } else {
        piece = player2.piece;
        newTurn = 0;
      }
      board[row][index] = piece;
      this.setState({ board, turn: newTurn });
      this.checkWin();
    }
  }

  resetGame = () => {
    this.setState({ gameOver: false, board: this.generateBoard(), turn: 0 });
  }

  playerStats() {
    let { player1, player2, ties } = this.state;

    return(
      <div>
        <h5>{`${player1.name} Wins: ${player1.wins}`}</h5>
        <h5>{`${player2.name} Wins: ${player2.wins}`}</h5>
        <h5>{`Ties: ${ties}`}</h5>
      </div>
    );
  }

  boardDisplay() {
    const generatedCells = [];
    const player = this.state.turn === 0 ? this.state.player1 : this.state.player2;
    const gameClass = this.state.gameOver ? 'red' : 'green';

    this.state.board.forEach( (rows, rowIndex) => {
      rows.forEach( (cell, cellIndex) => {
        generatedCells.push(
          <div 
            key={`${rowIndex}-${cellIndex}`} 
            onClick={() => this.placePiece(rowIndex, cellIndex)}
            className='col s4 valign-wrapper cell-holder'
          >
            <Cell piece={ this.state.board[rowIndex][cellIndex] } />
          </div>
        );
      });
    });

    return(
      <div className='center'>
        { !this.state.gameOver && <h3 className='green-text'>Your Turn: { player.name }</h3> }
        { this.state.gameOver && <button className='btn' onClick={this.resetGame}>New Game?</button> }
        { this.playerStats() }
        <div className={`${gameClass} row`}>
          { generatedCells }
        </div>
      </div>
    )
  }

  playersDisplay() {
    const players = [
                     {stateName: 'player1', displayName: 'Player 1'}, 
                     {stateName: 'player2', displayName: 'Player 2'}
                   ];
    const inputs = players.map( (player, index) => {
      let attrs = { 
                    required: true, 
                    type: 'text', 
                    value: this.state[player.stateName].name
                  };
      if(index === 0)
        attrs.autoFocus = true;
      return (
        <div key={player.stateName}>
          <label>{player.displayName} Name:</label>
          <input 
            {...attrs}
            onChange={ (e) => this.setName(e, player.stateName) }
          />
        </div>
      );
    });

    return(
      <form>
        { inputs }
        { this.startGameButton() }
      </form>
    );
  }

  startGameButton() {
    let { player1, player2 } = this.state;
    if(player1.name && player2.name)
      return(
        <div className='center'>
          <button type='button' className='btn' onClick={this.startGame}>
            Play Game!
          </button>
        </div>
      );
  }

  setName(e, player) {
    let playerState = this.state[player];
    this.setState({ [player]: { ...playerState, name: e.target.value } })
  }

  startGame = () => {
    this.setState({ started: true });
  }

  render() {
    return(
      <div>
        <h1 className='center'>React Tic Tac Toe</h1>
        <hr />
        { this.state.started ? this.boardDisplay() : this.playersDisplay() }
      </div>
    )
  }
}

export default Board;