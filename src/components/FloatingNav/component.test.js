import React from 'react';
import renderer from 'react-test-renderer';

import Component from './component';

it('renders as expected', async () => {
  const tree = renderer.create(<Component />);
  expect(tree.toJSON()).toMatchSnapshot();
});
