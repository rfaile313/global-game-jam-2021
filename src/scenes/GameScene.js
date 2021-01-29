import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() 
  { // preload --> 

    console.log("game scene loaded");

  } // --> preload

  create() 
  { // create -->

    //  Stop the right-click from triggering the context menu
    //  Can also set this in the game config :/
    this.input.mouse.disableContextMenu();
    // Create Map
    var map = this.make.tilemap({ key: "map" });

    var tiles = map.addTilesetImage("blocks", "blocks");

    var layer0 = map.createLayer(0, tiles, 350, 100);
    var layer1 = map.createLayer(1, tiles, 350, 162);

    console.log(map);

  //   this.input.on('pointerdown', function (pointer) {

  //     var currentTile = layer0.getTileAtWorldXY(pointer.x, pointer.y);
  //     //console.log(pointer.x, pointer.y);
  //     console.log(currentTile);


  // });

  this.input.on('pointermove', function (pointer) { 
    var currentTile = layer0.getTileAtWorldXY(pointer.x, pointer.y);
    //console.log(pointer.x, pointer.y);
    console.log(currentTile);
  });

    // Camera
    //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //this.cameras.main.setViewport(0, 0, 820, 820).setZoom(1.2)
    
  } // --> create

  update()
  { // update --> 

  } // --> update

} // --> class GameScene

// Debug
// GameScene: 
// game.scene.scenes[5]

// Graveyard