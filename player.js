class Player {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = 'down';
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

    move(keys, tileSize, roomLayout, checkCollision) {
        let newX = this.x;
        let newY = this.y;

        if (keys['ArrowUp']) {
            newY = Math.max(0, this.y - this.speed);
            this.direction = 'up';
        }
        if (keys['ArrowDown']) {
            newY = Math.min(9 * tileSize - this.height, this.y + this.speed);
            this.direction = 'down';
        }
        if (keys['ArrowLeft']) {
            newX = Math.max(0, this.x - this.speed);
            this.direction = 'left';
        }
        if (keys['ArrowRight']) {
            newX = Math.min(10 * tileSize - this.width, this.x + this.speed);
            this.direction = 'right';
        }

        if (!checkCollision(newX, newY, this.width, this.height, tileSize, roomLayout)) {
            this.x = newX;
            this.y = newY;
        }
    }
}
