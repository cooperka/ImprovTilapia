import React from 'react';
import renderer from 'react-test-renderer';

import Component from './component';

jest.useFakeTimers();
jest.mock('../FloatingNav/component', () => 'FloatingNav');

it('renders as expected', async () => {
  const tree = renderer.create(<Component />);
  expect(tree.toJSON()).toMatchSnapshot();
});
