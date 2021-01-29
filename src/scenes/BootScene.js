import 'phaser';
import splash from '../assets/splash.png';

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