/**
 * Module dependencies.
 */

var write = require('./write');
var DEFAULT = require('./defaults');

/**
 * Return a special version of `logger` which may
 * be called directly as a function (implicitly calls
 * `logger.debug` behind the scenes)
 *
 * @param  {Object} logger [original logger]
 * @return {Function}      [callable Logger]
 * @api private
 */

module.exports = function _wrap ( logger, options ) {

	// Make base logger callable (debug)
	var _CallableLogger = write(logger.debug, 'debug', options);

	// Mix-in log methods, but run `write`
	// on their arguments to improve the readability
	// of log output.
	DEFAULT.METHODS.forEach(function (logAt) {
		_CallableLogger[logAt] = write(logger[logAt], logAt, options);
	});

  var c = options.console || console;
  // Min-in console specific methods.
  DEFAULT.CONSOLE.forEach(function (method) {
    _CallableLogger[method] = c[method].bind(c);
  });

  // expose the level property on the logger, so it's
  // possible to change it dynamically, without recreating
  // the logger object.
  Object.defineProperty(_CallableLogger, 'level', {
    get: function()
    {
      return options.level;
    },
    set: function(value)
    {
      options.level = value;
    }
  });

	return _CallableLogger;
};
