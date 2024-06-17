import { CSSProperties, useState } from "react";
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

    const [currentTokenIndex, setCurrentTokenIndex] = useState<number>(-1)
    const listToken: AbacusToken[] = []
    let mouseDown = false;

    // const listRandonNumbers = Array.from(Array(5), (_v, index) => Math.floor(Math.random() * 10) + 1)


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

    function handleMouseMove(evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if (!mouseDown) return
        if (currentTokenIndex === -1) return
        const cursorCoordinate = listToken[currentTokenIndex].translateX(evt.nativeEvent.offsetX - (listToken[currentTokenIndex].getWidth() / 2))
        listToken[currentTokenIndex].drawToken(cursorCoordinate)
    }

    function handleMouseDown(evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        const tokenIndex = listToken.findIndex((value) => evt.nativeEvent.offsetX <= value.getX() + value.getWidth() && evt.nativeEvent.offsetX >= value.getX())
        setCurrentTokenIndex(tokenIndex)
        if (tokenIndex === -1) return
        mouseDown = evt.nativeEvent.offsetX <= listToken[tokenIndex].getX() + listToken[tokenIndex].getWidth() && evt.nativeEvent.offsetX >= listToken[tokenIndex].getX() && evt.buttons === 1
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