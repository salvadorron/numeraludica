import React, { useState, useRef, useEffect, useContext } from 'react';
import Background from '../Board/Background';
import './TracerNumbers.css';
import useModal from '../../ctx';
import { useNavigate } from 'react-router-dom';
import { WorldContext } from '../World/WorldProvider';

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
  const [path, setPath] = useState<PathState>([]);
  const [isCorrectPath, setIsCorrectPath] = useState(true);
  const [isTracingComplete, setIsTracingComplete] = useState(false); // Nueva variable de estado
  const [lifes, setLifes] = useState<number>(3);
  const worlProvider = useContext(WorldContext)
  const modal = useModal()
  const router = useNavigate()  
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

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isTracingComplete) return; // Evitar nuevo trazado si ya se completó
    const { offsetX, offsetY } = e.nativeEvent;
    setLines([[{ x: offsetX, y: offsetY }]]);
    setIsDrawing(true);
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
    setIsTracingComplete(true); // Marcar el trazado como completado
    if(isCorrectPath && path.length === 10){
        worlProvider.onFinish({
            summary: Math.floor((lifes / 3) * 10),
            showSummary: true
        })
    }
    if(!isCorrectPath || path.length !== 10){
        const attempt = lifes - 1
        if(attempt === 0){
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
      <div className='tracer-numbers-container' style={{ zIndex: 1 }}>
        <div className="tracer-status">Intentos Restantes: {lifes}</div>
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
    </Background>
  );
};

export default TracerNumbers;
