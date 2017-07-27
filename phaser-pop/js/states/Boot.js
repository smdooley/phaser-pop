var PhaserPop = PhaserPop || {};

PhaserPop.BootState = {
  init: function(){
    console.log('BootState', 'init');

    // set max pointers
    this.input.maxPointers = 1;

    // set background colour
    this.game.stage.backgroundColor = "#EB3232";

    // set scaling option
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // center the game in the screen
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // set the physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  preload: function(){
    console.log('BootState', 'preload');
  },
  create: function(){
    console.log('BootState', 'create');
    this.game.state.start('Preload');
  }
}
