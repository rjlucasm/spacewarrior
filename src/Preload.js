class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var progressBar = new Phaser.Geom.Rectangle(90, 160, 100, 10);
		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

        this.load.image("starsbg", "assets/starsbg.png");
        this.load.image("spacemenubg", "assets/banner.png");

        this.load.image("asteroid", "assets/asteroid.png");
        this.load.image("asteroid2", "assets/asteroid2.png");
        this.load.image("enemyshot", "assets/enemyshot.png");

        this.load.spritesheet("explosionsprite", "assets/explosionsprite.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("enemy", "assets/enemy.png", {
            frameWidth: 24,
            frameHeight: 41
        });

        this.load.spritesheet("enemy2", "assets/enemy2.png", {
            frameWidth: 26,
            frameHeight: 33
        });

        this.load.spritesheet("enemy3", "assets/enemy3.png", {
            frameWidth: 30,
            frameHeight: 36
        });

        this.load.spritesheet("playership", "assets/playership.png", {
            frameWidth: 24,
            frameHeight: 33
        });

        this.load.spritesheet("beam", "assets/beam.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("start", "assets/space.png", {
            frameWidth: 54,
            frameHeight: 22
        });

        this.load.spritesheet("restart", "assets/restart.png", {
            frameWidth: 54,
            frameHeight: 22
        });

        this.load.audio("explode", "assets/explode.wav");
        this.load.audio("explode2", "assets/explode2.wav");
        this.load.audio("audio_beam", ["assets/beam.ogg", "assets/beam.mp3"]);
        this.load.audio("theme", "assets/theme.mp3");

        this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");

        this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics});
        this.load.on('complete', this.complete, {scene:this.scene});
    }

    create() {
        this.anims.create({
            key: "enemy",
            frames: this.anims.generateFrameNumbers("enemy"),
            frameRate: 20,
            repeat: -1
        });
      
        this.anims.create({
            key: "enemy2",
            frames: this.anims.generateFrameNumbers("enemy2"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "enemy3",
            frames: this.anims.generateFrameNumbers("enemy3"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "explosionsprite",
            frames: this.anims.generateFrameNumbers("explosionsprite"),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: "playership",
            frames: this.anims.generateFrameNumbers("playership"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "beam",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "start",
            frames: this.anims.generateFrameNumbers("start"),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "restart",
            frames: this.anims.generateFrameNumbers("restart"),
            frameRate: 5,
            repeat: -1
        });
    }

    updateBar(percentage) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(0xff0000, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(90, 160, percentage*100, 10));
                
        percentage = percentage * 100;
	}

	complete() {
        this.scene.start("MainMenu");
	}
}