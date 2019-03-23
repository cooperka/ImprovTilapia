import React from 'react';
import renderer from 'react-test-renderer';

import Component from './component';

jest.mock('ScrollView', () => require.requireMock('ScrollViewMock'));
jest.mock('./DrawerItems/component', () => 'DrawerItems');

it('renders as expected', async () => {
  const tree = renderer.create(<Component />);
  expect(tree.toJSON()).toMatchSnapshot();
});
