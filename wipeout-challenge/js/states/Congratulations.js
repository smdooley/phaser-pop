var Wipeout = Wipeout || {};

Wipeout.CongratulationsState = {
  init: function(data) {
    this.score = data.score ? data.score : 0;
    this.time = data.time ? data.time : "00:00";
    this.bonus = data.seconds ? data.score * data.seconds : 0;
  },
  preload: function(){
    console.log('CongratulationsState', 'preload');
  },
  create: function(){
    console.log('CongratulationsState', 'create');

    var style = {font: '30px Arial', fill: '#fff'};
    this.add.text(this.game.width/2, this.game.height/2, 'CONGRATULATIONS!', style).anchor.setTo(0.5);

    style = {font: '20px Arial', fill: '#fff'};
    this.add.text(this.game.width/2, this.game.height/2 + 50, 'Your score: ' + this.score, style).anchor.setTo(0.5);
    this.add.text(this.game.width/2, this.game.height/2 + 100, 'Your time: ' + this.time, style).anchor.setTo(0.5);
    this.add.text(this.game.width/2, this.game.height/2 + 150, 'Bonus: ' + this.bonus, style).anchor.setTo(0.5);
  }
}
