import "phaser";
import battle_sheet_1 from '../assets/art/Battle/Base/1_1.png';
import battle_sheet_2 from '../assets/art/Battle/Base/1_2.png';
import battle_sheet_3 from '../assets/art/Battle/Base/1_3.png';
import battle_sheet_4 from '../assets/art/Battle/Base/1_4.png';
import battle_sheet_5 from '../assets/art/Battle/Base/1_5.png';
import battle_sheet_6 from '../assets/art/Battle/Base/1_6.png';
import battle_sheet_7 from '../assets/art/Battle/Base/1_7.png';
import battle_sheet_8 from '../assets/art/Battle/Base/1_8.png';

import blocks from '../assets/art/Blocks/blocks.png';
import map from '../assets/map/map1.json';
import iconSheet from '../assets/art/Icons/icons_full_32.png';
import pointer from '../assets/pointer.png'; // angled glove hand

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // Add splash image during loading
    const splash = this.add.image(400, 200, "splash");

    // Assets Load here
    this.load.spritesheet('battle_sheet_1', battle_sheet_1, {frameWidth: 144, frameHeight: 144});
    this.load.spritesheet('battle_sheet_2', battle_sheet_2, {frameWidth: 144, frameHeight: 144});
    this.load.spritesheet('battle_sheet_3', battle_sheet_3, {frameWidth: 144, frameHeight: 144});
    this.load.spritesheet('battle_sheet_4', battle_sheet_4, {frameWidth: 144, frameHeight: 144});
    this.load.spritesheet('battle_sheet_5', battle_sheet_5, {frameWidth: 144, frameHeight: 144});
    this.load.spritesheet('battle_sheet_6', battle_sheet_6, {frameWidth: 144, frameHeight: 144});
    this.load.spritesheet('battle_sheet_7', battle_sheet_7, {frameWidth: 144, frameHeight: 144});
    this.load.spritesheet('battle_sheet_8', battle_sheet_8, {frameWidth: 144, frameHeight: 144});

    // Generate Map
    this.load.image('blocks', blocks);
    this.load.tilemapTiledJSON('map', map);
    // Icons
    this.load.spritesheet('icons', iconSheet, {frameWidth: 32, frameHeight: 32});
    // Change Cursor
    this.input.setDefaultCursor(`url(${pointer}), pointer`);
  
    // Loading Screen / Bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      splash.destroy();


    });
    // --> Loading Screen / Bar
  }// --> Preload

  create()
  {

      // Debug --> Just load the game
      this.scene.start('Game');
      // Prod --> Load title Screen
      // self.scene.start('Title');
  }
}
