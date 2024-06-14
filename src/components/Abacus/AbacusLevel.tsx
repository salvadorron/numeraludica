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

    // // Here get the Div that you want to follow the mouse
    // const div_moving = document.getElementById('div_moving');

    // // Here add the ID of the parent element
    // const parent_div = 'parent_div';

    // object to make a HTML element to follow mouse cursor ( https://coursesweb.net/ )
    // const movingDiv = {
    //     mouseXY: {},  // will contain the X, Y mouse coords inside its parent

    //     // Get X and Y position of the elm (from: vishalsays.wordpress.com/ )
    //     getXYpos: function (elm) {
    //         let x = elm.offsetLeft;        // set x to elm’s offsetLeft
    //         let y = elm.offsetTop;         // set y to elm’s offsetTop

    //         elm = elm.offsetParent;    // set elm to its offsetParent

    //         //use while loop to check if elm is null
    //         // if not then add current elm’s offsetLeft to x, offsetTop to y and set elm to its offsetParent
    //         while (elm != null) {
    //             x = parseInt(x) + parseInt(elm.offsetLeft);
    //             y = parseInt(y) + parseInt(elm.offsetTop);
    //             elm = elm.offsetParent;
    //         }

    //         // returns an object with "xp" (Left), "=yp" (Top) position
    //         return { 'xp': x, 'yp': y };
    //     },

    //     // Returns object with X, Y coords inside its parent
    //     getCoords: function (e) {
    //         const xy_pos = this.getXYpos(e.target);
    //         const x = e.pageX;
    //         const y = e.pageY;

    //         x = x - xy_pos['xp'];
    //         y = y - xy_pos['yp'];

    //         return { 'xp': x, 'yp': y };
    //     }
    // };


    // // registers 'mousemove' event to parent_div
    // document.getElementById(parent_div).addEventListener('mousemove', function (e) {
    //     mouseXY = movingDiv.getCoords(e);
    //     div_moving.style.left = mouseXY.xp + 8 + 'px';
    //     div_moving.style.top = mouseXY.yp - 8 + 'px';
    // });

    const tokenGridItem = document.querySelectorAll<HTMLDivElement>('.token')
    let enterMouse = false;
    let activeElement = false;


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
        }

        token.onmousemove = function (e) {
            if (enterMouse && activeElement && e.buttons === 1) {
                token.style.left = (token.clientLeft) + 'px';
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