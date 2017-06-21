'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'hello-wc',
    environment: environment,
    GlimmerENV: {
      FEATURES: {
        'glimmer-custom-component-manager': true
      }
    }
  };

  return ENV;
};
