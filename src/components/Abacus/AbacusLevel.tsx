import { CSSProperties } from "react";
import Background from "../Board/Background";
import AbacusToken from "./abacus_token.model";

const abacusStyles: { [key: string]: CSSProperties } = {
    abacusRoot: {
        display: 'grid',
        placeContent: 'center',
        border: '1px solid black',
        height: '100vh',
    },
    abacusMainFrame: {
        border: '2px solid black',
        borderTop: 'none',
        padding: '2px',
        width: '800px',
        height: '600px',
    },
    abacusGrids: {
        position: 'relative',
        display: 'grid',
        gridTemplateRows: 'repeat(5, 40px)',
        gap: '100px',
        width: '100%',
        height: '100%',
        borderRadius: '6px'
    },
    abacusGridItem: {
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: 5,
        border: '1px solid green',
    }

}
export function AbacusLevel() {

    const listToken: AbacusToken[] = []
    let mouseDown = false;


    function getCurrentToken(evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        const tokenValue = listToken.find((value) => {
            if (evt.clientY >= value.getContext2d().canvas.getBoundingClientRect().y && evt.clientY <= value.getContext2d().canvas.getBoundingClientRect().y + value.getContext2d().canvas.height) {
                if (evt.nativeEvent.offsetX >= value.getX() && evt.nativeEvent.offsetX <= value.getX() + value.getWidth()) {
                    return value
                }
            }
        });

        return tokenValue
    }

    function draw(context: CanvasRenderingContext2D, x: number, y: number, w: number, color: string) {
        if (x < 0) {
            x = 0;
        }
        if (x > context.canvas.width - w) {
            x = context.canvas.width - w
        }

        requestAnimationFrame(() => draw)
        //context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.beginPath()
        context.rect(x, y, w, context.canvas.height)
        context.fillStyle = color;
        context.fill()
        requestAnimationFrame(() => draw)
    }


    const handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return
        const { height, width } = canvas.getBoundingClientRect()
        canvas.width = width;
        canvas.height = height;
        const context2d = canvas.getContext('2d');
        if (!context2d) return
        let x = 0;
        for (let i = 1; i <= 10; i++) {
            const token = new AbacusToken(context2d, x, 0, 20, canvas.height, '#000')
            context2d.beginPath()
            context2d.rect(token.getX(), token.getY(), token.getWidth(), token.getHeight())
            context2d.fillStyle = token.getColor()
            context2d.fill()
            listToken.push(token)
            x += 30;
        }

    }

    async function handleMouseMove(evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if (!mouseDown) return
        const currentToken = getCurrentToken(evt)
        if (!currentToken) return

        let context = currentToken.getContext2d()
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        listToken.forEach(token => {
            context = token.getContext2d()
            if (token.getId() === currentToken.getId()) {
                const cursorCoordinate = currentToken.translateX(evt.nativeEvent.offsetX + evt.movementX - (currentToken.getWidth() / 2))
                draw(context, cursorCoordinate, currentToken.getY(), currentToken.getWidth(), currentToken.getColor())
            }
            else {
                draw(context, token.getX(), token.getY(), token.getWidth(), token.getColor())
            }
        })


    }

    function handleMouseDown(evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

        const currentToken = getCurrentToken(evt)

        if (!currentToken) return

        mouseDown = evt.buttons === 1
    }

    document.onmouseup = function () {
        mouseDown = false;
    }


    return <Background>
        <div style={abacusStyles.abacusRoot}>
            <div style={abacusStyles.abacusMainFrame}>
                <div style={abacusStyles.abacusGrids}>
                    <canvas ref={handleCanvasRef} style={abacusStyles.abacusGridItem} onMouseUp={() => mouseDown = false} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} className="gridItem"></canvas>
                    <canvas ref={handleCanvasRef} style={abacusStyles.abacusGridItem} onMouseUp={() => mouseDown = false} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} className="gridItem"></canvas>
                    <canvas ref={handleCanvasRef} style={abacusStyles.abacusGridItem} onMouseUp={() => mouseDown = false} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} className="gridItem"></canvas>
                    <canvas ref={handleCanvasRef} style={abacusStyles.abacusGridItem} onMouseUp={() => mouseDown = false} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} className="gridItem"></canvas>
                    <canvas ref={handleCanvasRef} style={abacusStyles.abacusGridItem} onMouseUp={() => mouseDown = false} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} className="gridItem"></canvas>
                </div>
            </div>
        </div>
    </Background>
}