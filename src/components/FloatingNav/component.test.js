import React from 'react';
import { shallow } from 'enzyme';

import Component from './component';

const props = {
  navigation: {},
};

it('renders as expected (floating)', async () => {
  const wrapper = shallow(<Component {...props} floating />);
  expect(wrapper).toMatchSnapshot();
});

it('renders as expected (not floating)', async () => {
  const wrapper = shallow(<Component {...props} />);
  expect(wrapper).toMatchSnapshot();
});
