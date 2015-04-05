/**
 * Return a default logger which writes to console.log, console.info,
 * console.debug, console.warn and console.error from the devtools.
 *
 * @return {Function} [enhanced log fn]
 * @api private
 */
module.exports = function LowLevelLogger ( ) {

  var _stdout = console.log.bind(console);
  var _strinfo = console.info.bind(console);
  var _strdebug = console.debug.bind(console);
  var _strwarn = console.warn.bind(console);
  var _stderr = console.error.bind(console);


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
