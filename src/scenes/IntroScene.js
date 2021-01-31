import "phaser";
import dialog from '../dialog/dialog';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("Intro");
  }

  preload() {
    // preload -->

    this.introMusic = this.sound.add("intro_music");
    this.introMusic.loop = true;

    console.log("game scene loaded");

    // Disables Right Click
    this.input.mouse.disableContextMenu();
    // Keyboard Control
    this.cursors = this.input.keyboard.createCursorKeys();
    // WASD
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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

    this.player = this.physics.add.sprite(105, 75, "detective");
    this.player.body.setSize(12, 8);
    this.player.body.offset.y = 30;
    this.cameras.main.startFollow(this.player);

    layer2.setCollisionByExclusion([-1]);
    layer3.setCollisionByExclusion([-1]);
    layer4.setCollisionByExclusion([-1]);
    layer6.setCollisionByExclusion([-1]);
    layer7.setCollisionByExclusion([-1]);
    layer8.setCollisionByExclusion([-1]);

    this.physics.add.collider(this.player, layer2);
    this.physics.add.collider(this.player, layer3);
    this.physics.add.collider(this.player, layer4);
    this.physics.add.collider(this.player, layer6);
    this.physics.add.collider(this.player, layer7);
    this.physics.add.collider(this.player, layer8);

    this.add.image(100, 75, "desk");

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
  } // --> preload

  create() {
    // create -->

    this.introMusic.play();

    this.dialog_counter = 0;
    this.move = false;

    var box = this.add.image( 400, 400, 'text_box').setScrollFactor(0).setInteractive();

    var text = this.add.text( 300, 375,
        Object.values(dialog)[this.dialog_counter],
       {
          fontFamily: "monospace",
          fontSize: '12px',
          fill: "black",
        })
        .setScrollFactor(0);

      var more = this.add.image(495, 425, "more_text").setScale(.5).setScrollFactor(0).setInteractive();
      var tween = this.tweens.add({
        targets: more,
        y: 430,
        duration: 1000,
        ease: "Power2",
        yoyo: true,
        loop: -1,
      });

    box.on('pointerdown', () => {
      text.destroy();
      this.dialog_counter++;
      if (this.dialog_counter == 6){
              this.time.addEvent({
      delay: 300,
      callback: dottie_walks_in,
      callbackScope: this,
    });
    function dottie_walks_in(){
      
    }

      }
      else {
      text = this.add.text( 300, 375,
        Object.values(dialog)[this.dialog_counter],
       {
          fontFamily: "monospace",
          fontSize: '12px',
          fill: "black",
        })
        .setScrollFactor(0);
      }
    });
  

 
  
//                           || absolute cutoff
//     var box2 = this.dialog(
//       300,
//       380,
//       "12px",
// `often known as my bedroom. 
// This is where I operate my 
// detective business. I try..`
//     );



  } // --> create

  update() {
    // update -->
    this.player.setVelocity(0);

    if (this.move){
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
    }
  } // --> update

  // dialog(text_x, text_y, size, text,) {
  //   this.time.addEvent({
  //     delay: 300,
  //     callback: createText,
  //     callbackScope: this,
  //   });

  //   function createText() {
  //     var box = this.add.image(400, 400, "text_box").setScrollFactor(0); // 400, 400 is perfect for placement

  //     var txt = this.add
  //       .text(text_x, text_y, text, {
  //         fontFamily: "monospace",
  //         fontSize: size,
  //         fill: "black",
  //       })
  //       .setScrollFactor(0);

  //     var more = this.add
  //       .image(495, 425, "more_text")
  //       .setScale(0.5)
  //       .setScrollFactor(0)
  //       .setInteractive();

  //     var tween = this.tweens.add({
  //       targets: more,
  //       y: 430,
  //       duration: 1000,
  //       ease: "Power2",
  //       yoyo: true,
  //       loop: -1,
  //     });

  //   }
  
} // --> class GameScene

// Debug
// GameScene:
// game.scene.scenes[5]

// Graveyard
