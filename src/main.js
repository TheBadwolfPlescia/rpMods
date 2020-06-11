// Anthony Plescia
// Implement 30-second speed increase (10)
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
    gameTimer: 60000
    multiplayer: 0    
}

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT, keyJ, keyL, keyI, keyUP, keyDOWN;

let highScore = 0;

let missileControl = false;
