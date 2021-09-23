class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "spacemenubg");
        this.background.setOrigin(0,0);

        this.add.bitmapText(this.game.config.width * 0.5, this.game.config.height * 0.6, "pixelFont", "SPACE WARRIOR", 16).setOrigin(0.5);

        var highscore = localStorage.getItem("highscore");
        if(highscore){
            this.add.bitmapText(this.game.config.width * 0.5, 220, "pixelFont", "HIGHSCORE " + localStorage.getItem("highscore"), 16).setOrigin(0.5);
        }else{
            console.log('Highscore is not found');
        }

        this.music = this.sound.add("theme");

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

        this.sfx = {
            // btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("audio_beam")
        };
    
        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.8,
            "start"
        );
        this.btnPlay.play("start");
    
        this.btnPlay.setInteractive();
    
        this.btnPlay.on("pointerup", function() {
            // this.btnPlay.setTexture("sprBtnPlay");
            this.scene.start("Main");
        },  this);

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)){
            this.sfx.btnDown.play();
            this.scene.start("Main"); 
        }
    }
}