var Wipeout = Wipeout || {};

Wipeout.TitleState = {
  init: function(){
    console.log('TitleState', 'init');
  },
  create: function(){
    console.log('TitleState', 'create');

    this.title = this.add.sprite(this.game.world.width / 2, -(this.game.world.height / 2), "title");
    this.title.scale.set(0.5);
    this.title.anchor.set(0.5);
    //this.title.scale.setTo(0.5, 0.5);

    var titleTween = this.game.add.tween(this.title)
      .to({
        y: this.game.world.height / 2
      }, 500, "Linear", true, 0, 0, false);
    titleTween.start();

    var style = {font: "16px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: this.game.world.width, align: "center"};
    var text = this.add.text(
      this.game.width/2,
      this.game.height/2,
      'Spot the germs and keep clicking until each area is germ free and all the nasties have been banished.\n\nSee the sparkle and fragrance appear as each area is complete.',
      style
    )
    .anchor.setTo(0.5);

    this.buttonBegin = this.game.add.button(this.game.world.width / 2, this.game.world.height / 1.25, "button-begin", this.startGame);
    this.buttonBegin.anchor.setTo(0.5);
    this.buttonBegin.scale.setTo(0.5);

    // var tween = this.game.add.tween(this.buttonBegin).to({
    //   width: 254,
    //   height: 47
    // }, 1500, "Linear", true, 0, -1);
    // tween.yoyo(true);
  },
  startGame: function() {
    //this.game.state.start('Game');
    this.game.state.start("Game", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
  }
}
