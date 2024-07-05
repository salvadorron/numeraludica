import React, { useState, useRef, useEffect, useContext } from 'react';
import Background from '../Board/Background';
import './TracerNumbers.css';
import useModal from '../../ctx';
import { useNavigate } from 'react-router-dom';
import { WorldContext } from '../World/WorldProvider';
import { Box, Image, Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  Button,
  AlertDialogOverlay,
  Divider,
  Text,
  Flex,
  Stack,
  useDisclosure 
} from '@chakra-ui/react';
import { PiGameControllerFill } from 'react-icons/pi';
import { FaHandsHelping } from 'react-icons/fa'; 
import useSound from 'use-sound';


// Sounds
import trazado from '../../assets/sounds/trazer/trazado.mp3'
import failure from '../../assets/sounds/failure.mp3'
import win_level from '../../assets/sounds/win_level.mp3'
import lose_level from '../../assets/sounds/lose_level.mp3'


type Line = {
  x: number,
  y: number
}

type LineArray = Line[];

type LineState = LineArray[] | [];


type Rect = {
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  textColor: string;
}

type RectState = Rect[] | [];

type PathState = number[];

const TracerNumbers = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rectangles, setRectangles] = useState<RectState>([]);
  const [lines, setLines] = useState<LineState>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [play, { stop }] = useSound(trazado, {
    loop: true,
  });
  const [playFailure] = useSound(failure);
  const [playLoseLevel] = useSound(lose_level);
  const [playWinLevel] = useSound(win_level);
  const [path, setPath] = useState<PathState>([]);
  const [isCorrectPath, setIsCorrectPath] = useState(true);
  const [isTracingComplete, setIsTracingComplete] = useState(false); // Nueva variable de estado
  const [lifes, setLifes] = useState<number>(3);
  const worlProvider = useContext(WorldContext)
  const modal = useModal()
  const router = useNavigate()  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLButtonElement>(null)
  const [ openedHelp, setOpenedHelp ] = useState(true); 
  useEffect(() => {
    generateRectangles();
  }, []);

  const generateRectangles = () => {
    const rects = [];
    const rectSize = 50;
    const padding = 20; // minimum distance between rectangles
    let attempts = 0;

    for (let i = 0; i < 10; i++) {
      let x, y, valid;
      do {
        valid = true;
        x = Math.random() * (750 - rectSize); // canvas width is 800, 750 to allow margin
        y = Math.random() * (550 - rectSize); // canvas height is 600, 550 to allow margin
        // Check if new rect collides with existing rects
        for (const rect of rects) {
          const dx = rect.x - x;
          const dy = rect.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < rectSize + padding) {
            valid = false;
            break;
          }
        }
        attempts++;
        if (attempts > 1000) break; // Avoid infinite loop in edge cases
      } while (!valid);

      if (valid) {
        rects.push({
          value: i + 1,
          x,
          y,
          width: rectSize,
          height: rectSize,
          color: 'lightgrey',
          textColor: 'black',
        });
      }
    }
    setRectangles(rects);
  };

  useEffect(() => {
    openHelp();
}, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isTracingComplete) return; // Evitar nuevo trazado si ya se completó
    const { offsetX, offsetY } = e.nativeEvent;
    setLines([[{ x: offsetX, y: offsetY }]]);
    setIsDrawing(true);
    play();
    checkCollision(offsetX, offsetY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

    if (!isDrawing || isTracingComplete) return; // Evitar trazado si ya se completó
    const { offsetX, offsetY } = e.nativeEvent;
    const newLines = [...lines];
    newLines[newLines.length - 1].push({ x: offsetX, y: offsetY });
    setLines(newLines);
    checkCollision(offsetX, offsetY);
  };

  const resetGame = () => {
    setLifes(3);
    setLines([]);
    setPath([]);
    setIsDrawing(false);
    setIsCorrectPath(true);
    setIsTracingComplete(false);
    setRectangles([]);
    generateRectangles();
  }

  const handleMouseUp = () => {
    if (isTracingComplete) return; // Evitar nuevo trazado si ya se completó
    setIsDrawing(false);
    stop();
    setIsTracingComplete(true); // Marcar el trazado como completado
    if(isCorrectPath && path.length === 10){
      playWinLevel();
        worlProvider.onFinish({
            summary: Math.floor((lifes / 3) * 10),
            showSummary: true
        })
    }
    if(!isCorrectPath || path.length !== 10){
        playFailure();
        const attempt = lifes - 1
        if(attempt === 0){
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
        setLifes(attempt);
        setLines([]);
        setPath([]);
        setIsDrawing(false);
        setIsCorrectPath(true);
        setIsTracingComplete(false);
        setRectangles([]);
        generateRectangles()
    } 

  };

  const checkCollision = (x: number, y: number) => {
    rectangles.forEach((rect, index) => {
      if (
        x > rect.x &&
        x < rect.x + rect.width &&
        y > rect.y &&
        y < rect.y + rect.height
      ) {
        if (!path.includes(rect.value)) {
          const newRectangles = [...rectangles];
          if (rect.value === path.length + 1) {
            newRectangles[index].color = 'green';
            newRectangles[index].textColor = 'white';
            setPath([...path, rect.value]);
          } else {
            newRectangles[index].color = 'red';
            setIsCorrectPath(false);
          }
          setRectangles(newRectangles);
        }
      }
    });
  };

  function openHelp () {
    setOpenedHelp(true);
    onOpen();    
}

  function closeHelp () {
    setOpenedHelp(false);
    onClose();    
}

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        rectangles.forEach((rect) => {
          ctx.beginPath();
          ctx.setLineDash([0]);
          ctx.lineWidth = 2;
          ctx.fillStyle = rect.color;
          ctx.strokeStyle = '#fff';
          ctx.roundRect(rect.x, rect.y, rect.width, rect.height, 10);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          ctx.fillStyle = rect.textColor;
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            rect.value.toString(),
            rect.x + rect.width / 2,
            rect.y + rect.height / 2
          );
        });

        lines.forEach((line) => {
          ctx.setLineDash([8, 3]);
          ctx.beginPath();
          ctx.moveTo(line[0].x, line[0].y);
          for (let i = 1; i < line.length; i++) {
            ctx.lineTo(line[i].x, line[i].y);
          }
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 4;
          ctx.stroke();
        });
      }
    }
  }, [rectangles, lines]);

  return (
    <Background>
      <Box paddingTop={8}>
      <Flex direction='row' justifyContent='center' gap={24}>
        <div className='tracer-numbers-container'>
          <div className='tracer-border'>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          </div>
        </div>
        <Flex direction='column' gap={2}>
          <Box className='status'>
            <p className='status_description'  style={{color: lifes > 1 ? '#3bb150' : '#a52228'}}>{lifes}</p>
            <Box>
              <p className='status_title'>Intentos</p>
              <p className='status_title'> restantes</p>
            </Box>
          </Box>
          <Box className='status'>
            <Stack direction="row" justifyContent="center">
              <Button leftIcon={<FaHandsHelping/>} onClick={openHelp} colorScheme='red' variant={'solid'}>Ayuda</Button>
            </Stack>
          </Box>
        </Flex>
      </Flex>
      {openedHelp &&  <>
        <AlertDialog
            isOpen={isOpen}
            size={'3xl'}
            leastDestructiveRef={ref}
            onClose={closeHelp}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    ACTIVIDAD 2: TRAZO DE NUMEROS
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Flex direction='column' gap={4}>
                        <Text>En esta segunda actividad deberás reconocer cada número y trazar con tu ratón desde el número 1 hasta el número 10.</Text>
                        <Text fontWeight='bold'>Pero recuerda, tienes a tu disposición tres intentos, tras llevar a cabo cada uno de ellos deberás empezar desde el principio.</Text>
                    </Flex>
                </AlertDialogBody>    
                <Divider sx={{ width: "auto" }} mx={8} marginTop={4} />
                <AlertDialogFooter>
                  <Button bgColor="#82c8a6" _hover={{ backgroundColor: '#212962', color: 'white' }} onClick={closeHelp} ml={3} rightIcon={<PiGameControllerFill/>}>
                      ¡EMPEZAR!
                  </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
      }     
      </Box>
    </Background>
  );
};

export default TracerNumbers;
