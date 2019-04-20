import { Duration } from 'luxon';
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
});

it('handles timers', async () => {
  const wrapper = shallow(<Component {...props} />);

  // Add 60 seconds.
  wrapper
    .find({ id: 60 })
    .props()
    .onPress();

  // Start.
  wrapper
    .find('FAB')
    .props()
    .onPress();

  // Advance a few seconds.
  jest.advanceTimersByTime(
    Duration.fromObject({ seconds: 10 }).as('milliseconds'),
  );

  expect(wrapper.find('FAB').prop('icon')()).toMatchSnapshot();
  expect(wrapper.find({ id: 'timeRemaining' }).text()).toMatchSnapshot();

  // Complete the timer.
  jest.advanceTimersByTime(
    Duration.fromObject({ seconds: 51 }).as('milliseconds'),
  );

  expect(wrapper.find('FAB').prop('icon')()).toMatchSnapshot();
  expect(wrapper.find({ id: 'timeRemaining' }).text()).toMatchSnapshot();
});
