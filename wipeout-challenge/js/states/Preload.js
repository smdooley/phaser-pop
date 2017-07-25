var Wipeout = Wipeout || {};

Wipeout.PreloadState = {
  preload: function(){
    console.log('PreloadState', 'preload');

    // load asset pack
    this.load.pack("level", "assets/assets-pack.json");
  },
  create: function(){
    console.log('PreloadState', 'create');
    this.state.start('Title');
  }
}
