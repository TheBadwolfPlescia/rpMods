// Anthony Plescia
// Implement 30-second speed increase (10)
// Added looping Music (10)
// New Scrolling Background Image (10)
// Parallax Scrolling Asteroids (15)
// Partially Implemented New Ship type (10) ???
// Changed Ship, Rocket, and Spaceship Art (25)
// 


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    highScore: 0    
}

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;

let missileControl = false;

let highScore = 0;
