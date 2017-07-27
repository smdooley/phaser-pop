var PhaserPop = PhaserPop || {};

PhaserPop.Enemy = function(state, x, y, data){
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  // store variables for reference
  this.state = state;
  this.game = state.game;

  this.health = data.health;

  // set anchor
  this.anchor.setTo(0.5);
  this.scale.setTo(0.5);

  // enable input
  this.inputEnabled = true;

  // set input callback event
  this.events.onInputDown.add(this.state.hitEnemy, this.state);

  // enable physics
  this.game.physics.arcade.enable(this);

  this.body.gravity.y = -this.game.rnd.between(150, 200);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  this.reset(x, y, data);
};

PhaserPop.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
PhaserPop.Enemy.prototype.constructor = PhaserPop.Enemy;

PhaserPop.Enemy.prototype.reset = function(x, y, data) {
  Phaser.Sprite.prototype.reset.call(this, x, y, data.health);

  // load texture
  this.loadTexture(data.asset);

  // set start frame
  this.frame = data.frame;
}

PhaserPop.Enemy.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);

  // initialize emitter

  // set attacked tween
  var attackedTween = this.game.add.tween(this);
  attackedTween.to({tint: 0xFF0000}, 200);
  attackedTween.onComplete.add(function(){
    this.tint = 0xFFFFFF;
  }, this);
  attackedTween.start();

  // IF dead THEN kill
  if(this.health <= 0) {
    this.kill();
  }
}
