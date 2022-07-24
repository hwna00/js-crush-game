class Sprite {
    constructor({ position, size, imgSrc }) {
        this.position = position;
        this.size = size;
        this.img = new Image();
        this.img.src = imgSrc;
    }

    draw() {
		ctx.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
	}

    update() {
        this.draw();
    }
}

class MonsterSprite extends Sprite {
    constructor({ position, size, imgSrc }) {
        super({ position, size, imgSrc });
        this.atk = 50;
    }
}

class HeroSprite extends Sprite {
    constructor() {
        this.hp = 100;
    }

    draw() {}

    update() {}
}