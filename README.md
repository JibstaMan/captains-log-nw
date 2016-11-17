# captains-log-nw

The lightweight logger from [SailsJS](http://github.com/balderdashy/sails) now made ready for [NW](https://github.com/nwjs/nw.js). Optional support for colorized output, custom prefixes and log levels (using [npm's logging conventions](https://github.com/isaacs/npmlog#loglevelprefix-message-)).


### Installation

```shell
$ npm install captains-log-nw
```

### Usage

```javascript
var log = require('captains-log-nw')();
log('hi');
```

See also [Console API](https://developer.chrome.com/devtools/docs/console-api).

##### Logging at a particular level

By default, if you just call `log()`, captains-log-nw will write your log output at the "debug" log level. You can achieve the same effect by writing `log.debug()`.

> IMPORTANT NOTE: npm calls this level `log.http()`, but we call it `debug`.
> If you use `log()`, the logger sees this as a call to `log.debug()`)

Here are all of the log-level-specific methods which are available in captains-log-nw out of the box:

```javascript
var log = require('captains-log-nw')({
  level: 'silly'
});

log.silly();
log.verbose();
log.info();
log.blank(); // will output white text on a white background.
log.debug();
log.warn();
log.error();
log.crit(); // same as error, but can be configured to be different in style.

// using other features from console, which will only be applied in silly log level
// (and have the same colors applied)
log.silly.groupCollapsed("Many silly level log messages.");
log.silly();
log.silly.groupEnd();
```

Setting `level: 'silent'` will disable all logging, while setting `level: 'silly'` will enable all levels of logging. For more details information, see [SailsJS logging](http://sailsjs.org/#!/documentation/concepts/Logging).

### Configuration

For node-webkit, it's easiest if the `globalizeAs` option is used to expose the logger throughout the application.

```javascript
var CaptainsLog = require('captains-log-nw');

var log = new CaptainsLog({
  level: 'debug',
  globalizeAs: 'log',     // make it available globally, without using require()
  console: console,       // passing in the console from the Window object (Browser context)
                          // makes the logs visible in the Developer Tools.
  prefixTheme: 'aligned', // Use a different prefix for string logs.
  colors: false           // disable colors altogether.
});
```

It's possible to set the prefixes manually as well as changing the color of the output for specific levels.

```javascript
var CaptainsLog = require('captains-log-nw');

var log = new CaptainsLog({
  level: 'verbose',
  prefixes: {
    silly   : 'silly  : ',
    verbose : 'verbose: ',
    info    : 'info   : ',
    blank   : '',
    debug   : '',
    warn    : '',
    error   : '',
    crit    : ''
  },
  prefixTheme: 'moderate', // will be ignored, since prefixes are set manually.
  colors: {
    // NW's console allows for css styling for log output
    crit: 'color: red; font-weight: 600; font-size: 18px; text-transform: uppercase'
  }
});
```
#### Configuring a custom logger

__Not Tested__

To use a different library, `overrides.custom` must already be instantiated and ready to go with (at minimum) an n-[ary](http://en.wikipedia.org/wiki/Arity) `.debug()` method.

##### Implementing the simplest possible override

```javascript
var log = require('captains-log-nw')({ custom: customLogger });

log('hello', 'world');
// yields => "Hello world"
```

This assumes `customLogger` works as follows:

```javascript
customLogger.debug()
customLogger.debug('blah')
customLogger.debug('blah', 'foo')
customLogger.debug('blah', 'foo', {bar: 'baz'})
customLogger.debug('blah', 'foo', {bar: 'baz'}, ['a', 3], 2, false);
// etc.
```

For example:

```javascript
var customLogger = console.log.bind(console);
```

##### Using Winston

Formerly, this module encapsulated [winston](https://github.com/flatiron/winston), a popular logger by [@indexzero](https://github.com/indexzero) and the gals/guys over at [Nodejitsu](https://www.nodejitsu.com/). Recently, we made Winston optional to make captains-log as lightweight as possible and reduce the number of `npm install`s and `require()`s necessary for its usage in other modules.

But Winston is awesome!  And it's a great fit for many apps, giving you granular control over how log output is handled, including sending emails, logging to multiple transports, and other production-time concerns.

To use boot up a captains-log that writes to Winston, do the following:

```javascript
var log = require('captains-log-nw')({
  custom: new (require('winston').Logger)({
    levels     : ...,
    transports : ...
  })
});
```



### License

MIT
