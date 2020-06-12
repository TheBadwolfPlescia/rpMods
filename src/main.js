// Anthony Plescia
// Implement 30-second speed increase (10)
// Added looping Music (10)
// New Scrolling Background Image (10)
// Parallax Scrolling Asteroids (15)
// Changed Ship, Rocket, and Spaceship Art (25)
// High Score Implemented (10)
// 60 second timer implemented (10)
// Added ship direction randomization (10) (the random number generator (in this .js) wonn't work, but I should have it right?)
// TOTAL: 100/100

// EXTRA (was left in from attempting)
// Partially Implemented New Ship type (10) ??? (Created art, Changed Point Value, changed position)
// TOTAL: 110/100


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

let game = new Phaser.Game(config);



// define game settings
game.settings = {
    spaceshipSpeed: Phaser.Math.Between(0,1),
    gameTimer: 60000,    
}

if(game.settings.spaceshipSpeed == 0){
    game.settings.spaceshipSpeed -= 1;
}

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;

let highScore = 0;
