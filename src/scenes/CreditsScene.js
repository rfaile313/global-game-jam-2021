import 'phaser';
 
export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }
 
  preload () {
  }
 
  create () {
    
    const back_button = this.add.image(390, 475, 'back').setInteractive();
    
    this.add.image(390, 150, 'credits');
    
    this.add.text(215, 200, 'Programming / Game Design',
      {
        fontFamily: "monospace",
        fontSize: "30px",
        fill: "red",
        fontWeight: "bold"
      }
    );
    this.add.text(295, 230, 'Rudy Faile',
    {
      fontFamily: "monospace",
      fontSize: "30px",
      fill: "white"
    }
  );
    this.add.text(295, 280, 'Art / Story',
    {
      fontFamily: "monospace",
      fontSize: "30px",
      fill: "cyan",
      fontWeight: "bold"
    }
  );
  this.add.text(275, 310, 'Ansley Partosa',
  {
    fontFamily: "monospace",
    fontSize: "30px",
    fill: "white"
  }
);
  this.add.text(215, 360, 'Music and Sound Wizard',
  {
    fontFamily: "monospace",
    fontSize: "30px",
    fill: "yellow",
    fontWeight: "bold"
  }
);
this.add.text(210, 390, 'Wesley S. Uchiyama-Penix',
{
  fontFamily: "monospace",
  fontSize: "30px",
  fill: "white"
}
);

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

  } // --> create
};