import "phaser";

// Characters
import detective from '../assets/detective.png';

// Title Screen
import title from '../assets/title.png'; 
import menu_pointer from '../assets/menu_pointer.png';
import play from '../assets/play.png'; 
import optiontext from '../assets/optiontext.png'; 
import credits from '../assets/credits.png'; 
import red_particles from '../assets/particles/red.png';

// Icons
import iconSheet from '../assets/art/Icons/icons_full_32.png';
import pointer from '../assets/pointer.png'; // angled glove hand

// Map
// import map from '../assets/map/test1.json';
// import inside from '../assets/art/Tilesets/Base/inside.png';
// import outside from '../assets/art/Tilesets/Base/house.png';

import map from '../assets/map/test2.json';
import buildings from '../assets/buildings.png';
import floor from '../assets/floor.png';
import road_items from '../assets/road_items.png';

// Audio
import title_music from '../assets/music/title_music.mp3';
import gameplay_music from '../assets/music/gameplay_music.mp3';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // Add splash image during loading
    const splash = this.add.image(400, 200, "splash");

    // Assets Load here
    this.load.spritesheet('detective', detective, {frameWidth: 26, frameHeight: 36});

    // Generate Map
    this.load.image('buildings', buildings);
    this.load.image('floor', floor);
    this.load.image('road_items', road_items);
    this.load.tilemapTiledJSON('map', map);

    // Icons
    //this.load.spritesheet('icons', iconSheet, {frameWidth: 32, frameHeight: 32});
    // Change Cursor
    this.input.setDefaultCursor(`url(${pointer}), pointer`);

    // Title Screen
    this.load.image('title', title);
    this.load.image('menu_pointer', menu_pointer);
    this.load.image('play', play);
    this.load.image('optiontext', optiontext);
    this.load.image('credits', credits);
    this.load.image('red_particles', red_particles);

    // Audio
    this.load.audio('title_music', title_music);
    this.load.audio('gameplay_music', gameplay_music);
  
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
      //this.scene.start('Game');
      // Prod --> Load title Screen
      this.scene.start('Title');
  }
}
