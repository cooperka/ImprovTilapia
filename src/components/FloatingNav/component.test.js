import React from 'react';
import renderer from 'react-test-renderer';

import Component from './component';

const props = {
  navigation: {},
};

it('renders as expected', async () => {
  const tree = renderer.create(<Component {...props} />);
  expect(tree.toJSON()).toMatchSnapshot();
});
