import React from 'react';
import renderer from 'react-test-renderer';

import Component from './component';
import { TimerSettingsModel } from './model';

jest.useFakeTimers();
jest.mock('../FloatingNav/component', () => 'FloatingNav');

const mockTimerSettings = new TimerSettingsModel();

it('renders as expected', async () => {
  const tree = renderer.create(<Component timerSettings={mockTimerSettings} />);
  expect(tree.toJSON()).toMatchSnapshot();

  // TODO: Click buttons with Enzyme to actually test this.
  jest.advanceTimersByTime(1100);
  expect(tree.toJSON()).toMatchSnapshot();
});
