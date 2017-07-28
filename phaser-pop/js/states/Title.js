var PhaserPop = PhaserPop || {};

PhaserPop.TitleState = {
  init: function(){
    "use strict";

    console.log('TitleState', 'init');
  },
  create: function(){
    "use strict";

    console.log('TitleState', 'create');

    this.game.state.start('Game');
  },
  startGame: function() {
    "use strict";

    console.log('TitleState', 'startGame');
    
    //this.game.state.start('Game');
  }
}
