/**
 * Implicit defaults.
 * (OPTIONS and OVERRIDES)
 *
 * @type {Object}
 * @api private
 */

var DEFAULTS = {

  OPTIONS: {

    level: 'info',

    logLevels: {

      silly  : 0,
      verbose: 1,
      info   : 2,
      blank  : 2,
      debug  : 3,
      warn   : 4,
      error  : 5,
      crit   : 6,
      silent : 7
    },

    globalizeAs: false,


    // If defined, uses a prefixTheme as default
    prefixTheme: 'traditional',


    // Different built-in prefix themes:
    prefixThemes: {
      traditional: {
        silly  : 'silly: ',
        verbose: 'verbose: ',
        info   : 'info: ',
        blank  : '',
        debug  : 'debug: ',
        warn   : 'warn: ',
        error  : 'error: ',
        crit   : 'CRITICAL: '
      },
      abbreviated: {
        silly  : '[~] ',
        verbose: '[v] ',
        info   : '[i] ',
        blank  : '',
        debug  : '[d] ',
        warn   : '[!] ',
        error  : '[!] ',
        crit   : '[CRITICAL] '
      },
      moderate   : {
        silly  : '[silly] ',
        verbose: '[verbose] ',
        info   : '    ',
        blank  : '',
        debug  : '[-] ',
        warn   : '[!] ',
        error  : '[err] ',
        crit   : '[CRITICAL] '
      },
      aligned    : {
        silly  : 'silly   | ',
        verbose: 'verbose | ',
        info   : 'info    | ',
        blank  : '',
        debug  : 'debug   | ',
        warn   : 'warning | ',
        error  : 'error   | ',
        crit   : 'CRITICAL| '
      }
    }

    // The `prefixTheme` option is really just shorthand that allows
    // for configuring a set of log-level-specific prefix settings.
    // If specified, the following, lower-level `prefix` option overrides
    // the themes above:
    // prefix: '||| '

  },

  OVERRIDES: {
    rc           : 'captainslog',
    ignoreCLIArgs: false,

    // (only used if prefixes are not explicitly set)
    // it is possible to write css strings here.
    // e.g. crit: 'color: red; font-weight: 600; font-size: 18px; text-transform: uppercase'
    colors: {
      silly  : 'color:gold',
      input  : 'color:black',
      verbose: 'color:cyan',
      prompt : 'color:grey',
      info   : 'color:green',
      blank  : 'color:white',
      data   : 'color:grey',
      help   : 'color:cyan',
      warn   : 'color:darkorange',
      debug  : 'color:blue',
      error  : 'color:red',
      crit   : 'color:red'
    }
  },

  // Log methods to expose
  METHODS: ['crit', 'error', 'warn', 'debug', 'info', 'blank', 'verbose', 'silly'],
  // console methods to expose
  CONSOLE: ['clear', 'group', 'groupCollapsed', 'groupEnd', 'count', 'table',
    'time', 'timeEnd', 'timeStamp']
};


module.exports = DEFAULTS;
