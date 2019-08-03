const Rule = class {
    // law is a function which takes a particle and returns whether a constraint is met.
    // effect is a function which takes a particle and changes its position/velocity/acceleration.
    // effect SHALL NOT call particle.update().
    constructor(law, effect) {
        this.law = law;
        this.effect = effect;
    }

    applyTo = particle => {
        if (this.law(particle)) {
            this.effect(particle);
        }
    }
}

export default Rule;
