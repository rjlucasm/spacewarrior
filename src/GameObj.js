class GameObj extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }

    explode(canDestroy) {
        if (!this.getData("isDead")) {
            this.setTexture("explosionsprite");  
            this.play("explosionsprite"); 
      
            this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();
      
            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                    this.shootTimer.remove(false);
                }
            }
      
            this.setAngle(0);
            this.body.setVelocity(0, 0);
      
            this.on('animationcomplete', function() {
      
                if (canDestroy) {
                    this.destroy();
                }
                else {
                    this.setVisible(false);
                }
      
            }, this);
      
            this.setData("isDead", true);
        }
    }
}

class Player extends GameObj {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");

        this.setData("speed", 300);
        this.play("playership");

        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    }

    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }
    
    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    update() {
        this.body.setVelocity(0, 0);

        this.x = Phaser.Math.Clamp(this.x, 10, this.scene.game.config.width - 10);

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
              this.setData("timerShootTick", this.getData("timerShootTick") + 1);
            }
            else {
                var laser = new PlayerLaser(this.scene, this.x, this.y);
                this.scene.playerLasers.add(laser);
                
                this.scene.sfx.laser.play();
                this.setData("timerShootTick", 0);
            }
        }
    }

    onDestroy() {
        this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
                game.scene.keys["GameOver"].signal = "GAME OVER";
                this.scene.scene.start("GameOver");
            },
            callbackScope: this,
            loop: false
        });
    }
}

class PlayerLaser extends GameObj {
    constructor(scene) {
        var x = scene.player.x;
        var y = scene.player.y - 20;
        super(scene, x, y, "beam");
        this.play("beam");
        this.body.velocity.y = -300;
    }

    update() {
        if(this.y < 32){
            this.destroy();
        }
    }
}

class EnemyLaser extends GameObj {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyshot");
        this.body.velocity.y = 400;
    }

    update() {
        if(this.y > 300){
            this.destroy();
        }
    }
}

class Asteroid extends GameObj {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid", "Asteroid");

        this.body.velocity.y = Phaser.Math.Between(600, 750);
    }

    update() {
        if(this.y > 320){
            this.destroy();
        }
    }
}

class Asteroid2 extends GameObj {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid2", "Asteroid2");

        this.body.velocity.y = Phaser.Math.Between(400, 600);
    }

    update() {
        if(this.y > 320){
            this.destroy();
        }
    }
}
  
class Enemy extends GameObj {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy", "Enemy");
        this.play("enemy");

        this.body.velocity.y = Phaser.Math.Between(100, 200);

        this.shootTimer = this.scene.time.addEvent({
            delay: 400,
            callback: function() {
                var laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y + 16
            );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }

    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}

class Enemy2 extends GameObj {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy2", "Enemy2");
        this.play("enemy2");

        this.body.velocity.y = Phaser.Math.Between(100, 200);

        this.shootTimer = this.scene.time.addEvent({
            delay: 400,
            callback: function() {
                var laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y + 16
            );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }

    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}

class Enemy3 extends GameObj {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy3", "Enemy3");
        this.play("enemy3");

        this.body.velocity.y = Phaser.Math.Between(100, 200);

        this.shootTimer = this.scene.time.addEvent({
            delay: 400,
            callback: function() {
                var laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y + 16
            );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }

    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}