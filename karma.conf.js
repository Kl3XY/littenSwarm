module.exports = function(config) {
  config.set({
    // other Karma config options here, e.g. frameworks, files, etc.

    browsers: ['CustomChrome'],

    customLaunchers: {
      CustomChrome: {
        base: 'Chrome',
        flags: [
          '--disable-web-security',
          '--disable-gpu',
          '--no-sandbox'
        ]
      }
    },

    // Timeout settings (adjust as needed)
    browserDisconnectTimeout: 10000,    // default 2000 ms
    browserDisconnectTolerance: 3,      // default 0
    browserNoActivityTimeout: 60000,    // default 10000 ms

    // other config...
  });
};