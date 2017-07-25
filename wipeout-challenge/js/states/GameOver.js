var Wipeout = Wipeout || {};

Wipeout.GameOverState = {
  init: function(data) {
    this.score = data.score ? data.score : 0;
    this.time = data.time ? data.time : "00:00";
  },
  preload: function(){
    console.log('GameOverState', 'preload');
  },
  create: function(){
    console.log('GameOverState', 'create');

    var style = {font: '30px Arial', fill: '#fff'};
    this.add.text(this.game.width/2, this.game.height/2, 'GAME OVER!', style).anchor.setTo(0.5);

    style = {font: '20px Arial', fill: '#fff'};
    this.add.text(this.game.width/2, this.game.height/2 + 50, 'Your score: ' + this.score, style).anchor.setTo(0.5);
    this.add.text(this.game.width/2, this.game.height/2 + 100, 'Your time: ' + this.time, style).anchor.setTo(0.5);
  }
}
