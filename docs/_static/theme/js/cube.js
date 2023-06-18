// Keep the thicker border on
// the outside on each iteration
const bold = 4;
const borderWidthMap = {
    0: {
        top: [1, 1, 1, 1],
        right: [bold, 1, 1, 1],
        bottom: [bold, bold, 1, 1],
        left: [1, bold, 1, 1],
    },
    1: {
        top: [1, 1, 1, 1],
        right: [1, 1, 1, 1],
        bottom: [1, 1, 1, 1],
        left: [1, 1, 1, 1],
    },
    2: {
        top: [bold, bold, 1, 1],
        right: [bold, 1, 1, bold],
        bottom: [1, 1, bold, bold],
        left: [1, bold, bold, 1],
    },
    3: {
        top: [1, 1, 1, 1],
        right: [1, 1, 1, bold],
        bottom: [bold, 1, 1, bold],
        left: [bold, 1, 1, 1],
    },
    4: {
        top: [1, 1, 1, 1],
        right: [1, bold, 1, 1],
        bottom: [1, bold, bold, 1],
        left: [1, 1, bold, 1],
    },
    5: {
        top: [1, 1, 1, 1],
        right: [1, 1, bold, 1],
        bottom: [1, 1, bold, bold],
        left: [1, 1, 1, bold],
    }
};

const facesRotation = [
    'rotateX(0deg)',
    'rotateX(-90deg)',
    'rotateX(90deg)',
    'rotateY(-90deg)',
    'rotateY(90deg)',
    'rotateY(180deg)'
];

let rotation = 0;
let iteration = 0;

const size = 70;

function rotate() {
    const outer = document.getElementsByClassName('wp_cube__outer')[0];
    outer.style = `width: ${size}px; height: ${size}px; transform: translateX(-50%) scale3d(1, 1, 1) rotateX(0deg) rotateY(${-rotation}deg) rotateZ(0deg);`;

    const inner = document.getElementsByClassName('wp_cube__inner')[0];
    inner.style = `width: ${size}px; height: ${size}px; transform: translateX(-14%) scale3d(0.5, 0.5, 0.5) rotateX(0deg) rotateY(${rotation}deg) rotateZ(0deg);`


    const outerFaces = document.querySelectorAll('.wp_cube__outer .wp_cube__face');
    facesRotation.forEach((faceRotation, i) => {
        const borderStyles = `border-left-width:${borderWidthMap[i].left[iteration]}px;border-right-width:${borderWidthMap[i].right[iteration]}px;border-top-width:${borderWidthMap[i].top[iteration]}px;border-bottom-width:${borderWidthMap[i].bottom[iteration]}px;`;
        outerFaces[i].style = `transform: ${faceRotation} translateZ(${size/2}px);` + borderStyles;
    });

    const innerFaces = document.querySelectorAll('.wp_cube__inner .wp_cube__face');
    facesRotation.forEach((faceRotation, i) => {
        innerFaces[i].style = `transform: ${faceRotation} translateZ(${size/2}px)`;
    });

    rotation += 90;
    iteration = (iteration + 1) % 4;
}
document.addEventListener("DOMContentLoaded", function() {
    rotate();
    setInterval(rotate, 3000);
});