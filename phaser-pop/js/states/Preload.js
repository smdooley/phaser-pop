var PhaserPop = PhaserPop || {};

PhaserPop.PreloadState = {
  preload: function(){
    console.log('PreloadState', 'preload');

    // load asset pack
    this.load.pack("data", "assets/assets-pack.json");
  },
  create: function(){
    console.log('PreloadState', 'create');
    this.game.state.start('Title');
  }
}
