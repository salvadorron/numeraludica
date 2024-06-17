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


      const $canvas = document.querySelectorAll<HTMLCanvasElement>('.gridItem');
      let mousePressed = false;
      const listToken: AbacusToken[] = []
      
      $canvas.forEach(($canvasItem, index) => {
        const { height, width } = $canvasItem.getBoundingClientRect();
        $canvasItem.width = width
        $canvasItem.height = height
        const context2d = $canvasItem.getContext('2d')
        
        const token = new AbacusToken(0, 0, 40, $canvasItem.height, '#000')
        
        context2d?.fillRect(token.getX(), token.getY(), token.getWidth(), token.getHeight())

        listToken.push(token)  

        $canvasItem.onmousedown = function (e) {
            context2d!.fillStyle = '#0f0';
            context2d?.fillRect(0,0, listToken[index].getX(), 300)
            mousePressed = e.buttons === 1 && (e.offsetX < listToken[index].getX())
        }

        $canvasItem.onmousemove = function(e) {
            if(mousePressed){
                context2d && listToken[index].drawToken(context2d, e.offsetX - (listToken[index].getWidth() / 2))
            }
        }
      })

      document.onmouseup = function (e) {
        mousePressed = false;
      }



    return <Background>
        <div style={abacusStyles.abacusRoot}>
            <div style={abacusStyles.abacusMainFrame}>
                <div style={abacusStyles.abacusGrids}>
                    <canvas style={abacusStyles.abacusGridItem} className="gridItem"></canvas>
                    <canvas style={abacusStyles.abacusGridItem} className="gridItem"></canvas>
                    <canvas style={abacusStyles.abacusGridItem} className="gridItem"></canvas>
                    <canvas style={abacusStyles.abacusGridItem} className="gridItem"></canvas>
                    <canvas style={abacusStyles.abacusGridItem} className="gridItem"></canvas>
                </div>
            </div>
        </div>
    </Background>
}