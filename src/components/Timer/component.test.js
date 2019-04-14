import React from 'react';
import { shallow } from 'enzyme';

import Component from './component';
import { TimerSettingsModel } from './model';

jest.useFakeTimers();
jest.mock('../FloatingNav/component', () => 'FloatingNav');

const mockTimerSettings = new TimerSettingsModel();

it('renders as expected', async () => {
  const wrapper = shallow(<Component timerSettings={mockTimerSettings} />);
  expect(wrapper).toMatchSnapshot();

  // TODO: Click buttons with Enzyme to actually test this.
  jest.advanceTimersByTime(1100);
  expect(wrapper).toMatchSnapshot();
});
