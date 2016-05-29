module MyPhaserGame {

    export class Physics extends Phaser.State {
        
        terrain : Phaser.Sprite;
        player : Player;
        
        jumpButton : Phaser.Key;
        
        preload(){
            this.game.load.image('terrain', 'assets/terrain.png');
            this.game.load.physics('physics', 'assets/terrain.json');
        }

        create() {
            
            this.game.time.advancedTiming = true;
            this.game.stage.backgroundColor = '#ffffff';
            this.physics.startSystem(Phaser.Physics.P2JS);
            this.physics.p2.gravity.y = 700;
            this.physics.p2.restitution = 0;
            this.physics.p2.friction = 0.2;
            this.terrain = this.game.add.sprite(400, 400, 'terrain');
            
            this.game.physics.p2.enable(this.terrain, false);

            this.player = new Player(this.game, 130, 120, true);
            this.player = new Player(this.game, 400, 120);
            
            this.terrain.body.clearShapes();
            this.terrain.body.loadPolygon('physics', 'terrain');
            

            this.terrain.body.static = true;
        }
        
        update(){
           // this.player.rotation = 0;
        }
        
        render(){
            this.game.debug.text(''+this.game.time.fps, 15,15);            
        }
        
        

    }

} 