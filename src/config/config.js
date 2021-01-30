import 'phaser';

export default {
type: Phaser.AUTO,
parent: 'gameWindow',
pixelArt: false,
width: 800,
height: 600,
physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  }
};