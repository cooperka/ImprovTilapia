import React from 'react';
import { shallow } from 'enzyme';

import Component from './component';

jest.mock('ScrollView', () => require.requireMock('ScrollViewMock'));
jest.mock('./DrawerItems/component', () => 'DrawerItems');

it('renders as expected', async () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toMatchSnapshot();
});
