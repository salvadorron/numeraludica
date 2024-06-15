import { CSSProperties } from "react";
import Background from "../Board/Background";

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
        display: 'grid',
        gap: '100px',
        width: '100%',
        height: '100%',
        borderRadius: '6px'
    },
    abacusGridItem: {
        display: 'flex',
        gap: 5,
        border: '1px solid green',
    },
    tokenGridItem: {
        position: 'relative',
        width: '40px',
        height: '100%',
        backgroundColor: 'red'
    }

}
export function AbacusLevel() {

    const tokenGridItem = document.querySelectorAll<HTMLDivElement>('.token')
    let enterMouse = false;
    let activeElement = false;
    let initX = 0;

    window.onmouseup = function (e) {
        activeElement = false;
        enterMouse = false;
    }

    tokenGridItem.forEach(token => {
        token.onmouseenter = function (e) {
            enterMouse = true;
        }

        token.onmousedown = function (e) {
            activeElement = true;
            initX = e.clientX;
        }

        token.onmousemove = function (e) {
            if (enterMouse && activeElement && e.buttons === 1) {          
                let currentX = e.clientX
                let x = currentX - initX
                initX = currentX
                token.style.left = x + (Number.parseInt(token.style.left.replace(/px/g, '')) || 0)  + 'px';
            }
        }
    })


    return <Background>
        <div style={abacusStyles.abacusRoot}>
            <div style={abacusStyles.abacusMainFrame}>
                <div style={abacusStyles.abacusGrids}>
                    <div style={abacusStyles.abacusGridItem} className="gridItem">
                        <div style={abacusStyles.tokenGridItem} className="token"></div>
                        <div style={abacusStyles.tokenGridItem} className="token"></div>
                        <div style={abacusStyles.tokenGridItem} className="token"></div>
                    </div>
                    <div style={abacusStyles.abacusGridItem} className="gridItem"></div>
                    <div style={abacusStyles.abacusGridItem} className="gridItem"></div>
                    <div style={abacusStyles.abacusGridItem} className="gridItem"></div>
                    <div style={abacusStyles.abacusGridItem} className="gridItem"></div>
                </div>
                <div style={{ paddingTop: 10 }}>ESTADO: {0}</div>
            </div>
        </div>
    </Background>
}