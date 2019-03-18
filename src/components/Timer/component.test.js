import React from 'react';
import renderer from 'react-test-renderer';

import Component from './component';

jest.useFakeTimers();

it('renders as expected', async () => {
  const tree = renderer.create(<Component />);
  expect(tree.toJSON()).toMatchSnapshot();

  // TODO: Click buttons with Enzyme to actually test this.
  jest.advanceTimersByTime(1100);
  expect(tree.toJSON()).toMatchSnapshot();
});
