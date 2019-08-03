const Engine = class engine {
    // populator is a Populator
    // rules is an array of rules
    // painters is an array of painters
    constructor(populator, rules, painters) {
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

export default Engine;
