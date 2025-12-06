import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [lock, setLock] = useState(false);
  const winner = calculateWinner(board);

  function calculateWinner(squares) {
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
        return squares[a]; // "x" or "o"
      }
    }

    if (!squares.includes(null)) return "Draw!";

    return null;
  }

  const Toggle = (e, index) => {
    if (lock || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "x" : "o";

    e.target.innerHTML = `<img src='${xIsNext ? cross_icon : circle_icon}'/>`;

    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const win = calculateWinner(newBoard);
    if (win) setLock(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setLock(false);

    // Clear UI since innerHTML was used
    document.querySelectorAll(".boxes").forEach((box) => (box.innerHTML = ""));
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>

      {winner && (
        <h2 style={{ marginBottom: "10px", color: "yellow" }}>
          {winner === "Draw!" ? "It's a Draw!" : `Winner: ${winner.toUpperCase()}`}
        </h2>
      )}

      <div className="border">
        <div className="row1">
          <div className="boxes" onClick={(e) => Toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => Toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => Toggle(e, 2)}></div>
        </div>

        <div className="row2">
          <div className="boxes" onClick={(e) => Toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => Toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => Toggle(e, 5)}></div>
        </div>

        <div className="row3">
          <div className="boxes" onClick={(e) => Toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => Toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => Toggle(e, 8)}></div>
        </div>
      </div>

      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
