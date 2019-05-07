module.exports = {
  withNavigation: (Component) => Component,

  createAppContainer: () => 'AppContainer',
  createDrawerNavigator: () => 'DrawerNavigator',
  createStackNavigator: () => 'StackNavigator',
  createBottomTabNavigator: () => 'TabNavigator',

  SafeAreaView: 'SafeAreaView',
  DrawerItems: 'DrawerItems',
};
