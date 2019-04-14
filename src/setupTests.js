import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Side-effects.
import 'react-native-mock-render/mock';

jest.mock('mobx-react/native', () => {
  const mobxReact = require.requireActual('mobx-react/native');

  return {
    ...mobxReact,
    inject: () => (Component) => Component,
  };
});

// Initialize Enzyme.
Enzyme.configure({
  adapter: new Adapter(),
});
