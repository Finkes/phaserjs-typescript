var yAxis = p2.vec2.fromValues(0, 1);

module MyPhaserGame {

    export class Bullet extends Phaser.Sprite {

        SCALE: number = 1;
        timer  = 0;


        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'preloadBar', 0);
            game.add.existing(this);
            this.game.physics.p2.enable(this, false);
            this.body.setRectangle(50,50);
            //this.body.fixedRotation = true;

            this.scale = new Phaser.Point(0.1, 0.1);
            this.game.physics.p2.enable(this, false);
            this.body.mass = 1000;
            this.body.damping = 0;
        }

        update() {
            this.body.velocity.x = 500;
            this.timer += this.game.time.elapsedMS;
            if(this.timer > 1500){
                this.kill();
            }
        }
    }
}