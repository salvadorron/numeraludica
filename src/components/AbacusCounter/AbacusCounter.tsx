import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useContext } from 'react';
import './AbacusCounter.css';
import Background from '../Board/Background';
import { Box, Button, Flex, Stack, Text, Spacer, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Divider,
  useDisclosure 
} from '@chakra-ui/react';
import useModal from '../../ctx';
import { useNavigate } from 'react-router-dom';
import { WorldContext } from '../World/WorldProvider';
import { PiGameControllerFill } from 'react-icons/pi';
import { FaHandsHelping } from 'react-icons/fa';
import useSound from 'use-sound';


// Sounds
import get from '../../assets/sounds/abacus/get.mp3'
import movement from '../../assets/sounds/abacus/movement.mp3'
import failure from '../../assets/sounds/failure.mp3'
import win_level from '../../assets/sounds/win_level.mp3'
import lose_level from '../../assets/sounds/lose_level.mp3'



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

const Abacus = forwardRef<AbacusRef, AbacusProps>(({ color, again }, ref) => {
    const [playGetAbacus] = useSound(get);
    const [play, { stop }] = useSound(movement, {
      loop: true,
    });
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
      playGetAbacus();
      setDraggingBead(index);
      setLastBeadDragged(index);
      play();
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
      stop();
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
          <div className='custom-divider'></div>
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

const AbacusCounter: React.FC = () => {

  const worlProvider = useContext(WorldContext)

  const [attempts, setAttempts] = useState<{win: {current: number, limit: number}, lose: {current: number, limit: number}}>({
    win: {current: 1, limit: 0},
    lose: {current: 3, limit: 0}
  });
  const [againCount, setAgainCount] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const modalRef = useRef<HTMLButtonElement>(null)

  const [ openedHelp, setOpenedHelp ] = useState(true); 

  const modal = useModal()
  const router = useNavigate()

  const [playFailure] = useSound(failure);
  const [playLoseLevel] = useSound(lose_level);
  const [playWinLevel] = useSound(win_level);

  useEffect(() => {
    openHelp();
  }, [])
  
  function openHelp () {
    setOpenedHelp(true);
    onOpen();    
  }

function closeHelp () {
    setOpenedHelp(false);
    onClose();    
}

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
        playWinLevel();
        worlProvider.onFinish({
          summary: Math.floor((attempts.lose.current / 3) * 10),
          showSummary: true
      })
      }
    }
    else {
      const nextAttempts = attempts.lose.current - 1;
      playFailure();
      setAttempts({...attempts, lose: {...attempts.lose, current: nextAttempts}});
      if (nextAttempts === attempts.lose.limit) {
        playLoseLevel();
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
          <Stack direction='row' className='container'>
            <Box width='80%' className='abacus-div'>
              {abacusList.map(abacus => (
                <Abacus key={abacus.color} color={abacus.color} ref={abacus.ref} again={againCount}/>
              ))}
            </Box>
            <Spacer />
            <Flex direction='column' gap={2}>
              <Box className='status'>
                <p className='status_description'  style={{color: attempts.lose.current > 1 ? '#3bb150' : '#a52228'}}>{attempts.lose.current}</p>
                <Box>
                  <p className='status_title'>Intentos</p>
                  <p className='status_title'> restantes</p>
                </Box>
              </Box>
              <Box className='status'>
                <Flex direction="column" justifyContent="center">
                  <Button onClick={handleCheck} colorScheme='teal' variant={'outline'}>Validar respuestas</Button>
                </Flex>
              </Box>
              <Box className='status'>
                <Stack direction="row" justifyContent="center">
                  <Button leftIcon={<FaHandsHelping/>} onClick={openHelp} colorScheme='red' variant={'solid'}>Ayuda</Button>
                </Stack>
              </Box>
            </Flex>
          </Stack>
        {openedHelp &&  <>
          <AlertDialog
              isOpen={isOpen}
              size={'3xl'}
              leastDestructiveRef={modalRef}
              onClose={closeHelp}
          >
              <AlertDialogOverlay>
                  <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      ACTIVIDAD 1: ÁBACO INTERACTIVO
                  </AlertDialogHeader>
                  <AlertDialogBody>
                      <Flex direction='column' gap={4}>
                          <Text>En esta primera actividad mediante el ábaco que tienes a tu disposición, arrastraras las esferas hacia el lado derecho según el número correspondiente a cada fila, una vez ya tengas tu respuesta presionas el botón "VALIDAR RESPUESTAS" y así podrás saber si todo es válido.</Text>
                          <Text fontWeight='bold'>Pero recuerda, tienes a tu disposición tres intentos, tras llevar a cabo cada uno de ellos deberías empezar desde el principio.</Text>
                      </Flex>
                  </AlertDialogBody>    
                  <Divider sx={{ width: "auto" }} mx={8} marginTop={4} />
                  <AlertDialogFooter>
                    <Button bgColor="#82c8a6" _hover={{ backgroundColor: '#212962', color: 'white' }} onClick={closeHelp} ml={3} rightIcon={<PiGameControllerFill/>}>
                        ¡CONTINUAR!
                    </Button>
                  </AlertDialogFooter>
              </AlertDialogContent>
              </AlertDialogOverlay>
          </AlertDialog>
        </>
        }   
        </Flex>
    </Background>
  );
};

export default AbacusCounter;
