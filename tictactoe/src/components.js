/** @format */

import { useState } from "react";
import React from "react";

export const Board = () => {
	//definir estados e variaveis
	const [board_array, set_board_array] = useState(Array(9).fill(null));
	const [player, set_player] = useState(true); //true corresponde a 'X'
	const winner = calculateWinner(board_array);
	let status;

	if (winner) {
		status = "Vencedor: " + winner;
	} else {
		status = "Jogador: " + (player ? "X" : "O");
	}

	//função principal
	const handleClick = (i) => {
		const squares = board_array.slice();
		if (squares[i] !== null) {
			alert("Ups");
		} else {
			const board_array_updated = updateBoard(i);
			calculateWinner(board_array_updated[i]);
			set_player(!player);
		}
	};

	//funções helper
	const handleReset = () => {
		set_player(true);
		set_board_array(Array(9).fill(null));
	};

	const updateBoard = (i) => {
		const board_array_updated = board_array.slice();
		if (player === true) {
			board_array_updated[i] = "X";
		} else {
			board_array_updated[i] = "O";
		}
		set_board_array(board_array_updated);
		return board_array_updated;
	};

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
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				setTimeout(() => {
					handleReset();
				}, 1000);
				return squares[a];
			}
		}
		return null;
	}

	//funções de render
	const Square = ({ onClick, value }) => {
		return (
			<div>
				<button className="btn" onClick={() => onClick()}>
					{value}
				</button>
			</div>
		);
	};

	const renderRows = (i) => {
		return <div className="board-row">{renderSquares(i)}</div>;
	};

	const renderSquares = (lower_limit) => {
		let squares = [];
		for (let i = lower_limit; i < lower_limit + 3; i++) {
			squares.push(renderSquare(i));
		}
		return squares;
	};

	const renderSquare = (i) => {
		return <Square value={board_array[i]} onClick={() => handleClick(i)} />;
	};

	//render do board
	return (
		<div className="board">
			{renderRows(0)}
			{renderRows(3)}
			{renderRows(6)}
			<h3>{status}</h3>
			<button onClick={handleReset}>Recomeçar</button>
		</div>
	);
};

export default Board;
