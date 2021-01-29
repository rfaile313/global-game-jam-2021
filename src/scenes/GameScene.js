import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() 
  { // preload --> 

    this.gameMusic = this.sound.add('gameplay_music');

    console.log("game scene loaded");

    this.input.mouse.disableContextMenu();
    // Keyboard Control
    this.cursors = this.input.keyboard.createCursorKeys();
    // Camera
    this.cameras.main.setViewport(0, 0, 800, 600).setZoom(2.0); //.setZoom(1.5)
    // Create Map
    const map = this.make.tilemap({ key: "map" });

    const tile1 = map.addTilesetImage("inside", "inside");
    const tile2 = map.addTilesetImage("house", "outside");

    const layer0 = map.createLayer(0, tile1, 0, 0); // floor no collide
    const layer1 = map.createLayer(1, tile2, 0, 0); // collide yes
    const layer2 = map.createLayer(2, tile1, 0, 0); // collide yes
    const layer3 = map.createLayer(3, tile1, 0, 0); // collide yes

    layer1.setCollisionByExclusion( [-1] );
    //layer2.setCollisionByExclusion( [-1] );
    //layer3.setCollisionByExclusion( [-1] );


    this.player = this.physics.add.sprite(410, 380, "char_sheet_1")
    this.cameras.main.startFollow(this.player);
    
    this.physics.add.collider(this.player, layer1);
    this.physics.add.collider(this.player, layer2);
    this.physics.add.collider(this.player, layer3);


    //console.log(map);

      // player animations
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("char_sheet_1", {
      start: 12,
      end: 14,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("char_sheet_1", {
      start: 24,
      end: 26,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("char_sheet_1", {
      start: 36,
      end: 38,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("char_sheet_1", {
      start: 0,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "turn",
    frames: [{ key: "char_sheet_1", frame: 1 }],
    //frameRate: 20
  });

  } // --> preload

  create() 
  { // create -->

    this.gameMusic.play();
    //  Stop the right-click from triggering the context menu
    //  Can also set this in the game config :/


  //   this.input.on('pointerdown', function (pointer) {

  //     var currentTile = layer0.getTileAtWorldXY(pointer.x, pointer.y);
  //     //console.log(pointer.x, pointer.y);
  //     console.log(currentTile);


  // });

  // this.input.on('pointermove', function (pointer) { 
  //   var currentTile = layer0.getTileAtWorldXY(pointer.x, pointer.y);
  //   //console.log(pointer.x, pointer.y);
  //   console.log(currentTile);
  // });

    // Camera
    //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //this.cameras.main.setViewport(0, 0, 820, 820).setZoom(1.2)
    
  } // --> create

  update()
  { // update --> 

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-70);
      this.player.anims.play("left", true);
      this.player.direction = "left";
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(70);
      this.player.anims.play("right", true);
      this.player.direction = "right";
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-70);
      this.player.anims.play("up", true);
      this.player.direction = "up";
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(70);
      this.player.anims.play("down", true);
      this.player.direction = "down";
    } else {
      this.player.setVelocity(0);
      this.player.anims.play("turn");
      this.player.direction = "stand";
    }

  } // --> update

} // --> class GameScene

// Debug
// GameScene: 
// game.scene.scenes[5]

// Graveyard