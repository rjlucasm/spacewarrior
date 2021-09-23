var config = {
    type: Phaser.AUTO,
    width: 280,
    height: 320,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    backgroundColor: "black",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [Preload, MainMenu, Main, GameOver],
    pixelArt: true,
    roundPixels: true
}

var game = new Phaser.Game(config);