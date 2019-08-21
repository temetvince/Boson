import Vector from './vector';
import Motion from './motion';
import Particle from './particle';
import Populator from './populator';
import Rule from './rule';
import Painter from './painter';
import Engine from './engine';

const getRules = canvas => {
    const lawFloor = particle => {
        return particle.motion.position.y > canvas.height * 1;
    };

    const effectFloor = particle => {
        particle.motion.velocity.y *= -.7;
        particle.motion.position.y = canvas.height * 1;
    };

    const lawCeiling = particle => {
        return particle.motion.position.y < canvas.height * 0;
    };

    const effectCeiling = particle => {
        particle.motion.velocity.y *= -.7;
        particle.motion.position.y = canvas.height * 0;
    };

    const lawLeft = particle => {
        return particle.motion.position.x < canvas.width * 0;
    };

    const effectLeft = particle => {
        particle.motion.velocity.x *= -1;
        particle.motion.position.x = canvas.width * 0;
    };

    const lawRight = particle => {
        return particle.motion.position.x > canvas.width * 1;
    }

    const effectRight = particle => {
        particle.motion.velocity.x *= -1;
        particle.motion.position.x = canvas.width * 1;
    };

    return [new Rule(lawFloor, effectFloor), new Rule(lawCeiling, effectCeiling), new Rule(lawLeft, effectLeft), new Rule(lawRight, effectRight)];
};

const getPopulator = (numberOfParticles, canvas) => {
    const generator = () => {
        const position = new Vector(canvas.width / 2, canvas.height / 2);
        const velocity = new Vector(Math.random() * 3 - 1.5, Math.random() * -2 - 1);
        const acceleration = new Vector(0, .01);
        const motion = new Motion(position, velocity, acceleration);
        const size = 1;
        const life = Math.random() * 1500 + 1500;

        return new Particle(size, life, motion);
    }

    return new Populator(numberOfParticles, generator);
}

const getPainters = (canvas, context) => {
    const paintBackground = () => {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const paintParticle = particle => {
        context.beginPath();
        context.fillStyle = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
        context.globalAlpha = particle.life / particle.maxLife;
        context.arc(particle.motion.position.x, particle.motion.position.y, particle.size, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    return [new Painter(paintBackground, paintParticle)];
}

const getBoxEngine = (numberOfParticles, canvas, context) => {
    return new Engine(getPopulator(numberOfParticles, canvas), getRules(canvas), getPainters(canvas, context));
};

export default getBoxEngine;
