import React, { useState, useEffect, useRef } from 'react';
import * as styles from './Game.css';

interface Position {
  x: number;
  y: number;
}

type GameState = 'setup' | 'playing' | 'finished';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const MALLET_SIZE = 140;
const MOLE_SIZE = 165;
const COLLISION_THRESHOLD = 90;

const getRandomPosition = (objectSize: number): Position => {
  return {
    x: Math.random() * (CANVAS_WIDTH - objectSize),
    y: Math.random() * (CANVAS_HEIGHT - objectSize),
  };
};

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10); // Show centiseconds (hundredths)
  return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
};

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [targetScore, setTargetScore] = useState<number>(10);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasStartedTimer, setHasStartedTimer] = useState(false);
  const [positionA, setPositionA] = useState<Position>(getRandomPosition(MALLET_SIZE));
  const [positionM, setPositionM] = useState<Position>(getRandomPosition(MOLE_SIZE));
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const checkCollision = (pos1: Position, pos2: Position): boolean => {
    const centerMallet = {
      x: pos1.x + MALLET_SIZE / 2,
      y: pos1.y + MALLET_SIZE / 2,
    };
    const centerMole = {
      x: pos2.x + MOLE_SIZE / 2,
      y: pos2.y + MOLE_SIZE / 2,
    };

    const distance = Math.sqrt(
      Math.pow(centerMallet.x - centerMole.x, 2) + Math.pow(centerMallet.y - centerMole.y, 2)
    );

    return distance < COLLISION_THRESHOLD;
  };

  const resetPositions = () => {
    setPositionA(getRandomPosition(MALLET_SIZE));
    setPositionM(getRandomPosition(MOLE_SIZE));
  };

  const startGame = (target: number) => {
    setTargetScore(target);
    setScore(0);
    setElapsedTime(0);
    setHasStartedTimer(false);
    setGameState('playing');
    resetPositions();
  };

  const restartGame = () => {
    setGameState('setup');
    setScore(0);
    setElapsedTime(0);
    setHasStartedTimer(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
    
    // Start timer on first drag
    if (!hasStartedTimer && gameState === 'playing') {
      setHasStartedTimer(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    let newX = e.clientX - canvasRect.left - dragOffset.x;
    let newY = e.clientY - canvasRect.top - dragOffset.y;

    // Constrain to canvas bounds
    newX = Math.max(0, Math.min(newX, CANVAS_WIDTH - MALLET_SIZE));
    newY = Math.max(0, Math.min(newY, CANVAS_HEIGHT - MALLET_SIZE));

    setPositionA({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Check if A collides with M
      if (checkCollision(positionA, positionM)) {
        const newScore = score + 1;
        setScore(newScore);
        
        // Check if game is won
        if (newScore >= targetScore) {
          setGameState('finished');
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        } else {
          resetPositions();
        }
      }
    }
  };

  // Timer effect - updates every 10ms for smooth millisecond display
  useEffect(() => {
    if (hasStartedTimer && gameState === 'playing') {
      timerRef.current = window.setInterval(() => {
        setElapsedTime((prev) => prev + 10);
      }, 10);
      
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [hasStartedTimer, gameState]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, positionA, score, targetScore]);

  // Setup screen
  if (gameState === 'setup') {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Whack-a-Mole</h1>
        <div className={styles.setupCard}>
          <h2 className={styles.setupTitle}>Choose Your Target Score</h2>
          <p className={styles.setupDescription}>
            Select how many moles you want to whack. The timer starts when you drag the mallet!
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.targetButton} onClick={() => startGame(10)}>
              <span className={styles.targetNumber}>10</span>
              <span className={styles.targetLabel}>Quick Game</span>
            </button>
            <button className={styles.targetButton} onClick={() => startGame(25)}>
              <span className={styles.targetNumber}>25</span>
              <span className={styles.targetLabel}>Medium Game</span>
            </button>
            <button className={styles.targetButton} onClick={() => startGame(50)}>
              <span className={styles.targetNumber}>50</span>
              <span className={styles.targetLabel}>Long Game</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Finished screen
  if (gameState === 'finished') {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>🎉 Congratulations!</h1>
        <div className={styles.finishCard}>
          <h2 className={styles.finishTitle}>You whacked {targetScore} moles!</h2>
          <div className={styles.timeDisplay}>
            <span className={styles.timeLabel}>Your Time:</span>
            <span className={styles.timeValue}>{formatTime(elapsedTime)}</span>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Target Score</span>
              <span className={styles.statValue}>{targetScore}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Avg. Time per Mole</span>
              <span className={styles.statValue}>
                {(elapsedTime / 1000 / targetScore).toFixed(2)}s
              </span>
            </div>
          </div>
          <button className={styles.playAgainButton} onClick={restartGame}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // Playing screen
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Whack-a-Mole</h1>
      <div className={styles.gameStats}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Score</span>
          <span className={styles.statValue}>{score} / {targetScore}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Time</span>
          <span className={styles.statValue}>
            {hasStartedTimer ? formatTime(elapsedTime) : 'Click to start!'}
          </span>
        </div>
      </div>
      
      <div className={styles.canvas} ref={canvasRef}>
        <div
          className={`${styles.gameObject} ${styles.mallet} ${isDragging ? styles.dragging : ''}`}
          style={{
            left: `${positionA.x}px`,
            top: `${positionA.y}px`,
          }}
          onMouseDown={handleMouseDown}
        >
          <img src="/mallet.svg" alt="Mallet" draggable="false" />
        </div>
        
        <div
          className={`${styles.gameObject} ${styles.mole}`}
          style={{
            left: `${positionM.x}px`,
            top: `${positionM.y}px`,
          }}
        >
          <img src="/mole.svg" alt="Mole" draggable="false" />
        </div>
      </div>
      
      <p className={styles.instructions}>
        Drag the <strong>mallet</strong> to whack the <strong>mole</strong> and score points!
      </p>
    </div>
  );
};

export default Game;


