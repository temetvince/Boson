import getFountainEngine from './fountain';
import getBoxEngine from './box';
import getGridEngine from "./grid";

const NUMBER_OF_PARTICLES = 1000;
const REDRAW_SPEED = 1;

const canvas = document.getElementById('particles');
const context = canvas.getContext("2d");

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setInterval(engine.run, REDRAW_SPEED);
};

window.addEventListener('resize', resizeCanvas, false);

document.body.appendChild(canvas);

//const engine = getFountainEngine(NUMBER_OF_PARTICLES, canvas, context);
const engine = getBoxEngine(NUMBER_OF_PARTICLES, canvas, context);
//const engine = getGridEngine(NUMBER_OF_PARTICLES, canvas, context);

resizeCanvas();
