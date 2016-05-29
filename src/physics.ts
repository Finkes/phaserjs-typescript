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
            this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            this.game.time.advancedTiming = true;
            this.game.stage.backgroundColor = '#ffffff';
            this.physics.startSystem(Phaser.Physics.P2JS);
            this.physics.p2.gravity.y = 700;
            this.physics.p2.restitution = 0;
            this.physics.p2.friction = 0.2;
            this.terrain = this.game.add.sprite(400, 400, 'terrain');
            
            this.player = new Player(this.game, 130, 120);
            
            this.game.physics.p2.enable([this.terrain, this.player], false);
            
            this.terrain.body.clearShapes();
            this.terrain.body.loadPolygon('physics', 'terrain');
            
            this.player.body.setCircle(30);
            this.player.body.fixedRotation = true;
            this.terrain.body.static = true;
        }
        
        update(){
            this.player.rotation = 0;
            
            if(this.jumpButton.isDown){
                this.player.body.moveUp(500);
            }
        }
        
        render(){
            this.game.debug.text(''+this.game.time.fps, 15,15);            
        }
        
        

    }

} 