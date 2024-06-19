class Interaction {
    constructor(room, player) {
        this.room = room;
        this.player = player;
    }

    handleInteraction() {
        const charX = Math.floor(this.player.x / this.room.tileSize);
        const charY = Math.floor(this.player.y / this.room.tileSize);

        // Check the tile the player is facing
        let facingX = charX;
        let facingY = charY;

        switch (this.player.direction) {
            case 'up':
                facingY -= 1;
                break;
            case 'down':
                facingY += 1;
                break;
            case 'left':
                facingX -= 1;
                break;
            case 'right':
                facingX += 1;
                break;
        }

        if (facingX >= 0 && facingX < this.room.layout[0].length && facingY >= 0 && facingY < this.room.layout.length) {
            const tile = this.room.layout[facingY][facingX];
            if (tile.toUpperCase() === 'C') {
                this.room.showPortfolio = true;
            }
        }
    }

    drawPortfolio(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#FFF';
        ctx.font = '16px Arial';
        ctx.fillText('Ezekiel Owens Portfolio', 10, 20);
        ctx.fillText('Projects:', 10, 40);
        ctx.fillText('1. Project One', 10, 60);
        ctx.fillText('2. Project Two', 10, 80);
        ctx.fillText('3. Project Three', 10, 100);
        ctx.fillText('Press E to exit', 10, 120);
    }
}

let interaction; // Define the interaction variable to be used in main.js
