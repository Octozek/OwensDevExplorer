class Room {
    constructor(layout, tileSize, itemConfig) {
        this.layout = layout;
        this.tileSize = tileSize;
        this.itemConfig = itemConfig;
    }

    draw(ctx, roomImage) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(roomImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let y = 0; y < this.layout.length; y++) {
            for (let x = 0; x < this.layout[y].length; x++) {
                const itemCode = this.layout[y][x];
                if (this.itemConfig[itemCode.toUpperCase()]) {
                    const { image, width, height } = this.itemConfig[itemCode.toUpperCase()];
                    ctx.drawImage(image, x * this.tileSize, y * this.tileSize - (height - 1) * this.tileSize, this.tileSize * width, this.tileSize * height);
                }
            }
        }
    }

    checkCollision(newX, newY, width, height) {
        const startX = Math.floor(newX / this.tileSize);
        const startY = Math.floor(newY / this.tileSize);
        const endX = Math.floor((newX + width - 1) / this.tileSize);
        const endY = Math.floor((newY + height - 1) / this.tileSize);

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (x < 0 || x >= this.layout[0].length || y < 0 || y >= this.layout.length) {
                    return true; // Out of bounds, treat as collision
                }
                const tile = this.layout[y][x];
                if (tile !== 'f' && tile === tile.toUpperCase()) {
                    return true; // Collision detected with uppercase tile
                }
            }
        }

        return false; // No collision
    }
}

const itemConfig = {
    'T': { image: new Image(), width: 1, height: 2, interact: () => { console.log("Interacting with TV!"); } },
    'C': { image: new Image(), width: 1, height: 2, interact: () => { console.log("Interacting with Computer!"); } },
    'A': { image: new Image(), width: 2, height: 1, interact: () => { console.log("Interacting with Table!"); } }
};
itemConfig['T'].image.src = 'assets/tv.png'; // Load TV sprite
itemConfig['C'].image.src = 'assets/computer.png'; // Load Computer sprite
itemConfig['A'].image.src = 'assets/table.png'; // Load Table sprite

const roomLayout = [
    ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
    ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'T', 'f', 'f', 'C', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'A', 'A', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f']
];
