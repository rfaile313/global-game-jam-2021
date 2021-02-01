import 'phaser';
import d_bobby from '../dialog/bobby';
import d_jimmy from '../dialog/jimmy';
import d_baby from '../dialog/baby';
import d_baby2 from '../dialog/baby2';
import d_carl from '../dialog/carl';
import d_betty from '../dialog/betty';
import d_betty2 from '../dialog/betty2';
import d_mom from '../dialog/mom';

import pointer from '../assets/pointer.png'; // angled glove hand
import talking from '../assets/talking.png';
import mag_glass from '../assets/mag_glass.png';
import exclamation from '../assets/exclamation.png';

 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    console.log('game scene loaded');
    this.gameMusic = this.sound.add("gameplay_music");
    

          // Disables Right Click
          this.input.mouse.disableContextMenu();
          // Keyboard Control
          this.cursors = this.input.keyboard.createCursorKeys();
                 // WASD
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // TODO: fade in
  }
 
  create () {

        
        this.gameMusic.play( {loop:true} );
 
        // Camera
        this.cameras.main.setViewport(0, 0, 800, 600).setZoom(2.0); //.setZoom(1.5)
        // Create Map
        const map = this.make.tilemap({ key: "map" });
    
        const buildings = map.addTilesetImage("buildings", "buildings");
        const floor = map.addTilesetImage("floor", "floor");
        const house = map.addTilesetImage("house", "house");
        const road_items = map.addTilesetImage("road_items", "road_items");
        const inside = map.addTilesetImage("inside", "inside");
        const sky = map.addTilesetImage("sky", "sky");
    
        const layer0 = map.createLayer(0, sky, 0, 0); // sky
        const layer1 = map.createLayer(1, buildings, 0, 0); // street
        const layer2 = map.createLayer(2, floor, 0, 0); // floor / actually a wall
        const layer3 = map.createLayer(3, house, 0, 0); // houses
        const layer4 = map.createLayer(4, road_items, 0, 0); // road_items
        const layer5 = map.createLayer(5, inside, 0, 0); // bedroomFloor
        const layer6 = map.createLayer(6, inside, 0, 0); // backbedroom wall
        const layer7 = map.createLayer(7, house, 0, 0); // bedroom side walls
        const layer8 = map.createLayer(8, inside, 0, 0); // bedroom furntiture
    
        // TODO: add desk collider

        const desk = this.physics.add.image(100, 75, "desk").setImmovable();

        // interesting VV
        //this.physics.add.existing(desk);



      // NPCs
      this.jimmy = this.physics.add.image(1542, 1340, 'jimmy').setInteractive().setImmovable();
      this.mom =  this.physics.add.image(1542, 1340, 'mom').setInteractive().setImmovable();
      this.carl = this.physics.add.image(1716, 1325, 'carl').setInteractive().setImmovable();
      this.betty = this.physics.add.image(1864, 1344, 'betty').setInteractive().setImmovable();
      this.lackey = this.physics.add.image(2175, 1322, 'lackey').setInteractive().setImmovable();
      this.baby = this.physics.add.image(2162, 1332, 'baby').setInteractive().setImmovable();
      this.bobby =  this.physics.add.image(1323, 1400, 'bobby').setInteractive().setImmovable();


      this.player = this.physics.add.sprite(105, 105, "detective");
      this.player.body.setSize(12, 8);
      this.player.body.offset.y = 30;
      this.cameras.main.startFollow(this.player);

        // Player moving
  this.anims.create({
      key: "moving",
      frames: this.anims.generateFrameNumbers("detective", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    // Player not moving
    this.anims.create({
      key: "idle",
      frames: [{ key: "detective", frame: 0 }],
      //frameRate: 20
    });


    this.unlocked = false;

            // Collisions
            layer2.setCollisionByExclusion([-1]);
            layer3.setCollisionByExclusion([-1]);
            layer4.setCollisionByExclusion([-1]);
            layer6.setCollisionByExclusion([-1]);
            layer7.setCollisionByExclusion([-1]);
            layer8.setCollisionByExclusion([-1]);
            // Map
            this.physics.add.collider(this.player, layer2);
            this.physics.add.collider(this.player, layer2);
            this.physics.add.collider(this.player, layer3);
            this.physics.add.collider(this.player, layer4);
            this.physics.add.collider(this.player, layer6);
            this.physics.add.collider(this.player, layer7);
            this.physics.add.collider(this.player, layer8);
            this.physics.add.collider(this.player, layer5);
            // Static Objects / NPCs
            this.physics.add.collider(this.player, desk);
            this.physics.add.collider(this.player, this.jimmy);
            this.physics.add.collider(this.player, this.carl);
            this.physics.add.collider(this.player, this.betty);
            this.physics.add.collider(this.player, this.baby);
            this.physics.add.collider(this.player, this.lackey);
            this.physics.add.collider(this.player, this.bobby);
            this.physics.add.collider(this.player, this.mom);

            this.mom.visible = false;

            this.black = this.add.image(60,60, 'black').setScrollFactor(0);
            this.black.setAlpha(0);

          

            this.box = this.add.image( 400, 400, 'text_box').setScrollFactor(0).setInteractive();

            this.dialog_counter = 0;
            this.current_talk = '';
        
              this.more = this.add.image(495, 425, "more_text").setScale(.5).setScrollFactor(0).setInteractive();
            
              this.tween = this.tweens.add({
                targets: this.more,
                y: 430,
                duration: 1000,
                ease: "Power2",
                yoyo: true,
                loop: -1,
              });

       
            this.hide_text = () => {
                this.box.visible = false;
                this.more.visible = false;
            }

            this.show_text = () => {
                this.box.visible = true;
                this.more.visible = true;
            }

            var text = this.add.text( 300, 375,
                Object.values(d_bobby)[this.dialog_counter],
               {
                  fontFamily: "monospace",
                  fontSize: '12px',
                  fill: "black",
                })
                .setScrollFactor(0);

            this.dialog = (char) => {
                text.destroy();
                this.dialog_counter++;
                if (this.dialog_counter == 7 && char == d_bobby){
                    this.dialog_counter = 0;
                    this.hide_text();
                }
                else if (this.dialog_counter == 8 && char == d_jimmy){
                    this.dialog_counter = 0;
                    this.hide_text();
                }
                else if (this.dialog_counter == 9 && char == d_carl){
                    this.dialog_counter = 0;
                    this.hide_text();
                }
                else if (this.dialog_counter == 13 && char == d_betty){
                    this.dialog_counter = 0;
                    this.hide_text();
                }
                else if (this.dialog_counter == 18 && char == d_betty2){
                    this.dialog_counter = 0;
                    this.jimmy.visible = false;
                    this.mom.visible = true;
                    this.hide_text();
                }
                else if (this.dialog_counter == 14 && char == d_mom){
                    this.dialog_counter = 0;
                    this.hide_text();
                    this.tweens.add({
                        targets: this.black,
                        alpha: 1,
                        duration: 3000
                    });
                    this.time.addEvent({
                      delay: 3000,
                      repeat: 0,
                      callback: () => {
                        game.sound.stopAll();
                        this.scene.start('End');
                      }
                    });
                }
                else if (this.dialog_counter == 18 && char == d_baby){
                    this.dialog_counter = 0;
                   this.unlocked = true;
                    this.hide_text();
                }
                else if (this.dialog_counter == 18 && char == d_baby2){
                    this.dialog_counter = 0;
                    this.hide_text();
                }
                else{
                text = this.add.text( 300, 375,
                    Object.values(char)[this.dialog_counter],
                   {
                      fontFamily: "monospace",
                      fontSize: '12px',
                      fill: "black",
                    })
                    .setScrollFactor(0);
                }
            }

            this.hide_text();

       
    
            // Bobby
            this.bobby.on('pointerover', () => {
                this.input.setDefaultCursor(`url(${talking}), pointer`);
            });
            this.bobby.on('pointerout', () => {
                this.input.setDefaultCursor(`url(${pointer}), pointer`);
            });
            this.bobby.on('pointerdown', () => {
            this.current_talk = 'bobby';
              this.show_text();
              this.current_talk = 'bobby';
              this.switch(this.current_talk);
            });
         
             // Jimmy
             this.jimmy.on('pointerover', () => {
                this.input.setDefaultCursor(`url(${talking}), pointer`);
            });
            this.jimmy.on('pointerout', () => {
                this.input.setDefaultCursor(`url(${pointer}), pointer`);
            });
            this.jimmy.on('pointerdown', () => {
              this.show_text();
              this.current_talk = 'jimmy';
              this.switch(this.current_talk);
            });

            // Carl 
            this.carl.on('pointerover', () => {
                this.input.setDefaultCursor(`url(${talking}), pointer`);
            });
            this.carl.on('pointerout', () => {
                this.input.setDefaultCursor(`url(${pointer}), pointer`);
            });
            this.carl.on('pointerdown', () => {
              this.show_text();
              this.current_talk = 'carl';
              this.switch(this.current_talk);
            });

            // betty 
               this.betty.on('pointerover', () => {
                this.input.setDefaultCursor(`url(${talking}), pointer`);
            });
            this.betty.on('pointerout', () => {
                this.input.setDefaultCursor(`url(${pointer}), pointer`);
            });
            this.betty.on('pointerdown', () => {
              this.show_text();
              this.current_talk = 'betty';
              this.switch(this.current_talk);
            });

         // baby 
              this.baby.on('pointerover', () => {
                this.input.setDefaultCursor(`url(${talking}), pointer`);
            });
            this.baby.on('pointerout', () => {
                this.input.setDefaultCursor(`url(${pointer}), pointer`);
            });
            this.baby.on('pointerdown', () => {
              this.show_text();
              this.current_talk = 'baby';
              this.switch(this.current_talk);
            });

            // mom 
            this.mom.on('pointerover', () => {
                this.input.setDefaultCursor(`url(${talking}), pointer`);
            });
            this.mom.on('pointerout', () => {
                this.input.setDefaultCursor(`url(${pointer}), pointer`);
            });
            this.mom.on('pointerdown', () => {
              this.show_text();
              this.current_talk = 'mom';
              this.switch(this.current_talk);
            });


            this.switch = () => {
                switch (this.current_talk){
                    case 'bobby':
                        this.dialog(d_bobby);
                        break;
                    case 'jimmy':
                        this.dialog(d_jimmy);
                    break;
                    case 'carl':
                        this.dialog(d_carl);
                    break;
                    case 'betty':
                        if (!this.unlocked) this.dialog(d_betty);
                        else this.dialog(d_betty2);
                    break;
                    case 'baby':
                        this.dialog(d_baby);
                    break;
                    case 'mom':
                        this.dialog(d_mom);
                    break;
                }
            }

            this.box.on('pointerdown', () => {
                this.switch(this.current_talk);
            });
       
  
  }

  update() {
    // update -->
    this.player.setVelocity(0);

    
    if (this.cursors.left.isDown || this.keyA.isDown) {
      this.player.setVelocityX(-70);
      this.player.anims.play("moving", true);
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      this.player.setVelocityX(70);
      this.player.anims.play("moving", true);
    } else if (this.cursors.up.isDown || this.keyW.isDown) {
      this.player.setVelocityY(-70);
      this.player.anims.play("moving", true);
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
      this.player.setVelocityY(70);
      this.player.anims.play("moving", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.play("idle");
    }


    //console.log(`x: ${this.player.x} , y: ${this.player.y}`);

    if (this.player.y > 139 && this.player.x < 181)
    {
        this.player.x = 1387;
        this.player.y = 1335;
    }

  } // --> update

  
};