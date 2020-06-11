// Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        // Add object to the existing scene update list n display list
        scene.add.existing(this);
        this.multiplayer = game.settings.multiplay;
        this.isFiring = false;  // track rockets firing status
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        if(this.multiplayer == 0){
            //if 0 give P1 controls
            this.moveLeft = keyLEFT;
            this.moveRight = keyRIGHT;
            this.fire = keyF;
        }
        else{
            //if 1 (or anything else) give P2 controls
            this.moveLeft = keyJ;
            this.moveRight = keyL;
            this.fire = keyI;
        }
    }

    update(){
        //left/right movement
        if(true){
            if(this.moveLeft.isDown && this.x >= 47){
                this.x -= 2;
            }else if (this.moveRight.isDown && this.x <= 578){
                this.x +=  2;
            }
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(this.fire)){
            if(!this.isFiring){
                this.sfxRocket.play();
            }
            this.isFiring = true;

        }
        
        //if fired, move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }

        //reset on miss
        if(this.y <= 108){
           this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}