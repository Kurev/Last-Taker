import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './PlayerVsPlayer.css';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { RxResume } from "react-icons/rx";
import 'animate.css';

const PlayerVsPlayer = () => {
  // State variables to manage game logic
  const [selectedColumn, setSelectedColumn] = useState(null); // Currently selected column
  const [currentTurnBoxes, setCurrentTurnBoxes] = useState([]); // Boxes selected in the current turn
  const [removedBoxes, setRemovedBoxes] = useState([]); // Boxes that have been removed
  const [player1RemovedBoxes, setPlayer1RemovedBoxes] = useState([]); // Boxes removed by Player 1
  const [player2RemovedBoxes, setPlayer2RemovedBoxes] = useState([]); // Boxes removed by Player 2
  const [playerTurn, setPlayerTurn] = useState('player1'); // Indicates whose turn it is: 'player1' or 'player2'
  const [startingPlayer, setStartingPlayer] = useState('player1'); // Keeps track of the starting player for the next game
  const [gameOver, setGameOver] = useState(false); // Indicates if the game is over
  const [loser, setLoser] = useState(''); // Keeps track of the loser
  const [player1Score, setPlayer1Score] = useState(0); // Player 1's score
  const [player2Score, setPlayer2Score] = useState(0); // Player 2's score

  // Define the game board columns
  const columns = {
    column1: ['t', 'n', 'l'],
    column2: ['t', 't', 'tl', 't', 't'],
    column3: ['t', 'n', 'l', 'l', 'l', 'l', 'l'],
  };

  // Handle clicking on a box
  const handleBoxClick = (column, index) => {
    if (selectedColumn === null || selectedColumn === column) {
      setSelectedColumn(column); // Set the selected column
      if (!currentTurnBoxes.includes(`${column}-${index}`)) {
        setCurrentTurnBoxes(prev => [...prev, `${column}-${index}`]); // Add box to the current turn selection
      }
    }
  };

  // Handle grabbing the selected boxes
  const handleGrabClick = () => {
    const newRemovedBoxes = [...removedBoxes, ...currentTurnBoxes];
    const newPlayer1RemovedBoxes = playerTurn === 'player1'
      ? [...player1RemovedBoxes, ...currentTurnBoxes]
      : player1RemovedBoxes;
    const newPlayer2RemovedBoxes = playerTurn === 'player2'
      ? [...player2RemovedBoxes, ...currentTurnBoxes]
      : player2RemovedBoxes;

    // Update the state with the new removed boxes
    setRemovedBoxes(newRemovedBoxes);
    setPlayer1RemovedBoxes(newPlayer1RemovedBoxes);
    setPlayer2RemovedBoxes(newPlayer2RemovedBoxes);
    setCurrentTurnBoxes([]);
    setSelectedColumn(null);

    // Check if all boxes have been removed, indicating game over
    if (Object.keys(columns).every(column =>
      columns[column].every((_, index) => newRemovedBoxes.includes(`${column}-${index}`)))) {
      setGameOver(true);
      setLoser(playerTurn); // Set the current player as the loser
      if (playerTurn === 'player1') {
        setPlayer2Score(prev => prev + 1); // Increment Player 2's score if Player 1 loses
      } else {
        setPlayer1Score(prev => prev + 1); // Increment Player 1's score if Player 2 loses
      }
    } else {
      setPlayerTurn(playerTurn === 'player1' ? 'player2' : 'player1'); // Switch turns
    }
  };

  // Handle restarting the game
  const restartGame = (resetScores = false) => {
    setSelectedColumn(null);
    setCurrentTurnBoxes([]);
    setRemovedBoxes([]);
    setPlayer1RemovedBoxes([]);
    setPlayer2RemovedBoxes([]);
    setGameOver(false);
    setLoser('');

    // Alternate the starting player for the next round
    const nextStartingPlayer = startingPlayer === 'player1' ? 'player2' : 'player1';
    setStartingPlayer(nextStartingPlayer);
    setPlayerTurn(nextStartingPlayer);

    if (resetScores) {
      setPlayer1Score(0);
      setPlayer2Score(0); // Reset scores if resetScores is true
    }
  };

  return (
    <div className='playerAi-container'>
      <div className="ai-box">
        <img src={logo} alt="Logo" className='Ailogo' /> 
        <div className="boxes">
          {Object.keys(columns).map((column, colIndex) => (
            <div className={`column${colIndex + 1}`} key={column}>
              {columns[column].map((box, index) => (
                !removedBoxes.includes(`${column}-${index}`) && (
                  <div
                    key={index}
                    className={`box ${box} ${currentTurnBoxes.includes(`${column}-${index}`) ? 'clicked' : ''}`}
                    onClick={() => handleBoxClick(column, index)}
                  ></div>
                )
              ))}
            </div>
          ))}
        </div>

        <div className="grab">
          <button onClick={handleGrabClick} disabled={gameOver}>Grab</button>
        </div>
      </div>
      
      <div className="details">
        <div className="score">
          <p>Player 1 score: {player1Score}</p>
          <p>Player 2 score: {player2Score}</p>
        </div>

        <div className="turn">
          {gameOver ? (
            <p className='player'>{loser === 'player1' ? 'Player 1 Loses' : 'Player 2 Loses'}</p>
          ) : (
            <p className='player'>{playerTurn === 'player1' ? 'Player 1 Turn' : 'Player 2 Turn'}</p>
          )}
          <p className='your'>Player 1 boxes: {player1RemovedBoxes.length}</p>
          <p className='ai'>Player 2 boxes: {player2RemovedBoxes.length}</p>
        </div>

        <div className="btn">
          <Link to='/'>
            <button><IoMdArrowRoundBack /></button>
          </Link>
          <button onClick={() => restartGame()}><RxResume /></button>
          <button onClick={() => restartGame(true)}><VscDebugRestart /></button>
        </div>
      </div>
    </div>
  );
};

export default PlayerVsPlayer;
