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

    // setup timer
    // this.startTime = new Date();
    // this.totalTime = 30;
    // this.timeElapsed = 0;
    //
    this.createTimer();
    //
    // this.gameTimer = this.game.time.events.loop(100, function(){
    //   this.updateTimer();
    // }, this);

    this.gameTimer = this.game.time.events.loop(1000, function(){
      this.updateClock();
    }, this);

    // this.countdown = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, 'countdown', 1);
    //
    // this.countdownAnimation = this.countdown.animations.add('loop', [2,1,0]);
    // this.countdownAnimation.onComplete.add(function(){
    //   this.loadLevel();
    // }, this);
    // this.countdownAnimation.play();

    // load level from json
    this.loadLevel();
  },
  update: function(){
    // check if time has elpapsed
    // if(this.timeElapsed >= this.totalTime) {
    //   this.gameOver();
    // }
  },
  render: function() {
    // this.game.debug.text(this.game.time.totalElapsedSeconds(), 32, 32);
    // var time = this.secondsToTime(this.game.time.totalElapsedSeconds());
    // this.game.debug.text(time.m + ":" + time.s, 32, 32);
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
    this.timeLabel = this.game.add.text(0, 0, "00:00", {font:"32px Arial", fill: "#fff"});
    this.timeLabel.anchor.setTo(0, 0);
    this.timeLabel.align = "center";
  },
  updateTimer: function(){
    var currentTime = new Date();
    var timeDifference = this.startTime.getTime() - currentTime.getTime();

    //Time elapsed in seconds
    this.timeElapsed = Math.abs(timeDifference / 1000);

    //Time remaining in seconds
    var timeRemaining = this.totalTime - this.timeElapsed;

    //Convert seconds into minutes and seconds
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = Math.floor(timeRemaining) - (60 * minutes);

    //Display minutes, add a 0 to the start if less than 10
    var result = (minutes < 10) ? "0" + minutes : minutes;

    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

    this.timeLabel.text = result;
  },
  updateClock: function() {
    var time = this.secondsToTime(this.game.time.totalElapsedSeconds());
    this.timeLabel.text = time.m + ":" + time.s;
  },
  secondsToTime: function(seconds) {
    var secs = Math.round(seconds);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": (minutes < 10) ? "0" + minutes : minutes,
        "s": (seconds < 10) ? "0" + seconds : seconds
    };
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
        time: this.timeLabel.text
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
        time: this.timeLabel.text
      });
  }
}
