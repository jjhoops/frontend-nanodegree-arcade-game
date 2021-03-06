// Set up classes in separate file classes.js
// initiates player and enemies
const player = new Player();
let allEnemies = [...Array(3)].map((_, i) => new Enemy(0, i + 1));
const inity = 20; // Sets offset to gameboard
const offsetx = 101; //Sets relative offset of images
const offsety = 83; //Sets relative offset of images

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});