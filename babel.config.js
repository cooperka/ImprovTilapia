module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        'module-resolver',
        {
          alias: {
            'mobx-react/native': 'mobx-react/native',
            'mobx-react': 'use-mobx-native-instead',
          },
        },
      ],
    ],
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
