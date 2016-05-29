var yAxis = p2.vec2.fromValues(0, 1);

module MyPhaserGame {

    export class Player extends Phaser.Sprite {

        jumpButton: Phaser.Key;
        SCALE: number = 1;
        bulletTimer = 0;
        bulletInterval = 1000;
        isPlayer: boolean = false;


        constructor(game: Phaser.Game, x: number, y: number, isPlayer?: boolean) {
            super(game, x, y, 'simon', 0);
            this.isPlayer = isPlayer;
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4, 5], 10, true);
            this.animations.add('stand', [6, 7, 8, 9, 10, 11], 10, true);
            this.animations.add('jump', [12, 13], 10, true);
            game.add.existing(this);
            this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.scale.x = this.SCALE;
            this.scale.y = this.SCALE;
            this.game.physics.p2.enable(this, false);
            this.body.setCircle(10);
            this.body.fixedRotation = true;
        }

        update() {
            this.body.velocity.x = 0;
            if (!this.isPlayer) {
                return;
            }
            if (this.jumpButton.isDown && this.checkIfCanJump()) {
                this.body.moveUp(500);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && this.bulletTimer + this.bulletInterval <= this.game.time.time) {
                //shoot
                let bullet = new Bullet(this.game, this.x + 30, this.y);
                this.bulletTimer = this.game.time.time;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');

                if (this.scale.x > 0) {
                    this.scale.x = -this.scale.x;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

                this.body.velocity.x = 150;
                //this.body.
                this.animations.play('walk');

                if (this.scale.x < 0) {
                    this.scale.x = -this.scale.x;
                }
            }
            else {
                this.animations.play('stand');
            }

            if (!this.checkIfCanJump()) {
                this.animations.play('jump');
            } else {

            }
        }

        checkIfCanJump() {
            var result = false;
            for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
                var c = this.game.physics.p2.world.narrowphase.contactEquations[i];
                if (c.bodyA === this.body.data || c.bodyB === this.body.data) {
                    var d = p2.vec2.dot(c.normalA, yAxis);
                    if (c.bodyA === this.body.data) {
                        d *= -1;
                    }
                    if (d > 0.5) {
                        result = true;
                    }
                }
            }
            return result;
        }
    }
}