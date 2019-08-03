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

export default Populator;
