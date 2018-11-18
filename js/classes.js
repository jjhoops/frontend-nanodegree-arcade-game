// Choose Entity graphics
const playerSprite = 'char-boy.png';
const enemySprite = 'enemy-bug.png';
// Basic Constructor for entity to be drawn on-screen; used for player and enemies
class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * offsetx, this.y * offsety);
    }

    update(dt) {
            // Defines screen boundaries
            this.isOffScreenX = this.x > 5;
            this.isOffScreenY = this.y < 1;
        }
        // Collisions checked by calling with player on each enemy
    checkCollisions(entity) {
        if (this.y === entity.y) {
            if (this.x >= entity.x - 0.5 && this.x <= entity.x + 0.5) {
                return true;
            }
        } else {
            return false;
        }
    }
}
// Player class inherits from Entity
class Player extends Entity {
    constructor() {
            super();
            this.sprite += playerSprite;
            this.movement = false;
            this.win = false;
        }
        // Reacts to input from the keyboard arrows; changing position if not at boundary
    handleInput(input) {
            switch (input) {
                case 'left':
                    this.x = this.x > 0 ? this.x - 1 : this.x;
                    break;
                case 'right':
                    this.x = this.x < 4 ? this.x + 1 : this.x;
                    break;
                case 'up':
                    this.y = this.y > 0 ? this.y - 1 : this.y;
                    break;
                case 'down':
                    this.y = this.y < 5 ? this.y + 1 : this.y;
                    break;
                default:
                    break;
            }
            // Sets movement to true
            this.movement = true;
        }
        //Checks that player is not moving and has not won yet when moving offscreen in the Y direction to determine a win
    update(dt) {
            super.update();
            if (this.isOffScreenY && !this.movement && !this.win) {
                this.win = true;
            }
        }
        // Draws the movement and restores movement flag to false
    render() {
        super.render();
        this.movement = false;
    }

}
// Enemy class inerited from Entity and added "speed"
class Enemy extends Entity {
    constructor(x, y) {
            super();
            this.sprite += enemySprite;
            this.x = x;
            this.y = y;
            this.speed = 0;
        }
        // Method to change speed randomly
    changeSpeed() {
            this.speed = Math.random() * 3 + 1.5;
        }
        // Update method resets back to left if right side of screen reached, manipulates x based on speed
    update(dt) {
        super.update();
        if (this.isOffScreenX) {
            this.x = -1;
        } else {
            this.x += dt * this.speed;
        }
    }
}