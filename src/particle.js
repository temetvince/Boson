const Particle = class {
    constructor(size, life, motion) {
        this.size = size;
        this.maxLife = life;
        this.life = life;
        this.motion = motion;
    }

    update = () => {
        this.motion.update();
        this.life--;
    };
};

export default Particle;
