import React from 'react';
import { shallow } from 'enzyme';

import Component from './component';
import { TimerSettingsModel } from './model';

jest.useFakeTimers();

const props = {
  navigation: {},
  timerSettings: new TimerSettingsModel(),
};

it('renders as expected', async () => {
  const wrapper = shallow(<Component {...props} />);
  expect(wrapper).toMatchSnapshot();

  // TODO: Click buttons with Enzyme to actually test this.
  jest.advanceTimersByTime(1100);
  expect(wrapper).toMatchSnapshot();
});
