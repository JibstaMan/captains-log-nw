/**
 * Return a default logger which writes to console.log, console.info,
 * console.debug, console.warn and console.error from the devtools.
 *
 * @return {Function} [enhanced log fn]
 * @api private
 */
module.exports = function LowLevelLogger (options) {

  var c = options.console || console;
  
  var _stdout = c.log.bind(c);
  var _strinfo = c.info.bind(c);
  var _strdebug = c.debug.bind(c);
  var _strwarn = c.warn.bind(c);
  var _stderr = c.error.bind(c);


  // Emulate winston's output stream conventions
  // (so that existing tests will pass)
  return {
    crit: _stderr,
    error: _stderr,
    warn: _strwarn,
    debug: _strdebug,
    info: _strinfo,
    verbose: _stdout,
    silly: _stdout,
    blank: _stdout
  };

};
