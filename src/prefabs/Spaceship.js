// Spaceship prefab
// Rocket Prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        
        // Add object to the existing scene update list n display list
        scene.add.existing(this);
        // store point value
        this.points = pointValue;
    }

    update() {
        // move spaceship left
        this.x -= game.settings.spaceshipSpeed;

        // wraparound screen bounds
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}