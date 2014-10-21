(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./src/DeadReckoning');
},{"./src/DeadReckoning":4}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
(function (process,global){
/*!
 * JavaScript Inheritance with Private Members
 * Largely based upon John Resig's inheritance technique,
 * (see http://ejohn.org/blog/simple-javascript-inheritance/)
 * that was inspired by base2 and Prototype.
 *
 * Works with and without node.
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 *
 * v2.0.4, Marcel Rieger, 2013
 * https://github.com/riga/jclass
 * https://npmjs.org/package/jclass
 */
var ns,nsKey;
if(typeof global!=="undefined"&&typeof process!=="undefined"&&typeof module!=="undefined"&&module.exports){ns=module;nsKey="exports";}else{if(typeof window!=="undefined"){ns=window;
nsKey="JClass";}}(function(d,f){var b=d[f];var a={extendable:true,ctorName:"init",superName:"_super",enablePrivacy:true,privatePattern:/^__.+/,tracking:true,privateName:"__",methodsKey:"_jcMethods_",depthKey:"_jcDepth_",callerDepthKey:"_jcCallerDepth_"};
var c=false;var e=function(){};e.extend=function(m,g){g=g||{};for(var q in a){if(g[q]===undefined){g[q]=a[q];}}if(!g.enablePrivacy){g.privatePattern=null;
g.privateName=null;}var r=this.prototype;c=true;var o=new this();c=false;o[g.depthKey]=r[g.depthKey]||0;o[g.depthKey]++;var k=o[g.depthKey];var i={};var j={};
var s={};for(var h in m){if(m[h] instanceof Function){var n=(function(t,u){return function(){var v=this[g.superName];if(!g.privatePattern||!g.privatePattern.test(t)){this[g.superName]=r[t];
}var D;if(g.privateName){D=this[g.privateName];this[g.privateName]=D||s;}var y,E,x,I;if(g.privatePattern){if(this[g.callerDepthKey]===undefined){this[g.callerDepthKey]=k;
}y=this[g.methodsKey];if(t==g.ctor){this[g.methodsKey]=y||i;for(var z in i){if(!this[g.methodsKey][z]){this[g.methodsKey][z]={};}this[g.methodsKey][z][k]=i[z][k];
var C=this[g.methodsKey][z][k];this[g.methodsKey][z][k]=function(){var K=this[g.superName];this[g.superName]=this[g.methodsKey][z][k-1];var J=C.apply(this,arguments);
this[g.superName]=K;return J;};}i=this[g.methodsKey];}else{this[g.methodsKey]=i;}E={};for(var z in this[g.methodsKey]){E[z]=this[z];var F=Math.max.apply(Math,Object.keys(i[z]));
this[z]=i[z][F];}if(g.tracking){x={};for(var G in j){x[G]=this[G];this[G]=j[G];}}if(g.tracking){I=Object.keys(this);}}var B=u.apply(this,arguments);if(g.privatePattern){if(g.tracking){var H=Object.keys(this);
for(var G in H){G=H[G];if(g.privatePattern.test(G)){x[G]=this[G];j[G]=this[G];}}for(var G in I){G=I[G];var A=H.indexOf(G)<0&&g.privatePattern.test(G);if(A){delete j[G];
delete this[G];}}for(var G in j){var w=this[g.callerDepthKey];if(x[G]===undefined||k==w){delete this[G];}else{this[G]=x[G];}}}for(var G in this[g.methodsKey]){if(E[G]===undefined){delete this[G];
}else{this[G]=E[G];}}if(y===undefined){delete this[g.methodsKey];}else{this[g.methodsKey]=y;}if(k==this[g.callerDepthKey]){delete this[g.callerDepthKey];
}}if(g.privateName){if(D===undefined){delete this[g.privateName];}else{this[g.privateName]=D;}}if(v===undefined){delete this[g.superName];}else{this[g.superName]=v;
}return B;};})(h,m[h]);var l=g.privatePattern&&g.privatePattern.test(h);if(l){i[h]={};i[h][k]=n;}else{o[h]=n;}}else{var l=g.tracking&&g.privatePattern&&g.privatePattern.test(h);
if(l){j[h]=m[h];}else{o[h]=m[h];}}}function p(){if(!c&&this[g.ctorName]){this[g.ctorName].apply(this,arguments);}}p.prototype=o;p.prototype.constructor=p;
if(g.extendable!==false){p.extend=arguments.callee;}return p;};e.noConflict=function(){var g=d[f];d[f]=b;return g;};d[f]=e;})(ns,nsKey);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":2}],4:[function(require,module,exports){
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
    this.lastServerState = value;
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
    this.estServerTime = undefined;
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

    var self = this;

    // First we sample latency from the server before beginning.
    this.latencySampler.sample(function (callback, done) {
      if (done)
      {
        var cont = true;

        if (self.gameInterface.sampleLatencyCompletedHandler)
          cont = self.gameInterface.sampleLatencyCompletedHandler();

        if (cont)
          self.intervalId = setInterval(self.__intervalHandler.bind(this), self.frameTime);

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
    this.estServerTime = undefined;
    this.lastServerState = undefined;
    this.intervalId = undefined;
    this.lastSendToServerTime = 1000.0 / 30.0;
  },
  /*===========================*\
   * Private Methods
  \*===========================*/
  __update: function ()
  {
    if (this.newServerState && !this.lastServerState)
      this.lastServerState = this.newServerState;

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
},{"./LatencySampler":5,"./UserInputState":6,"jclass":3}],5:[function(require,module,exports){
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
var LatencySampler = JClass.extend({
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

      this.dirty = false;
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
    this.dirty = false;
  },
  /*=========================*\
   * Public Methods
  \*=========================*/
  sample: function (callback, count) {
    var self = this,
      __start = this.__start.bind(this),
      __end = this.__End.bind(this),
      i = 0;
      count = count || 1;

    ping();

    function ping() {
      console.log('ping', i);
      __start('sample' + i);
      callback(pingHandler, false);
    }

    function pingHandler() {
      __end('sample' + i);
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

    this.dirty = true;

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
},{"jclass":3}],6:[function(require,module,exports){
/*===================================================*\
 * Requires
\*===================================================*/
var JClass = require('jclass');

/*===================================================*\
 * UserInputState()
\*===================================================*/
var UserInputState = JClass.extend({
  /*=========================*\
   * Constructor
  \*=========================*/
  init: function(input, time) {
    this.input = input;
    this.time = time;
  }
});

/*===================================================*\
 * Exports
\*===================================================*/
module.exports = UserInputState;
},{"jclass":3}]},{},[1]);
