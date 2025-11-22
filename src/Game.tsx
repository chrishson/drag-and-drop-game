import React, { useState, useEffect, useRef } from 'react';
import * as styles from './Game.css';

interface Position {
  x: number;
  y: number;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const LETTER_SIZE = 80;
const COLLISION_THRESHOLD = 40;

const getRandomPosition = (): Position => {
  return {
    x: Math.random() * (CANVAS_WIDTH - LETTER_SIZE),
    y: Math.random() * (CANVAS_HEIGHT - LETTER_SIZE),
  };
};

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [positionA, setPositionA] = useState<Position>(getRandomPosition());
  const [positionM, setPositionM] = useState<Position>(getRandomPosition());
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const checkCollision = (pos1: Position, pos2: Position): boolean => {
    const centerA = {
      x: pos1.x + LETTER_SIZE / 2,
      y: pos1.y + LETTER_SIZE / 2,
    };
    const centerM = {
      x: pos2.x + LETTER_SIZE / 2,
      y: pos2.y + LETTER_SIZE / 2,
    };

    const distance = Math.sqrt(
      Math.pow(centerA.x - centerM.x, 2) + Math.pow(centerA.y - centerM.y, 2)
    );

    return distance < COLLISION_THRESHOLD;
  };

  const resetPositions = () => {
    setPositionA(getRandomPosition());
    setPositionM(getRandomPosition());
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    let newX = e.clientX - canvasRect.left - dragOffset.x;
    let newY = e.clientY - canvasRect.top - dragOffset.y;

    // Constrain to canvas bounds
    newX = Math.max(0, Math.min(newX, CANVAS_WIDTH - LETTER_SIZE));
    newY = Math.max(0, Math.min(newY, CANVAS_HEIGHT - LETTER_SIZE));

    setPositionA({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Check if A collides with M
      if (checkCollision(positionA, positionM)) {
        setScore(score + 1);
        resetPositions();
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, positionA, score]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>A to M</h1>
      <div className={styles.scoreBoard}>Score: {score}</div>
      
      <div className={styles.canvas} ref={canvasRef}>
        <div
          className={`${styles.letter} ${styles.letterA} ${isDragging ? styles.dragging : ''}`}
          style={{
            left: `${positionA.x}px`,
            top: `${positionA.y}px`,
          }}
          onMouseDown={handleMouseDown}
        >
          A
        </div>
        
        <div
          className={`${styles.letter} ${styles.letterM}`}
          style={{
            left: `${positionM.x}px`,
            top: `${positionM.y}px`,
          }}
        >
          M
        </div>
      </div>
      
      <p className={styles.instructions}>
        Drag the green <strong>A</strong> to the blue <strong>M</strong> to score points!
      </p>
    </div>
  );
};

export default Game;


