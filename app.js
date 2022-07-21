const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.height = 500;
canvas.width = 500;

const player = {
    x: 225,
    y: 400,
    centerX: this.x + 25,
    centerY: this.y + 25,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.width);
    },
};

window.addEventListener('keydown', keysPressed, false);
window.addEventListener('keyup', keysReleased, false);

const keys = [];

function keysPressed(e) {
    keys[e.keyCode] = true;
}

function keysReleased(e) {
    keys[e.keyCode] = false;
    direction = '';
}

class Obstacle {
    constructor() {
        this.x = Math.random() * (490 - 10) + 10;
        this.y = 5;
        this.radius = 20;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

var timer = 0;
var monsters = [];

function moveMonster() {
    requestAnimationFrame(moveMonster);
    timer++;

    ctx.clearRect(0, 0, canvas.height, canvas.width);

    if (timer % 240 === 0) {
        const monster = new Obstacle();
        monsters.push(monster);
    }

    monsters.forEach((monster) => {
		checkCollision(player, monster);
        monster.y++;
        monster.draw();
    });

    if (keys[87] && player.y > 0) player.y -= 5;
    if (keys[83] && player.y < canvas.height - player.height) player.y += 5;
    if (keys[65] && player.x > 0) player.x -= 5;
    if (keys[68] && player.x < canvas.width - player.width) player.x += 5;

    player.draw();
}

moveMonster();

const checkCollision = (player, obstacle) => {
    if (
        (player.x - obstacle.x) ** 2 + (player.y - obstacle.y) ** 2 <=
        (player.width / 2 + obstacle.radius) ** 2
    ) {
        console.log('collision');
    }
};