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

export default Motion;
