module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
    env: {
      production: {
        plugins: [
          // Re-write imports to minimize bundle size.
          'react-native-paper/babel',
        ],
      },
    },
  };
};
