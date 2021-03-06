module MyPhaserGame {

    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: MyPhaserGame.Player;

        create() {
            
            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.background = this.add.sprite(0, 0, 'level1');

            this.music = this.add.audio('music', 1, false);
            this.music.play();

            this.player = new Player(this.game, 130, 284);
            this.physics.enable(this.player, Phaser.Physics.ARCADE);
        }

    }

} 