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

export default Particle;
