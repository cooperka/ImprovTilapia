import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Drawer from '../../Drawer/component';
import Timer from '../../Timer/component';
import Suggestions from '../../Suggestions/component';
import Reference from '../../Reference/component';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Timer: {
      screen: Timer,
    },
    Suggestions: {
      screen: Suggestions,
    },
    Reference: {
      screen: Reference,
    },
  },
  {
    shifting: true,
  },
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
    },
  },
  {
    contentComponent: Drawer,
  },
);

const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;
