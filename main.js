const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const offScreenCanvas = document.createElement('canvas');
offScreenCanvas.width = 10 * 16; // 10 panels * 16 pixels per panel
offScreenCanvas.height = 9 * 16; // 9 panels * 16 pixels per panel
const offScreenCtx = offScreenCanvas.getContext('2d');

const scale = 4; // Scale factor
const tileSize = 16; // Original tile size (16x16 pixels)

// Load images
const characterImage = new Image();
const roomImage = new Image();

characterImage.src = 'assets/character.png';
roomImage.src = 'assets/room.png';

let imagesLoaded = 0;

characterImage.onload = checkImagesLoaded;
characterImage.onerror = () => console.error('Failed to load character image');

roomImage.onload = checkImagesLoaded;
roomImage.onerror = () => console.error('Failed to load room image');

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        init();
        gameLoop();
    }
}

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

let player, currentRoom;

function init() {
    player = new Player(5 * tileSize, 4 * tileSize, tileSize, tileSize * 2, 2); // Character is 1 panel wide, 2 panels tall
    currentRoom = new Room(roomLayout, tileSize, itemConfig);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    player.move(keys, tileSize, currentRoom.layout, currentRoom.checkCollision.bind(currentRoom));
}

function draw() {
    currentRoom.draw(offScreenCtx, roomImage);
    player.draw(offScreenCtx, characterImage);

    // Scale up the off-screen canvas and draw it to the visible canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false; // Disable anti-aliasing
    ctx.drawImage(offScreenCanvas, 0, 0, offScreenCanvas.width, offScreenCanvas.height, 0, 0, canvas.width, canvas.height);
}
