var PhaserPop = PhaserPop || {};

PhaserPop.PreloadState = {
  preload: function(){
    "use strict";

    console.log('PreloadState', 'preload');

    // load asset pack
    this.load.pack("data", "assets/assets-pack.json");
  },
  create: function(){
    "use strict";
    
    console.log('PreloadState', 'create');
    this.game.state.start('Title');
  }
}
