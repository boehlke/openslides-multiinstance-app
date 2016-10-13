/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
  Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    enabled: true,
    extensions: ['js'],
    pretender: {
      enabled: true
    }
  });

  var extraAssets = new Funnel('bower_components/bootstrap-sass/assets/fonts/bootstrap', {
    srcDir: '/',
    // include: ['**/*.woff', '**/stylesheet.css'],
    destDir: '/assets/fonts'
  });

  return app.toTree(extraAssets);
};
