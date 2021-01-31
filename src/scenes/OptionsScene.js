import 'phaser';
 
export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }
 
  preload () {
    // Need to load anything not previously loaded

  } // --> Preload
 
  create () {
        

    this.add.image(390, 150, 'optiontext');
    this.add.text(325, 240, 'Music',
      {
        fontFamily: "monospace",
        fontSize: "40px",
        fill: "white"
      }
    );
    this.add.text(325, 310, 'Sound',
    {
      fontFamily: "monospace",
      fontSize: "40px",
      fill: "white"
    }
  );

  let music_on = true;
  let sfx_on = true;


  const music_toggle_off = this.add.image(490, 260, 'checkbox').setScale(.8).setInteractive();
  const sound_toggle_off = this.add.image(490, 330, 'checkbox').setScale(.8).setInteractive();
  const music_toggle_on = this.add.image(490, 260, 'checked').setScale(.8).setInteractive();
  const sound_toggle_on = this.add.image(490, 330, 'checked').setScale(.8).setInteractive();


  const back_button = this.add.image(390, 450, 'back').setInteractive();

        // Click buttons
        music_toggle_on.on('pointerdown', () => {
          if (music_on){
            music_on = false;
            music_toggle_on.setAlpha(0);
            // Also disable music here
          }
        });
        sound_toggle_on.on('pointerdown', () => {
          if (sfx_on){
            sfx_on = false;
            sound_toggle_on.setAlpha(0);
            // Also disable sfx here
          }
        });

        music_toggle_off.on('pointerdown', () => {
          if (!music_on){
            music_on = true;
            music_toggle_on.setAlpha(1);
            // Also enable music here
          }
        });
        sound_toggle_off.on('pointerdown', () => {
          if (!sfx_on){
            sfx_on = true;
            sound_toggle_on.setAlpha(1);
            // Also enable sfx here
          }
        });
        
        // Go Back
        back_button.on('pointerover', () => {
          back_button.setScale(1.1);
        });
        
        back_button.on('pointerout', () => {
          back_button.setScale(1);
        });

        back_button.on('pointerdown', () => {
          
          this.scene.start('Title');
        });
  
  } // --> Create
};