/**
 * This example game client contains everything you need to implement the DeadReckoning object.
 *
 * This assumes that the `dest/dead-reckoning.js` file has been included in your client.
 *
 * For example implementation in a real-world project, please see my dependent project:
 *
 * [SkyDuel](http://www.github.com/joshjung/skyduel)
 */
 
var DeadReckoning = require('../src/DeadReckoning');

var GameClientSimulator = function () {
  this.fps = 60;
  this.latencySampleCount = 10;

  this.world = {
    airplane: {
      x: 0,
      y: 0,
      velocity: 10,
      angle: 0
    }
  };

  this.deadReckoning = new DeadReckoning({
    fps: this.fps,                              // REQUIRED
    latencySampleCount: this.latencySampleCount,// OPTIONAL
    sampleLatency: this.sampleLatency,          // REQUIRED
    sampleLatencyCompletedHandler: 
      this.sampleLatencyCompletedHandler,       // OPTIONAL
    getUserInput: this.getUserInput,            // REQUIRED
    setState: this.setState,                    // REQUIRED
    simulateUpdate: this.simulateUpdate,        // REQUIRED
    updateServer: this.updateServer             // REQUIRED
  });
};

GameClientSimulator.prototype = {
  // REQUIRED
  sampleLatency: function (callback) {
    this.simulatePingServer(function () {
      // All latency calculations are done by the dead reckoning object.
      callback();
    });
  },
  // OPTIONAL
  sampleLatencyCompletedHandler: function ()
  {
    var latency = this.deadReckoning.latencySampler.getLatency();

    if (latency > 500)
    {
      // Server is probably overloaded.
      alert('Server latency is too high! Refusing to connect.' + latency);

      // Tell the dead reckoning to stop.
      return false;
    }

    return true;
  },
  // REQUIRED
  getUserInput: function () {
    return {
      left: example_isLeftKeyDown(),
      right: example_isRightKeyDown(),
      up: example_isUpKeyDown(),
      down: example_isUpKeyDown()
    };
  },
  setState: function (value) {
    this.world = value;
  },
  simulateUpdate: function (userInput, elapsed) {
    // This would all be your own custom code
    this.world.player.x += Math.cos(this.world.player.angle) * this.world.player.velocity * elapsed;
    this.world.player.y += Math.sin(this.world.player.angle) * this.world.player.velocity * elapsed;
  },
  updateServer: function (userInput) {
    // Here you would just send the user input object above to the server.
    setTimeout(function () {
      console.log('server has been informed', userInput)
    }, 100);
  },
  simulatePingServer: function (callback) {
    setTimeout(function () {
      callback();
    }, 100)
  }
};

module.exports = GameClientSimulator;