/*===================================================*\
 * Requires
\*===================================================*/
var JClass = require('jclass'),
  UserInputState = require('./UserInputState'),
  LatencySampler = require('./LatencySampler');

/*===================================================*\
 * DeadReckoning()
\*===================================================*/
var DeadReckoning = JClass.extend({
  /*===========================*\
   * Public Properties
  \*===========================*/
  setServerState: function (value) {
    this.newServerState = value;
  },
  /*===========================*\
   * Private Properties
  \*===========================*/
  __getNow: function() {
    return (new Date()).getTime();
  },
  /*===========================*\
   * Constructor
  \*===========================*/
  /**
   * gameInterface is expected to have (* indicates optional):
   *
   * fps: the frames per second that the dead reckoning algorithm should perform on the client.
   * latencySampleCount: the number of latency samples to take on startup.
   * sampleLatency: `function (callback)` to call for checking latency with server. Invoke `callback`
   *       without arguments when a ping response is heard.
   * sampleLatencyCompletedHandler*: `function ()` called when the latency sampling is done. If this returns
   *       false, then the DeadReckoning object does NOT begin.
   * getUserInput: `function ()` that returns a game proprietary object (structure does not matter) of game input state (keyboard, mouse, etc.)
   * setState: `function (value)` that allows this DeadReckoning object to set state of the game's world on the client.
   *       This will be set exactly to what the server sends.
   * simulateUpdate: `function (userInput, elapsed)` A function that the DeadReckoning can call to tell the client to simulate updating
   *       the game's entire world for `elapsed` time if the user input were `userInput`.
   * updateServer: `function (userInputState)` to send user input information to the server.
   */
  init: function(gameInterface) {
    this.gameInterface = gameInterface;

    this.userInputStates = [];
    this.lastUpdateTimeEnd = undefined;
    this.estServerTime = (new Date()).getTime();
    this.lastServerState = undefined;
    this.intervalId = undefined;
    this.lastSendToServerTime = 1000.0 / 30.0;
    this.started = false;

    /**
     * Send an update to the server every this so often.
     */
    this.serverUpdateInterval = 10;

    this.latencySampler = new LatencySampler();
    this.frameTime = 1000.0 / gameInterface.fps;
  },
  /*===========================*\
   * Public Methods
  \*===========================*/
  start: function (initialState) {
    this.started = true;
    this.newServerState = initialState;

    var self = this,
      __intervalHandler = self.__intervalHandler.bind(this);

    // First we sample latency from the server before beginning.
    this.latencySampler.sample(function (callback, done) {
      if (done)
      {
        var cont = true;

        if (self.gameInterface.sampleLatencyCompletedHandler)
          cont = self.gameInterface.sampleLatencyCompletedHandler();

        if (cont)
        {
          console.log('DEAD RECKONING: starting interval frameTime:', self.frameTime);
          self.intervalId = setInterval(__intervalHandler, self.frameTime);
        }

        return;
      }

      self.gameInterface.sampleLatency(callback);
    }, this.gameInterface.latencySampleCount);
  },
  pause: function () {
    if (this.intervalId)
      clearInterval(this.intervalId);
  },
  reset: function () {
    this.pause();

    this.userInputStates = [];
    this.lastUpdateTimeEnd = undefined;
    this.estServerTime = (new Date()).getTime();
    this.lastServerState = undefined;
    this.intervalId = undefined;
    this.lastSendToServerTime = 1000.0 / 30.0;
  },
  /*===========================*\
   * Private Methods
  \*===========================*/
  __update: function ()
  {
    if (this.newServerState)
    {
      this.lastServerState = this.newServerState;
    }

    // As long as the server has never sent us a state, we do nothing.
    if (!this.lastServerState || this.latencySampler.getLatency() == 0)
      return;

    var self = this,
      // Time this update started
      updateStart = this.__getNow(),
      // Time since our last update ended
      elapsed = updateStart - this.lastUpdateTimeEnd,
      // The state of all user input
      userInput = this.gameInterface.getUserInput();

    this.lastUpdateTimeEnd = this.__getNow();

    // Set last server state to either the update
    this.lastServerState = this.newServerState || this.lastServerState;

    // Update game interface to old server state
    this.gameInterface.setState(this.lastServerState);

    // Estimate the current server time at this exact point (the server will be behind us by a period of time)
    this.estServerTime = Math.round(this.newServerState ? this.newServerState.time + (this.latencySampler.getLatency() / 2.0) : this.estServerTime + elapsed);

    // Establish our simulation starting time.
    var t = this.lastServerState.time,
      simElapsed = 0.0;

    // Filter out any old user frame states
    this.userInputStates = this.userInputStates.filter(function (userInputState) {
      return userInputState.time > self.lastServerState.time;
    });

    // Simulate all frames the server has not yet processed.
    this.userInputStates.forEach(function (userInputState) {
      simElapsed = userInputState.time - t;
      self.gameInterface.simulateUpdate(userInputState.input, simElapsed);
      t = userInputState.time;
    });

    // Save our current state
    var newUserInputState = new UserInputState(userInput, this.estServerTime);
    this.userInputStates.push(newUserInputState);

    // Finish simluating the remaining milliseconds based on the current user input.
    this.gameInterface.simulateUpdate(newUserInputState.input, this.estServerTime - t);


    if (this.estServerTime - this.lastSendToServerTime > this.serverUpdateInterval)
    {
      // Send our state to the server
      this.gameInterface.updateServer(newUserInputState);

      this.lastSendToServerTime = this.estServerTime;
    }

    // We have processed it, so throw it away.
    this.newServerState = undefined;
  },
  /*===========================*\
   * Events
  \*===========================*/
  __intervalHandler: function () {
    this.__update();
  }
});

/*===================================================*\
 * Exports
\*===================================================*/
module.exports = DeadReckoning;