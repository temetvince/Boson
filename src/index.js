import Vector from './vector';
import Motion from './motion';
import Particle from './particle';
import Populator from './populator';
import Rule from './rule';
import Painter from './painter';
import Engine from './engine';


const numberOfParticles = 1500;
const generator = () => {
    const position = new Vector(canvas.width / 2, canvas.height / 2);
    const velocity = new Vector(Math.random() * 1 - .5, Math.random() * -1 - .5);
    const acceleration = new Vector(0, .01);
    const motion = new Motion(position, velocity, acceleration);
    const size = 1;
    const life = Math.random() * 500 + 500;

    return new Particle(size, life, motion);
}
const populator = new Populator(numberOfParticles, generator);

const law = particle => {
    return particle.motion.position.y > canvas.height * 0.75;
};
const effect = particle => {
    particle.motion.velocity.y *= -.7;
    particle.motion.velocity.x *= 1;
    particle.motion.position.y = canvas.height * 0.75;
};
const rule = new Rule(law, effect);

const rules = [rule];

const paintBackground = () => {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
const paintParticle = particle => {
    context.beginPath();
    context.fillStyle = "white";
    context.arc(particle.motion.position.x, particle.motion.position.y, particle.size, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}
const painter = new Painter(paintBackground, paintParticle);

const painters = [painter];

const engine = new Engine(populator, rules, painters);

const redrawSpeed = 1;

const canvas = document.getElementById('particles');
const context = canvas.getContext("2d");

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setInterval(engine.run, redrawSpeed);
};

resizeCanvas();

window.addEventListener('resize', resizeCanvas, false);

document.body.appendChild(canvas);
