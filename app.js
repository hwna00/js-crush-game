const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.height = 500;
canvas.width = 500;

const player = {
    x: 225,
    y: 400,
    hp: 100,
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

const checkGameOver = () => {
    while (player.hp <= 0) {
        alert('game over');
        document.location.reload();
        clearInterval(interval);
    }
};

var timer = 0;
var monsters = [];

function moveMonster() {
    checkGameOver();
    requestAnimationFrame(moveMonster);
    timer++;

    ctx.clearRect(0, 0, canvas.height, canvas.width);

    if (timer % 240 === 0) {
        const monster = new MonsterSprite({
            position: {
                x: Math.random() * (490 - 10) + 10,
                y: 5,
            },
            size: {
                width: 40,
                height: 40,
            },
            imgSrc: './img/monster/idle/frame-1.png',
        });
        monsters.push(monster);
    }

    monsters.forEach((monster, i, o) => {
        if (checkCollision(player, monster)) {
            o.splice(i, 1);
            player.hp -= monster.atk;
            console.log(player.hp);
        }
        const width = player.x + 25 - monster.position.x;
        const height = player.y + 25 - monster.position.y;
        const diagonal = Math.sqrt(width ** 2 + height ** 2);

        monster.position.x += width / diagonal;
        monster.position.y += height / diagonal;
        monster.update();
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
        Math.abs(player.x - obstacle.position.x) <= 40 &&
        Math.abs(player.y - obstacle.position.y) <= 40
    ) {
        return true;
    }
};