/*===================================================*\
 * Requires
\*===================================================*/
var JClass = require('jclass');

/*===================================================*\
 * 'Constants'
\*===================================================*/
var DEFAULT_HISTORY_MAX = 10,
  START_WEIGHT = 0.3333,
  WEIGHTING = 0.6666;

/*===================================================*\
 * LatencySampler()
\*===================================================*/
var LatencySampler = JClass._extend({
  /*=========================*\
   * Properties
  \*=========================*/
  getLatency: function() {
    if (this.dirty)
    {
      // Returns a weighted average latency.
      // Item at ix 0 has weight of 1 and item at ix length has weight of length.
      var _latency = 0, perc = 0;

      var weights = [START_WEIGHT];

      for (var i = 0; i < this.stack.length; i++)
      {
        perc += weights[i];
        weights[i+1] = weights[i] * WEIGHTING;
      }

      weights[0] += 1.0 - perc;
      perc += 1.0 - perc;
      weights.reverse();

      this.stack.forEach(function (l, i) {
        _latency += l * weights[i];
      });

      if (this.debug)
        console.log('LATENCY', _latency);

      this._latency = _latency;
    }

    return this._latency;
  },
  getNow: function() {
    return (new Date()).getTime();
  },
  /*=========================*\
   * Constructor
  \*=========================*/
  init: function() {
    this.debug = false;
    this.stack = [];
    this._latency = NaN;
    maxStackLength = DEFAULT_HISTORY_MAX;
    lastTestTime = {};
    lastLatencySampleTime= -1;
    latencySample = -1;
  },
  /*=========================*\
   * Public Methods
  \*=========================*/
  sample: function (callback, count) {
    var self = this,
      i = 0;
      count = count || 1;

    ping();

    function ping() {
      self.__start();
      callback(pingHandler, false);
    }

    function pingHandler() {
      self.__end();
      (++i < count) ? ping() : callback(null, true);
    }
  },
  reset: function () {
    this.stack = [];
  },
  /*=========================*\
   * Private Methods
  \*=========================*/
  __start: function (key) {
    this.lastTestTime[key] = this.now;
  },
  __end: function (key) {
    var elapsed = this.now - this.lastTestTime[key];
    delete this.lastTestTime[key];

    if (this.debug)
      console.log('LATENCY', this.latency);

    this.__push(elapsed);
  },
  __push: function(latency) {
    this.stack.push(latency);

    while (this.stack.length > this.maxStackLength)
      this.stack.shift();

    if (this.lastLatencySampleTime == -1 || this.now - this.lastLatencySampleTime > 2000)
    {
      this.latencySample = this.latency;
      this.lastLatencySampleTime = this.now;
    }
  }
});

/*===================================================*\
 * Export (nodejs and browser agent)
\*===================================================*/
module.exports = LatencySampler;