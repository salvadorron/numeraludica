import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useContext } from 'react';
import './Abacus.css';
import Background from '../Board/Background';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import useModal from '../../ctx';
import { useNavigate } from 'react-router-dom';
import { WorldContext } from '../World/WorldProvider';

const TOTAL_BEADS = 10;
const BEAD_SIZE = 30;
const SPACE_BETWEEN_BEADS = BEAD_SIZE + 2; // Define spacing between beads
const PADDING = 15; // Padding for the abacus container

interface BeadPosition {
  id: number;
  position: number;
  x: number;
}

export interface AbacusRef {
  getCurrentCount: () => number;
  getTargetNumber: () => number;
}

export interface AbacusProps {
  color: string;
  again: number;
  ref: React.Ref<AbacusRef>;
}

const AbacusLevel = forwardRef<AbacusRef, AbacusProps>(({ color, again }, ref) => {
    const [targetNumber, setTargetNumber] = useState<number>(0);
    const [currentCount, setCurrentCount] = useState<number>(0);
    const [beadPositions, setBeadPositions] = useState<BeadPosition[]>([]);
    const [draggingBead, setDraggingBead] = useState<number | null>(null);
    const abacusRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<{ [key: number]: { track: boolean, x: number } }>({});
    const [lastBeadDragged, setLastBeadDragged] = useState<number>(-1); // Track the last bead dragged, for calculating trackBeadsAfterBegin]
  

  

  
    const initializePositions = () => {
      const abacusElement = abacusRef.current;
      const abacusWidth = abacusElement?.getBoundingClientRect().width || 0;
      let decrement = BEAD_SIZE + PADDING;
      const positionsObject: { [key: number]: { track: boolean, x: number } } = {};
      let position = 0;
      for (let i = TOTAL_BEADS - 1; i >= 0; i--) {
        position = abacusWidth - decrement;
        positionsObject[i] = { x: position, track: false };
        decrement += SPACE_BETWEEN_BEADS;
      }
      setPositions(positionsObject);
    };

    useEffect(() => {
      generateRandomNumber();
      initializeBeads();
      initializePositions();
    }, [again]);
  
    useEffect(() => {
      // Check if any bead has reached the end and update count
      if(lastBeadDragged === -1) return;
      if (beadPositions[lastBeadDragged].x === positions[beadPositions[lastBeadDragged].id].x && positions[beadPositions[lastBeadDragged].id].track === false) {
          setCurrentCount(currentCount + 1);
          setPositions({ ...positions, [beadPositions[lastBeadDragged].id]: { x: positions[beadPositions[lastBeadDragged].id].x, track: true } })
        }
        if(beadPositions[lastBeadDragged].x !== positions[beadPositions[lastBeadDragged].id].x && positions[beadPositions[lastBeadDragged].id].track === true){
          setCurrentCount(currentCount - 1);
          setPositions({ ...positions, [beadPositions[lastBeadDragged].id]: { x: positions[beadPositions[lastBeadDragged].id].x, track: false } })
        }
      
    }, [beadPositions, currentCount, lastBeadDragged, positions]);
  
    const generateRandomNumber = () => {
      const randomNum = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
      setTargetNumber(randomNum);
      setCurrentCount(0);
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
      setLastBeadDragged(index);
      // Prevent default to avoid text selection
      event.preventDefault();
    };
  
    const handleMouseMove = (event: React.MouseEvent) => {
      if (draggingBead !== null) {
        const abacusRect = abacusRef.current?.getBoundingClientRect();
        if (abacusRect) {
          const newBeadPositions = [...beadPositions];
          let newX = event.clientX - abacusRect.left; // Adjust for mouse offset
  
          // Ensure beads do not collide or jump over each other
          const draggingIndex = draggingBead;
  
          // Limit movement within the abacus bounds
          if (newX < PADDING) {
            newX = PADDING;
          }
          if(newX > abacusRect.width - BEAD_SIZE - PADDING) {
            newX = abacusRect.width - BEAD_SIZE - PADDING;
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
              newX = rightLimit
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

    useImperativeHandle(ref, () => ({
      getCurrentCount: () => currentCount,
      getTargetNumber: () => targetNumber
    }), [currentCount, targetNumber]);
  
    return (
      <div className="abacus-container">
        <div className="abacus" ref={abacusRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          {beadPositions.map((bead, index) => (
            <div
              key={index}
              className="bead"
              onMouseDown={handleMouseDown(index)}
              style={{ left: bead.x, backgroundColor: color }}
            >
            </div>
          ))}
        </div>
        <div className="current-count"><p>{currentCount}</p> / <p>{targetNumber}</p></div>
      </div>
    );
  
  
})

const AbacusLevelReplica: React.FC = () => {

  const worlProvider = useContext(WorldContext)

  const [attempts, setAttempts] = useState<{win: {current: number, limit: number}, lose: {current: number, limit: number}}>({
    win: {current: 1, limit: 0},
    lose: {current: 3, limit: 0}
  });
  const [againCount, setAgainCount] = useState<number>(0);


  const modal = useModal()
  const router = useNavigate()

  const abacusList: {color: string, ref: React.RefObject<AbacusRef>}[] = [{color: "#ce453f", ref: React.createRef()}, {color: "#9b486b", ref: React.createRef()}, {color: "#0086a3", ref: React.createRef()}, {color: "#2cc050", ref: React.createRef()}]

  const resetGame = () => {
    setAttempts({...attempts, lose: {...attempts.lose, current: 3}});
    setAgainCount(againCount + 1);
  }

  const handleCheck = () => {
    const validate = abacusList.every((abacus) => abacus.ref.current?.getCurrentCount() === abacus.ref.current?.getTargetNumber());
    if (validate) {
      const nextAttempts = attempts.win.current - 1;
      if(nextAttempts === attempts.win.limit) {
        worlProvider.onFinish({
          summary: Math.floor((attempts.lose.current / 3) * 10),
          showSummary: true
      })
      }
    }
    else {
      const nextAttempts = attempts.lose.current - 1;
      setAttempts({...attempts, lose: {...attempts.lose, current: nextAttempts}});
      if (nextAttempts === attempts.lose.limit) {
        modal({
          title: "Has perdido",
          description: "Has alcanzado el maximo de intentos posibles",
          button1: {
              text: "Reintentar",
              onClick() {
                  return resetGame()
              }
          },
          button2: {
              text: "Volver al menu principal",
              onClick() {
                  return router('/')
              },
          }
      })
  
      }
    }
  }

  return (
    <Background>
        <Flex direction='column'>
          <Stack direction="row" justifyContent="center">
            <Box width="50%" textAlign="center">
              <Text fontSize="4xl">Intentos restantes: {attempts.lose.current}</Text>
            </Box>
          </Stack>
          {abacusList.map(abacus => (
            <AbacusLevel key={abacus.color} color={abacus.color} ref={abacus.ref} again={againCount}/>
          ))}
        <Stack direction="row" justifyContent="center">
          <Button onClick={handleCheck} colorScheme='teal' variant={'outline'}>Validar</Button>
        </Stack>
        </Flex>
    </Background>
  );
};

export default AbacusLevelReplica;
