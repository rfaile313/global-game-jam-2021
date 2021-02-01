import "phaser";

// Characters
import detective from '../assets/detective.png';
import dottie from '../assets/dottie.png';

import jimmy from '../assets/jimmy.png';
import carl from '../assets/carl.png';
import betty from '../assets/betty.png';
import baby from '../assets/baby.png';
import lackey from '../assets/lackey.png';
import bobby from '../assets/bobby.png';
import mom from '../assets/mom.png';

// Items
import desk from '../assets/just_desk.png';

// Title Screen
import title1 from '../assets/title1.png';
import title2 from '../assets/title2.png'; 
import menu_pointer from '../assets/menu_pointer.png';
import play from '../assets/play.png'; 
import optiontext from '../assets/optiontext.png'; 
import credits from '../assets/credits.png'; 
import red_particles from '../assets/particles/red.png';
import back from '../assets/back.png';
import checkbox from '../assets/checkbox.png';
import checked from '../assets/checked.png';
import trench_coat from '../assets/trench_coat.png';
import bubble_boy from '../assets/bubble_boy.png';
import black from '../assets/black.png';
import end_graphic from '../assets/end.png';


// Icons
import pointer from '../assets/pointer.png'; // angled glove hand


// Map
import map from '../assets/map/game_map.json';
import buildings from '../assets/buildings.png';
import floor from '../assets/floor.png';
import road_items from '../assets/road_items.png';
import house from '../assets/house.png';
import inside from '../assets/inside.png';
import sky from '../assets/sky.png';

// Text Box
import text_box from '../assets/text_box.png';
import more_text from '../assets/more_text.png';

// Audio
import title_music from '../assets/music/title_music.mp3';
import intro_music from '../assets/music/intro_music.mp3';
import gameplay_music from '../assets/music/gameplay_music.mp3';
import victory_music from '../assets/music/victory_music.mp3';


// SFX
import girl_cry from '../assets/sfx/girl_cry.mp3';
import girl_sniff from '../assets/sfx/girl_sniff.mp3';
import knock_knock from '../assets/sfx/knock_knock.mp3';
import mean_kid from '../assets/sfx/mean_kid.mp3';
import menu_nav from '../assets/sfx/menu_nav.mp3';
import pick_up_sound from '../assets/sfx/pick_up_sound.wav';
import player_think from '../assets/sfx/player_think.mp3';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // Add splash image during loading
    //const splash = this.add.image(400, 200, "splash");

    // Assets Load here
    this.load.spritesheet('detective', detective, {frameWidth: 26, frameHeight: 36});
    this.load.spritesheet('dottie', dottie, {frameWidth: 27, frameHeight: 34});
    this.load.spritesheet('bubble_boy', bubble_boy, {frameWidth: 375, frameHeight: 375})
    this.load.image('black', black);

    this.load.image('text_box', text_box);
    this.load.image('more_text', more_text);
    this.load.image('desk', desk);

    this.load.image('jimmy', jimmy);
    this.load.image('carl', carl);
    this.load.image('betty', betty);
    this.load.image('baby', baby);
    this.load.image('lackey', lackey);
    this.load.image('bobby', bobby);
    this.load.image('mom', mom);
    this.load.image('end_graphic', end_graphic);



    // Generate Map
    this.load.image('buildings', buildings);
    this.load.image('floor', floor);
    this.load.image('road_items', road_items);
    this.load.image('house', house);
    this.load.image('inside', inside);
    this.load.image('sky', sky);

    this.load.tilemapTiledJSON('map', map);

    // Default Cursor
    this.input.setDefaultCursor(`url(${pointer}), pointer`);
    // Cursor Changes

    // Title Screen
    this.load.image('title1', title1);
    this.load.image('title2', title2);
    this.load.image('menu_pointer', menu_pointer);
    this.load.image('play', play);
    this.load.image('optiontext', optiontext);
    this.load.image('credits', credits);
    this.load.image('red_particles', red_particles);
    this.load.image('back', back);
    this.load.image('trench_coat', trench_coat);

    // Options Screen

    this.load.image('checkbox', checkbox);
    this.load.image('checked', checked);

    // Audio
    this.load.audio('title_music', title_music);
    this.load.audio('intro_music', intro_music);
    this.load.audio('gameplay_music', gameplay_music);
    this.load.audio('victory_music', victory_music);


    this.load.audio('girl_cry', girl_cry);
    this.load.audio('girl_sniff', girl_sniff);
    this.load.audio('knock_knock', knock_knock);
    this.load.audio('mean_kid', mean_kid);
    this.load.audio('menu_nav', menu_nav);
    this.load.audio('pick_up_sound', pick_up_sound);
    this.load.audio('player_think', player_think);

    


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
      //splash.destroy();


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
