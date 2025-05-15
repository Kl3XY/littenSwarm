module.exports = function(config) {
  config.set({
    // ... keep your existing config here ...

    browsers: ['ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    },

    singleRun: true,  // optional, good for CI

    // other configs ...
  });
};