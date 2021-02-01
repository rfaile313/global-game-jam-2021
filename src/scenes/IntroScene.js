import "phaser";
import intro from '../dialog/intro';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("Intro");
  }

  preload() {
    // preload -->

    this.introMusic = this.sound.add("intro_music");

    console.log("intro scene loaded");

    // Disables Right Click
    this.input.mouse.disableContextMenu();

    this.cameras.main.setViewport(0, 0, 800, 600).setZoom(2.0); //.setZoom(1.5)
    // Create Map
    const map = this.make.tilemap({ key: "map" });

    const house = map.addTilesetImage("house", "house");
    const inside = map.addTilesetImage("inside", "inside");

    const layer5 = map.createLayer(5, inside, 0, 0); // bedroomFloor
    const layer6 = map.createLayer(6, inside, 0, 0); // backbedroom wall
    const layer7 = map.createLayer(7, house, 0, 0); // bedroom side walls
    const layer8 = map.createLayer(8, inside, 0, 0); // bedroom furntiture

    this.player = this.physics.add.sprite(105, 75, "detective");
    this.player.body.setSize(12, 8);
    this.player.body.offset.y = 30;
    this.cameras.main.startFollow(this.player);

    this.add.image(100, 75, "desk");

    // Dottie
    this.anims.create({
      key: "crying",
      frames: this.anims.generateFrameNumbers("dottie", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });


    this.knock = this.sound.add('knock_knock');

  } // --> preload

  create() {
    // create -->


    this.dottie = this.physics.add.sprite(130, 105, "dottie");
    this.dottie.anims.play("crying");
    this.dottie.visible = false;
    // console.log(this.dottie);

    this.introMusic.play( {loop: true} );
 
    this.dialog_counter = 0;

    var box = this.add.image( 400, 400, 'text_box').setScrollFactor(0).setInteractive();

    var text = this.add.text( 300, 375,
        Object.values(intro)[this.dialog_counter],
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

    this.black = this.add.image(60,60, 'black').setScrollFactor(0);
    this.black.setAlpha(0);
    // console.log(this.black);

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
      this.knock.play();

      const knocking = this.time.addEvent({
        delay: 1500,
        repeat: 0,
        callback: function(){
          // console.log(knocking);
          game.scene.scenes[5].dottie.visible = true;
        }
      });
       
    }
      }
      else if (this.dialog_counter == 21){
        this.tweens.add({
          targets: this.black,
          alpha: 1,
          duration: 3000
      });
      this.time.addEvent({
        delay: 3000,
        repeat: 0,
        callback: function(){
          game.sound.stopAll();
          box.destroy();
          more.destroy();
          game.scene.start('Game');
        }
      });

      }
      else {
      text = this.add.text( 300, 375,
        Object.values(intro)[this.dialog_counter],
       {
          fontFamily: "monospace",
          fontSize: '12px',
          fill: "black",
        })
        .setScrollFactor(0);
      }
    });
  

  } // --> create


} // --> class GameScene

// Debug
// GameScene:
// game.scene.scenes[5]

// Graveyard
