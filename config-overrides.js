const rewireStyledComponents = require('react-app-rewire-styled-components');

const isDev = process.env.NODE_ENV !== 'production';

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env, {
    displayName: isDev,
  });

  return config;
};
