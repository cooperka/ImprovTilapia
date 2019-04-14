import React from 'react';
import { shallow } from 'enzyme';

import Component from './component';

jest.useFakeTimers();
jest.mock('../FloatingNav/component', () => 'FloatingNav');

it('renders as expected', async () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toMatchSnapshot();
});
