import React from 'react';
import { shallow } from 'enzyme';

import Component from './component';

const props = {
  navigation: {},
};

it('renders as expected', async () => {
  const wrapper = shallow(<Component {...props} />);
  expect(wrapper).toMatchSnapshot();
});
