var PhaserPop = PhaserPop || {};

PhaserPop.TitleState = {
  init: function(){
    console.log('TitleState', 'init');
  },
  create: function(){
    console.log('TitleState', 'create');
    this.game.state.start('Game');
  },
  startGame: function() {
    console.log('TitleState', 'startGame');
    //this.game.state.start('Game');
  }
}
