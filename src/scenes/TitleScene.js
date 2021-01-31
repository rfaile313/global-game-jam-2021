import 'phaser';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }
 
  preload () {
    this.anims.create({
      key: "bubble",
      frames: this.anims.generateFrameNumbers("bubble_boy", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.bubble = this.add.sprite(150, 405, "bubble_boy");
    this.bubble.anims.play("bubble");

  } // --> preload
 
  create () {


    const titleMusic = this.sound.add('title_music');
    
    if (!this.music_playing) titleMusic.play( { loop: true } );
    
    this.music_playing = true;

    // const particles = this.add.particles('red_particles');
    // const emitter = particles.createEmitter();
    // emitter.setPosition(600,400);
    // emitter.setSpeed(200);
    // emitter.setBlendMode(Phaser.BlendModes.ADD);
    const chase_ventura = this.add.image(280, 150, 'title1').setScale(.8);
    const kid_detective = this.add.image(390, 200, 'title2').setScale(1.2);
    const play_button = this.add.image(390, 300, 'play').setScale(.8).setInteractive();
    const option_button = this.add.image(390, 350, 'optiontext').setScale(.8).setInteractive();
    const credits_button = this.add.image(390, 400, 'credits').setScale(.8).setInteractive();
    //const character_art = this.add.image(190, 405, 'trench_coat');

    // Hover Over Buttons
    play_button.on('pointerover', () => {
      play_button.setScale(.9);
    });
    option_button.on('pointerover', () => {
      option_button.setScale(.9);
    });
    credits_button.on('pointerover', () => {
      credits_button.setScale(.9);
    });
    
    // Hover Off Buttons
    play_button.on('pointerout', () => {
      play_button.setScale(.8);
    });
    option_button.on('pointerout', () => {
      option_button.setScale(.8);
    });
    credits_button.on('pointerout', () => {
      credits_button.setScale(.8);
    });
    
    // Click buttons
    play_button.on('pointerdown', () => {
      console.log('clicked play button');
      this.sound.stopAll();
      this.scene.start('Intro');
    });
    option_button.on('pointerdown', () => {
      this.scene.start('Options');
    });
    credits_button.on('pointerdown', () => {
      this.scene.start('Credits');
    });
  }

};