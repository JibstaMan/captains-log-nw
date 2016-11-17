/**
 * Module dependencies.
 */

var rc = require('rc');
var DEFAULT = require('./defaults');
var _defaultsDeep = require('merge-defaults');

/**
 * By default, look for configuration in:
 *   + `.captainslogrc` files
 *   + `CAPTAINSLOG-*` env variables
 *
 * More on `rc` conventions:
 * https://github.com/dominictarr/rc#standards
 *
 * Special overrides:
 *    + overrides.ignoreCLIArgs
 *      -> ignore --verbose, --silent, and --silly
 *    + overrides.rc
 *      -> custom rc prefix to use
 *         (or `false` to disable rc conf completely)
 *      -> defaults to 'captainslog'
 *
 * @api private
 */

module.exports = function(overrides) {

  // Overrides passed in programmatically always
  // take precedence.
  overrides = _defaultsDeep({}, overrides || {}, DEFAULT.OVERRIDES);


  // Then `rc` configuration conventions.
  // (https://github.com/dominictarr/rc#standards)
  var rconf;
  if (overrides.rc === false) {
    rconf = {};
  } else {
    rconf = rc(overrides.rc);

    if (!overrides.ignoreCLIArgs) {
      rconf.level = rconf.level || // Accept command-line shortcuts:
      rconf.verbose ? 'verbose' : // --verbose
      rconf.silent ? 'silent' : // --silent
      rconf.silly ? 'silly' : // --silly
      undefined;
    }
  }

  // Combine overrides and rc config into `options`
  var options = _defaultsDeep(overrides, rconf);


  // If `prefixes` were not explicitly set in user config
  // check the options to apply the prefixes.
  if (options.prefixes === undefined) {

    options.prefixes = {};

    // Use prefixTheme if specified
    var prefixTheme = (options.prefixTheme || DEFAULT.OPTIONS.prefixTheme);
    var prefixes = DEFAULT.OPTIONS.prefixes;
    if (prefixTheme) {
      prefixes = (options.prefixThemes || DEFAULT.OPTIONS.prefixThemes)[prefixTheme];
    }
    options.prefixes = prefixes;
  }

  // Then mix in the rest of the implicit default.
  // (DEFAULT.OPTIONS above)
  _defaultsDeep(options, DEFAULT.OPTIONS);


  return options;
};
