jest.mock('mobx-react/native', () => {
  const mobxReact = require.requireActual('mobx-react/native');

  return {
    ...mobxReact,
    inject: () => (Component) => Component,
  };
});
