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

const SUPPRESSED_WARNINGS = /Warning: Async Storage has been extracted from react-native core/;

console.error = (...args) => {
  if (SUPPRESSED_WARNINGS.match(args[0])) {
    return;
  }
  console.error(...args);
};

// Initialize Enzyme.
Enzyme.configure({
  adapter: new Adapter(),
});
