import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Side-effects.
import 'react-native-mock-render/mock';

jest.mock('NativeAnimatedHelper');
jest.mock('Animated', () => {
  const animationMethods = { start: jest.fn(), stop: jest.fn() };
  return {
    loop: () => animationMethods,
    sequence: () => animationMethods,
    timing: () => animationMethods,
    createAnimatedComponent: jest.fn(),
    Value: class {
      setValue = jest.fn();
      toJSON = () => 'Value';
    },
    Text: 'Animated.Text',
  };
});

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
