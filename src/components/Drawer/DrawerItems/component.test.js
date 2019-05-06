import React from 'react';
import { shallow } from 'enzyme';

import Component, {
  RouteItems,
  TimerItems,
  ReferenceItems,
  SuggestionsItems,
} from './component';
import { TimerSettingsModel } from '../../Timer/model';
import { SuggestionsSettingsModel } from '../../Suggestions/model';
import { ReferenceSettingsModel } from '../../Reference/model';

const mockStores = {
  timerSettings: new TimerSettingsModel(),
  suggestionsSettings: new SuggestionsSettingsModel(),
  referenceSettings: new ReferenceSettingsModel(),
};

jest.mock('../utils', () => ({
  getCurrRouteName: () => 'mockRoute',
}));

it('renders as expected (root)', async () => {
  const wrapper = shallow(<Component navigation={{}} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders as expected (route items)', async () => {
  const wrapper = shallow(<RouteItems />);
  expect(wrapper).toMatchSnapshot();
});

it('renders as expected (timer items)', async () => {
  const wrapper = shallow(<TimerItems {...mockStores} currRouteName={''} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders as expected (suggestions items)', async () => {
  const wrapper = shallow(
    <SuggestionsItems {...mockStores} currRouteName={''} />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders as expected (reference items)', async () => {
  const wrapper = shallow(
    <ReferenceItems {...mockStores} currRouteName={''} />,
  );
  expect(wrapper).toMatchSnapshot();
});
