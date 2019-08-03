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

export default Painter;
