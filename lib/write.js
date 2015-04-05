/**
 * Module dependencies.
 */

var _ = require('lodash');
var util = require('util');
var DEFAULT = require('./defaults');


/**
 * Build a log function. This function will not execute when the
 * configured log level is higher as the value of logAt. If
 * specified, prefixes will be added and colors will be applied.
 *
 * @param  {Function} logFn  [log fn]
 * @param  {String} logAt    [e.g. 'silly' or 'error']
 * @param  {Object} options
 *
 * @return {Function}        [enhanced log fn]
 * @api private
 */

var write = module.exports = function (logFn, logAt, options) {

  // We're using this same method to expore other console methods
  // like console.group();
  // in those cases logFn well be a string.
  var consoleMethod = (typeof logFn == "string");
  if (consoleMethod) {
    logFn = console[logFn].bind(console);
  }

  var _CallableLogFn = function _writeLogToConsole() {

    // Check `options.level` against logAt
    // to see whether to write the log.
    // ( silly = 0 | silent = highest )
    var lvlMap = options.logLevels;
    var configuredLvl = options.level;
    if (lvlMap[logAt] < lvlMap[configuredLvl]) return;

    var args = Array.prototype.slice.call(arguments);

    /////////////////////////////////////////////////////////////////
    // Using the https://developer.chrome.com/devtools/docs/console-api
    // it is possible to specify css to style the log output.
    // This requires that the second argument is a css string.
    //
    // The defaults only specify a color, but it is possible to
    // add other styles, like font-size and background-color.
    //
    // It's not necessary to concat everything into a string (which
    // was what captains-log did by default), since devtools can
    // easily show objects and arrays by itself in a tree view.
    /////////////////////////////////////////////////////////////////

    // include the appropriate prefix if specified
    var prefixStr = (options.prefixes && options.prefixes[logAt]) || '';

    if (typeof args[0] == "string") {
      var str = prefixStr + args[0];
      if (options.colors) {
        // include %c so the color will be applied
        str = "%c" + str;
        // specify the color as css as second argument.
        args.splice(1, 0, options.colors[logAt]);
      }
      args[0] = str;
    }

    // Call log fn
    return logFn.apply(logFn, args);
  };

  if (!consoleMethod) {

    // Min-in console specific methods.
    DEFAULT.CONSOLE.forEach(function (method) {
      _CallableLogFn[method] = write(method, logAt, options);
    });

  }

  return _CallableLogFn;
};
