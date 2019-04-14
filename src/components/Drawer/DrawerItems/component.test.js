import React from 'react';
import { shallow } from 'enzyme';

import Component from './component';

it('renders as expected', async () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toMatchSnapshot();
});
