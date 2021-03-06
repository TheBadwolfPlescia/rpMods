class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprite
        this.load.image("rocket2", "./assets/rocket2.png");
        this.load.image("spaceshipv2", "./assets/spaceshipv2.png");
        this.load.image("spaceship2", "./assets/spaceship2.png");
        this.load.image("starfield", "./assets/starfield2.png");
        this.load.image("asteroidfield", "./assets/asteroidfield.png");
        // load spritesheet
        this.load.spritesheet('explosion2', './assets/explosion2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        // Add music
        this.load.audio("music", "./assets/argument.wav");
    }

    

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.music = this.sound.add("music");

        // Parallax Scrolling
        this.asteroidfield = this.add.tileSprite(0, 0, 640, 480, 'asteroidfield').setOrigin(0, 0);

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);

        // Test add border art
        this.add.image ()

        // White Rectangle Borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        // Green UI Background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0,0);
        
        // Add the Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket2').setScale(2, 2).setOrigin(0, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceshipv2', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceshipv2', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceshipv2', 0, 10).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width, 324, 'spaceship2', 0, 40).setOrigin(0, 0);

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // score
        this.p1Score = 0;

        highScore = highScore;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        
        // Score
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        // High Score
        this.scoreRight = this.add.text(478, 54, highScore, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        

        // 30-second Speed Increase
        this.clock = this.time.delayedCall(30000 , () => {
            this.game.settings.spaceshipSpeed *= 2;
        }, null , this);

        // Time remaining
        this.timeRemaining = game.settings.gameTimer / 1000;
        this.timeCenter = this.add.text(320, 54, this.timeRemaining, 20) 
        this.updateTime = this.time.addEvent({ delay: 1000, callback: this.timing, callbackScope: this, loop: true });

        
    }

    timing(){
        if(this.timeRemaining > 0){
            this.timeRemaining -= 1; // One second
        }
        console.log(this.timeRemaining);
        this.timeCenter.setText(this.timeRemaining); 
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        //scroll starfield
        this.starfield.tilePositionX -= 4;
        this.asteroidfield.tilePositionX -= 6;
        
        
        //update spaceship
        if (!this.gameOver) {
            // update rocket
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }


        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04); 
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03); 
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }


    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });  
        
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');   
        
        if(this.p1Score > highScore){
            highScore = this.p1Score;
        }
        this.scoreRight.text = highScore;
    }


}