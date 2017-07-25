var Wipeout = Wipeout || {};

/**
TODO clock time is being taken from start of whole app and not just GameState
**/

Wipeout.GameState = {
  
  init: function(){
    console.log('GameState', 'init');

    // constants

    // no gravity in a top-down game
    this.game.physics.arcade.gravity.y = 0;
  },
  preload: function(){

  },
  create: function(){

    // set background
    // this.background = this.add.sprite(0, 0, 'background');
    this.background = this.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'background');
    this.background.anchor.setTo(0.5);

    // pool of germs
    this.germs = this.add.group();

    // initialize sounds
    this.hitSound = this.add.audio('hit');

    // initialize timer
    this.remainingSeconds = 30;
    this.timer = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
    this.createTimer();

    // load level from json
    this.loadLevel();
  },
  update: function(){
  },
  render: function() {
    // this.game.debug.text(this.game.time.totalElapsedSeconds(), 32, 32);
  },
  loadLevel: function(){
    // load level data from JSON
    this.levelData = JSON.parse(this.game.cache.getText('data'));

    // initialize variables
    this.killedGerms = 0;
    this.numGerms = this.levelData.germs.length;

    // load enemies from JSON
    this.levelData.germs.forEach(function(element, index){
      //this.addGerm(element.x, element.y, { "asset": element.asset, "health": element.health, "frame": element.frame });
      this.addGerm(element.x, element.y, element);
    }, this);
  },
  createTimer: function(){
    var time = this.secondsToTime(this.remainingSeconds);

    this.timeLabelBackground = this.game.add.graphics();
    this.timeLabelBackground.beginFill(0x3C8D0D, 1);
    this.timeLabelBackground.drawRect(0, 0, 108, 32);

    this.timeLabel = this.game.add.text(8, 8, "Time: " + time.m + ":" + time.s, {font:"16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"});
    this.timeLabel.anchor.set(0, 0);
    //this.timeLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    //this.timeLabel.align = "center";
    //this.timeLabel.setTextBounds(0, 0, 180, 16);
  },
  tick: function() {
    // update remaining time accordingly
    this.remainingSeconds--;

    // check if any time is remaining
    if(this.remainingSeconds < 0) {
      this.gameOver();
    }
    else {
      this.updateClock();
    }
  },
  updateClock: function() {
    // get remaining time
    var time = this.secondsToTime(this.remainingSeconds);

    // update time display
    this.timeLabel.text = "Time: " + time.m + ":" + time.s;
  },
  secondsToTime: function(seconds) {
    // round seconds for the following calculations
    var secs = Math.round(seconds);

    // calculate hour
    var hours = Math.floor(secs / (60 * 60));

    // calculate minutes
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    // calculate seconds
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    // set time object
    var obj = {
        "h": hours,
        "m": (minutes < 10) ? "0" + minutes : minutes,
        "s": (seconds < 10) ? "0" + seconds : seconds
    };

    // return time object
    return obj;
  },
  addGerm: function(x, y, data){
    // get first dead enemy from pool
    var element = this.germs.getFirstDead();

    // IF no dead enemies, create new enemy ELSE reset dead enemy
    if(!element) {
      element = new Wipeout.Germ(this, x, y, data);
      this.germs.add(element);
    }
    else {
      element.reset(x, y, data);
    }

    return element;
  },
  hitGerm: function(germ) {

    // play hit sound
    this.hitSound.play();

    // increment enemy damage
    germ.damage(1);

    // if enemy is dead
    if(!germ.alive) {
      // increment killed enemies
      this.killedGerms++;

      // if all enemies are dead load next state
      if(this.killedGerms == this.numGerms){
        this.congratulations();
      }
    }
  },
  congratulations: function() {
    this.game.state.start(
      "Congratulations",
      Phaser.Plugin.StateTransition.Out.SlideRight,
      Phaser.Plugin.StateTransition.In.SlideRight,
      true,
      false,
      {
        score: this.killedGerms,
        time: this.timeLabel.text,
        seconds: this.remainingSeconds
      });
  },
  gameOver: function() {
    this.game.state.start(
      "GameOver",
      Phaser.Plugin.StateTransition.Out.SlideLeft,
      Phaser.Plugin.StateTransition.In.SlideLeft,
      true,
      false,
      {
        score: this.killedGerms,
        time: this.timeLabel.text,
        seconds: this.remainingSeconds
      });
  }
}
