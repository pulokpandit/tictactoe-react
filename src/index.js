/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// // import ShoppingList from './Components/ShoppingList';
// // import App from './App';
// // import reportWebVitals from './reportWebVitals';

// class ShoppingList extends React.Component {
//   render() {
//     return (
//       <div className="shopping-list">
//         <h1>Shopping List for {this.props.name}</h1>
//         <ul>
//           <li>Instagram</li>
//           <li>WhatsApp</li>
//           <li>Oculus</li>
//         </ul>
//       </div>
//     );
//   }
// }

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square"
//         onClick={() => this.props.onClick() }>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square"
      onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      showRestartBtn: false,
      gameEnded: false,
      allSpacesFilled: false,
    };
  }

  handleClick(i) {
    // console.log(i);
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

    // checkForEnd();
  }

  checkEndGame() {
    let allSpacesFilled = true;
    const squares = this.state.squares.slice();
    const winner = this.calculateWinner(squares);

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        allSpacesFilled = false;
      }
    }

    if (winner) {
      this.setState({
        gameEnded: true,
        showRestartBtn: true,
      });
    }else if (allSpacesFilled) {
      this.setState({
        gameEnded: true,
        showRestartBtn: true,
        allSpacesFilled: true,
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.gameEnded)
      this.checkEndGame();
  }

  restartGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      showRestartBtn: false,
      gameEnded: false,
      allSpacesFilled: false,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner is: ' + winner;
    } else if(this.state.allSpacesFilled){
      status = "No more moves available! 'Game Tied'"
    }else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let restartGame;
    if (this.state.showRestartBtn) {
      restartGame = <button onClick={() => this.restartGame()}>RestartGame</button>;
    } else {
      restartGame = ""
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{restartGame}</div>
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


