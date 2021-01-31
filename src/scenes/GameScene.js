import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // preload -->

    this.gameMusic = this.sound.add("gameplay_music");

    console.log("game scene loaded");

    // Disables Right Click 
    this.input.mouse.disableContextMenu();
    // Keyboard Control
    this.cursors = this.input.keyboard.createCursorKeys();
    // Camera
    this.cameras.main.setViewport(0, 0, 800, 600).setZoom(2.0); //.setZoom(1.5)
    // Create Map
    const map = this.make.tilemap({ key: "map" });

    const tile1 = map.addTilesetImage("buildings", "buildings");
    const tile2 = map.addTilesetImage("floor", "floor");
    const tile3 = map.addTilesetImage("road_items", "road_items");

    const layer0 = map.createLayer(0, tile1, 0, 0); // walls
    const layer1 = map.createLayer(1, tile2, 0, 0); // ground
    const layer2 = map.createLayer(2, tile1, 0, 0); // sidewalk
    const layer3 = map.createLayer(3, tile3, 0, 0); // deco

    layer0.setCollisionByExclusion( [-1] ); // walls
    layer3.setCollisionByExclusion( [-1] ); // deco

    this.player = this.physics.add.sprite(410, 250, "detective");
    this.player.body.setSize(16,8);
    this.player.body.offset.y = 30;
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.player, layer0);
    this.physics.add.collider(this.player, layer3);

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

    this.gameMusic.play();

    var box1 = this.dialog(300, 380, '12px', 'Tell me a story Please....');
   

  } // --> create

  update() {
    // update -->
    this.player.setVelocity(0);
    
    if (this.cursors.left.isDown) 
    {
      this.player.setVelocityX(-70);
      this.player.anims.play("moving", true);
    } 
    else if (this.cursors.right.isDown) 
    {
      this.player.setVelocityX(70);
      this.player.anims.play("moving", true);
    } 
    else if (this.cursors.up.isDown) 
    {
      this.player.setVelocityY(-70);
      this.player.anims.play("moving", true);
    } 
    else if (this.cursors.down.isDown) 
    {
      this.player.setVelocityY(70);
      this.player.anims.play("moving", true);
    } 
    else {
      this.player.setVelocity(0);
      this.player.anims.play("idle");
    }

  } // --> update

  dialog(text_x, text_y, size, text){
    this.add.image(400, 400, 'text_box').setScrollFactor(0); // 400, 400 is perfect for placement
 
    this.add.text(text_x, text_y, text,
    {
      fontFamily: "monospace",
      fontSize: size,
      fill: "black"
    }
    ).setScrollFactor(0);
  }

} // --> class GameScene

// Debug
// GameScene:
// game.scene.scenes[5]

// Graveyard
