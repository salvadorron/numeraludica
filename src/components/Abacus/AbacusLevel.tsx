import React, { useState, useEffect, useRef } from 'react';
import './Abacus.css';
import Background from '../Board/Background';
import { Flex } from '@chakra-ui/react';

const TOTAL_BEADS = 10;
const BEAD_SIZE = 30;
const SPACE_BETWEEN_BEADS = BEAD_SIZE + 2; // Define spacing between beads
const PADDING = 15; // Padding for the abacus container

interface BeadPosition {
  id: number;
  position: number;
  x: number;
}

const AbacusLevel: React.FC<{color: string}> = ({color}) => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [beadPositions, setBeadPositions] = useState<BeadPosition[]>([]);
  const [draggingBead, setDraggingBead] = useState<number | null>(null);
  const [mouseOffsetX, setMouseOffsetX] = useState<number>(0); // Track mouse offset for exact positioning
  const abacusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateRandomNumber();
    initializeBeads();
  }, []);

  useEffect(() => {
    // Check if any bead has reached the end and update count
    const endBead = beadPositions.find(bead => bead.position === 1);
    if (endBead) {
      setCurrentCount(currentCount + 1);
      const updatedBeadPositions = beadPositions.map(bead =>
        bead.id === endBead.id ? { ...bead, position: 0 } : bead
      );
      setBeadPositions(updatedBeadPositions);
    }
  }, [beadPositions]);

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * (20 - 4 + 1)) + 4;
    setTargetNumber(randomNum);
  };

  const initializeBeads = () => {
    const initialPositions = Array(TOTAL_BEADS).fill(0).map((_, idx) => ({
      id: idx,
      position: 0,
      x: idx * SPACE_BETWEEN_BEADS + PADDING, // Start beads separated with padding
    }));
    setBeadPositions(initialPositions);
  };

  const handleMouseDown = (index: number) => (event: React.MouseEvent) => {
    setDraggingBead(index);
    const offsetX = event.clientX - beadPositions[index].x; // Calculate offset from bead position
    setMouseOffsetX(offsetX);
    // Prevent default to avoid text selection
    event.preventDefault();
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (draggingBead !== null) {
      const abacusRect = abacusRef.current?.getBoundingClientRect();
      if (abacusRect) {
        const newBeadPositions = [...beadPositions];
        let newX = event.clientX - abacusRect.left - mouseOffsetX / 2; // Adjust for mouse offset

        // Ensure beads do not collide or jump over each other
        const draggingIndex = draggingBead;

        // Limit movement within the abacus bounds
        if (newX < PADDING) {
          newX = PADDING;
        }

        if (draggingIndex > 0) {
          const leftBead = newBeadPositions[draggingIndex - 1];
          const leftLimit = leftBead.x + SPACE_BETWEEN_BEADS;
          if (newX < leftLimit) {
            newX = leftLimit;
          }
        }

        if (draggingIndex < newBeadPositions.length - 1) {
          const rightBead = newBeadPositions[draggingIndex + 1];
          const rightLimit = rightBead.x - SPACE_BETWEEN_BEADS;
          if (newX > rightLimit) {
            newX = rightLimit;
          }
        }

        newBeadPositions[draggingIndex] = {
          ...newBeadPositions[draggingIndex],
          x: newX,
          position: newX > abacusRect.width - BEAD_SIZE - PADDING ? 1 : 0,
        };

        setBeadPositions(newBeadPositions);
      }
    }
  };

  const handleMouseUp = () => {
    setDraggingBead(null);
  };

  document.onmouseup = handleMouseUp

  return (
    <div className="abacus-container">
      <div className="target-number">Target: {targetNumber}</div>
      <div className="abacus" ref={abacusRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        {beadPositions.map((bead, index) => (
          <div
            key={index}
            className="bead"
            onMouseDown={handleMouseDown(index)}
            style={{ left: bead.x, backgroundColor: color }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="current-count">Current: {currentCount}</div>
    </div>
  );
};

const AbacusLevelReplica: React.FC = () => {
  return (
    <Background>
        <Flex direction='column'>
        <AbacusLevel color={"red"}/>
        <AbacusLevel color={"yellow"}/>
        <AbacusLevel color={"blue"} />
        <AbacusLevel color={"green"}/>
        </Flex>
    </Background>
  );
};

export default AbacusLevelReplica;
