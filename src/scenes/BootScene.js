import 'phaser';
import splash from '../assets/thumb.jpg';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
    
  }
 
  preload () {
    // load images
    this.load.image('splash', splash);
  }
 
  create () {
      this.scene.start('Preloader');
  }
};