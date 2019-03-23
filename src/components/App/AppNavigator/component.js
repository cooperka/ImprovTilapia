import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Drawer from '../../Drawer/component';
import Timer from '../../Timer/component';

const TabNavigator = createMaterialBottomTabNavigator({
  Timer: {
    screen: Timer,
  },
});

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
