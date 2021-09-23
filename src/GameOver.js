class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
        this.signal
    }

    create() {
        this.add.bitmapText(this.game.config.width * 0.5, 10, "pixelFont", this.signal, 16).setOrigin(0.5);

        this.scoreLabel = this.add.bitmapText(this.game.config.width * 0.5, 120, "pixelFont", 16).setOrigin(0.5);
        this.scoreLabel.text = "SCORE " + game.scene.keys["Main"].score;
        this.highscoreLabel = this.add.bitmapText(this.game.config.width * 0.5, 160, "pixelFont", 16).setOrigin(0.5);

        if(this.signal === "GAME OVER")
        {
            if(localStorage.getItem("highscore") < game.scene.keys["Main"].score)
            {
                localStorage.setItem("highscore", game.scene.keys["Main"].score);
                this.highscoreLabel.text = "NEW HIGHSCORE";
            }
            else
            {
                this.highscoreLabel.text = "HIGHSCORE " + localStorage.getItem("highscore");
            }
        }

        this.sfx = {
            // btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("audio_beam")
        };

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.8,
            "restart"
        );
        this.btnRestart.play("restart");
      
        this.btnRestart.setInteractive();
      
        this.btnRestart.on("pointerup", function() {
            this.scene.start("Main");
        }, this);

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)){
            this.sfx.btnDown.play();
            this.scene.start("Main"); 
        }
    }
}