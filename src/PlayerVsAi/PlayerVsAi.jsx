import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import './PlayerVsAi.css';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { RxResume } from "react-icons/rx";
import 'animate.css';

const PlayerVsAi = () => {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [currentTurnBoxes, setCurrentTurnBoxes] = useState([]);
  const [removedBoxes, setRemovedBoxes] = useState([]);
  const [playerRemovedBoxes, setPlayerRemovedBoxes] = useState([]);
  const [aiRemovedBoxes, setAiRemovedBoxes] = useState([]);
  const [playerTurn, setPlayerTurn] = useState('player'); // 'player' or 'ai'
  const [startingPlayer, setStartingPlayer] = useState('player'); // 'player' or 'ai'
  const [gameOver, setGameOver] = useState(false);
  const [loser, setLoser] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  const columns = {
    column1: ['t', 'n', 'l'],
    column2: ['t', 't', 'tl', 't', 't'],
    column3: ['t', 'n', 'l', 'l', 'l', 'l', 'l'],
  };

  const handleBoxClick = (column, index) => {
    if (selectedColumn === null || selectedColumn === column) {
      setSelectedColumn(column);
      if (!currentTurnBoxes.includes(`${column}-${index}`)) {
        setCurrentTurnBoxes(prev => [...prev, `${column}-${index}`]);
      }
    }
  };

  const handleGrabClick = () => {
    const newRemovedBoxes = [...removedBoxes, ...currentTurnBoxes];
    const newPlayerRemovedBoxes = playerTurn === 'player' 
      ? [...playerRemovedBoxes, ...currentTurnBoxes] 
      : playerRemovedBoxes;
    const newAiRemovedBoxes = playerTurn === 'ai' 
      ? [...aiRemovedBoxes, ...currentTurnBoxes] 
      : aiRemovedBoxes;
    
    setRemovedBoxes(newRemovedBoxes);
    setPlayerRemovedBoxes(newPlayerRemovedBoxes);
    setAiRemovedBoxes(newAiRemovedBoxes);
    setCurrentTurnBoxes([]);
    setSelectedColumn(null);

    if (Object.keys(columns).every(column => 
      columns[column].every((_, index) => newRemovedBoxes.includes(`${column}-${index}`)))) {
      setGameOver(true);
      setLoser(playerTurn);
      if (playerTurn === 'player') {
        setAiScore(prev => prev + 1); // Increment AI score if player loses
      } else {
        setPlayerScore(prev => prev + 1); // Increment player score if AI loses
      }
    } else {
      setPlayerTurn(playerTurn === 'player' ? 'ai' : 'player');
    }
  };

  const aiMove = () => {
    const availableColumns = Object.keys(columns).filter(column => 
      columns[column].some((_, index) => !removedBoxes.includes(`${column}-${index}`)));

    if (availableColumns.length > 0) {
      const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
      const availableBoxes = columns[randomColumn]
        .map((box, index) => `${randomColumn}-${index}`)
        .filter(box => !removedBoxes.includes(box));
      
      const numBoxesToGrab = Math.floor(Math.random() * availableBoxes.length) + 1;
      const boxesToGrab = availableBoxes.slice(0, numBoxesToGrab);
      
      setCurrentTurnBoxes(boxesToGrab);
      
      setTimeout(() => {
        const newRemovedBoxes = [...removedBoxes, ...boxesToGrab];
        const newPlayerRemovedBoxes = playerTurn === 'player' 
          ? [...playerRemovedBoxes, ...boxesToGrab] 
          : playerRemovedBoxes;
        const newAiRemovedBoxes = playerTurn === 'ai' 
          ? [...aiRemovedBoxes, ...boxesToGrab] 
          : aiRemovedBoxes;

        setRemovedBoxes(newRemovedBoxes);
        setPlayerRemovedBoxes(newPlayerRemovedBoxes);
        setAiRemovedBoxes(newAiRemovedBoxes);
        setCurrentTurnBoxes([]);
        setSelectedColumn(null);

        if (Object.keys(columns).every(column => 
          columns[column].every((_, index) => newRemovedBoxes.includes(`${column}-${index}`)))) {
          setGameOver(true);
          setLoser('ai');
          setPlayerScore(prev => prev + 1); // Increment player score if AI loses
        } else {
          setPlayerTurn('player');
        }
      }, 500); // AI grabs after a short delay
    }
  };

  useEffect(() => {
    if (playerTurn === 'ai' && !gameOver) {
      aiMove();
    }
  }, [playerTurn, gameOver]);

  const restartGame = (resetScores = false) => {
    setSelectedColumn(null);
    setCurrentTurnBoxes([]);
    setRemovedBoxes([]);
    setPlayerRemovedBoxes([]);
    setAiRemovedBoxes([]);
    setGameOver(false);
    setLoser('');
    
    // Alternate the starting player for the next round
    const nextStartingPlayer = startingPlayer === 'player' ? 'ai' : 'player';
    setStartingPlayer(nextStartingPlayer);
    setPlayerTurn(nextStartingPlayer);

    if (resetScores) {
      setPlayerScore(0);
      setAiScore(0);
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
                    onClick={() => playerTurn === 'player' && handleBoxClick(column, index)}
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
          <p>Your score: {playerScore}</p>
          <p>AI score: {aiScore}</p>
        </div>

        <div className="turn">
          {gameOver ? <p className='player'>{loser === 'player' ? 'You Lose' : 'AI Loses'}</p> : <p className='player'>{playerTurn === 'player' ? 'Your Turn' : 'AI Turn'}</p>}
          <p className='your'>Your box: {playerRemovedBoxes.length}</p>
          <p className='ai'>AI box: {aiRemovedBoxes.length}</p>
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

export default PlayerVsAi;
