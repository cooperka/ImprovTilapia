import React from 'react';
import renderer from 'react-test-renderer';

import Component from './component';

it('renders as expected', () => {
  const tree = renderer.create(<Component />);
  expect(tree.toJSON()).toMatchSnapshot();
});
