import React from 'react';
import { shallow } from 'enzyme';

import Component, {
  RouteItems,
  TimerItems,
  SuggestionsItems,
} from './component';
import { TimerSettingsModel } from '../../Timer/model';

const mockTimerSettings = new TimerSettingsModel();

it('renders as expected (root)', async () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toMatchSnapshot();
});

it('renders as expected (route items)', async () => {
  const wrapper = shallow(<RouteItems />);
  expect(wrapper).toMatchSnapshot();
});

it('renders as expected (timer items)', async () => {
  const wrapper = shallow(<TimerItems timerSettings={mockTimerSettings} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders as expected (suggestions items)', async () => {
  const wrapper = shallow(<SuggestionsItems />);
  expect(wrapper).toMatchSnapshot();
});
