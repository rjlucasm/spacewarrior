class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "starsbg");
        this.background.setOrigin(0,0);

        this.score = 0;
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", 16);

        this.sfx = {
            explosions: [
                this.sound.add("explode"),
                this.sound.add("explode2")
            ],
            laser: this.sound.add("audio_beam")
        };

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.85,
            "playership"
        ); 

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.asteroids = this.add.group();
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: function() {
                var enemy = null;

                if (Phaser.Math.Between(0, 10) <= 3) {
                        enemy = new Enemy(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                    );
                }
                else if (Phaser.Math.Between(0, 10) >= 7) { 
                    enemy = new Enemy2(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }
                else { 
                    enemy = new Enemy3(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }

                if (enemy !== null) {
                    // enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 2000,
            callback: function() {
                var asteroid = null;

                if (Phaser.Math.Between(0, 10) >= 5) {
                    asteroid = new Asteroid(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }
                else {
                    asteroid = new Asteroid2(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }

                if (asteroid !== null) {
                    this.asteroids.add(asteroid);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.playerLasers, this.enemies, this.hitEnemy, null, this);

        this.physics.add.overlap(this.playerLasers, this.asteroids, function(playerLaser, asteroid) {
            if (asteroid) {
                playerLaser.destroy();
            }
        });

        this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
                player.explode(false);
                player.onDestroy();
                enemy.explode(true);
            }
        });

        this.physics.add.overlap(this.player, this.asteroids, function(player, asteroid) {
            if (!player.getData("isDead")) {
                player.explode(false);
                player.onDestroy();
                asteroid.explode(true);
            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                player.explode(false);
                player.onDestroy();
                laser.destroy();
            }
        });
    }

    Score() {
        this.score++;
        this.scoreLabel.text = "SCORE " + this.score;
    }

    hitEnemy(playerLaser, enemy) {

        if (enemy) {
            if (enemy.onDestroy !== undefined) {
                enemy.onDestroy();
            }
            enemy.explode(true);
            playerLaser.destroy();
        }
        this.score += 20;
        this.scoreLabel.text = "SCORE " + this.score;
    }

    update() {
        this.background.tilePositionY -= 10;

        if (!this.player.getData("isDead")) {

            this.Score();
            
            this.player.update();

            if (this.keyA.isDown) {
                this.player.moveLeft();
            }
            else if (this.keyD.isDown) {
                this.player.moveRight();
            }

            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true);
            }
            else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
      
            enemy.update();

            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
            
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                }
            }
        }

        for (var i = 0; i < this.asteroids.getChildren().length; i++) {
            var asteroid = this.asteroids.getChildren()[i];
      
            asteroid.update();
        }

        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
        }
      
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
        }
    }    
}