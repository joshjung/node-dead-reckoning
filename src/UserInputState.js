/*===================================================*\
 * Requires
\*===================================================*/
var JClass = require('jclass');

/*===================================================*\
 * UserInputState()
\*===================================================*/
var UserInputState = JClass._extend({
  /*=========================*\
   * Constructor
  \*=========================*/
  init: function(input, time, latency) {
    this.input = input;
    this.time = time;
    this.latency = latency;
  }
});

/*===================================================*\
 * Exports
\*===================================================*/
module.exports = UserInputState;