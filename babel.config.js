module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
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
