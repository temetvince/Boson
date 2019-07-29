const Vector = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    shift = vector => {
        this.x += vector.x;
        this.y += vector.y;
    };
};

const Motion = class {
    constructor(position, velocity, acceleration) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }

    update = () => {
        this.velocity.shift(this.acceleration);
        this.position.shift(this.velocity);
    };
}

const Particle = class {
    constructor(size, life, motion) {
        this.size = size;
        this.life = life;
        this.motion = motion;
    }

    update = () => {
        this.motion.update();
        this.life--;
    };
};

const Populator = class {
    // numberOfParticles is an integer telling how many particles should exist at once
    // generator is a function which returns a new particle
    constructor(numberOfParticles, generator) {
        this.numberOfParticles = numberOfParticles;
        this.generator = generator;
    }

    // particles is an array of Particle
    // if particles length is less than number of particles, new particles are added.
    populate = particles => {
        const shortage = this.numberOfParticles - particles.length;

        for (let i = 0; i < shortage; ++i) {
            particles.push(this.generator());
        }
    };
}

const Rule = class {
    // law is a function which takes a particle and returns whether a constraint is met.
    // effect is a function which takes a particle and changes its position/velocity/acceleration.
    // effect SHALL NOT call particle.update().
    constructor(law, effect) {
        this.law = law;
        this.effect = effect;
    }

    applyTo = particle => {
        if (law(particle)) {
            effect(particle);
        }
    }
}

const Painter = class {
    // paintBackground is a zero arg function that renders the background image.
    // paintParticle is a function which takes a particle and renders it.
    // paintParticle SHALL NOT call particle.update().
    constructor(paintBackground, paintParticle) {
        this.paintBackground = paintBackground;
        this.paintParticle = paintParticle;
    }

    paint = particles => {
        this.paintBackground();
        this.paintParticles(particles);
    };

    paintBackground = () => {
        this.paintBackground();
    };

    paintParticles = particles => {
        particles.forEach(particle => {
            this.paintParticle(particle);
        });
    }
};

const Engine = class engine {
    // populator is a Populator
    // rules is an array of rules
    // painters is an array of painters
    constructor(populater, rules, painters) {
        this.populator = populator;
        this.rules = rules;
        this.painters = painters;
        this.particles = [];
    }

    run = () => {
        this.populate();
        this.update();
        this.paint();
    };

    update = () => {
        for (let i = 0; i < this.particles.length; ++i) {
            const particle = this.particles[i];

            this.rules.forEach(rule => {
                rule.applyTo(particle);
            });

            particle.update();

            if (particle.life < 0) {
                this.particles.splice(i, 1);
            }
        }
    };

    paint = () => {
        this.painters[0].paintBackground();

        this.painters.forEach(painter => {
            painter.paintParticles(this.particles);
        });
    };

    populate = () => {
        this.populator.populate(this.particles);
    }
};
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
