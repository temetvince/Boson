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

export default Vector;
