export default class EndScene extends Phaser.Scene {
    constructor() {
      super("End");
    }

preload(){

}
create(){
    const victoryMusic = this.sound.add('victory_music');
    
    victoryMusic.play( { loop: true } );

    this.black = this.add.image(60,60, 'black').setScrollFactor(0);
    this.black.setAlpha(0);

    this.add.image(200,300, 'end_graphic').setScrollFactor(0).setScale(2.0);

    this.add.text(180, 330, "All in a day's work....",
    {
      fontFamily: "monospace",
      fontSize: "25px",
      fill: "white"
    }
  );

    this.tweens.add({
        targets: this.black,
        alpha: 1,
        duration: 20000
    });

    this.time.addEvent({
      delay: 20000,
      repeat: 0,
      callback: () => {
        
        game.sound.stopAll();
        this.scene.start('Credits');
      }
    });
}

}