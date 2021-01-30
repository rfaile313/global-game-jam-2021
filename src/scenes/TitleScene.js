import 'phaser';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }
 
  preload () {
  }
 
  create () {

    const titleMusic = this.sound.add('title_music');
    // titleMusic.play();
    
    const particles = this.add.particles('red_particles');
    const emitter = particles.createEmitter();
    emitter.setPosition(390,200);
    emitter.setSpeed(200);
    emitter.setBlendMode(Phaser.BlendModes.ADD);
    const title_image = this.add.image(390, 200, 'title').setScale(.7);
    const play_button = this.add.image(390, 300, 'play').setScale(.8).setInteractive();
    const option_button = this.add.image(390, 350, 'optiontext').setScale(.8).setInteractive();
    const credits_button = this.add.image(390, 400, 'credits').setScale(.8).setInteractive();

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
      this.scene.start('Game');
    });
    option_button.on('pointerdown', () => {
      console.log('clicked options button');
    });
    credits_button.on('pointerdown', () => {
      console.log('clicked credits button');
    });
  }

};