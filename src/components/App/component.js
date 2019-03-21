import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import theme from './paperTheme';
import { loadAssets } from './utils';

import Timer from '../Timer/component';

const images = [];
const fonts = [MaterialCommunityIcons.font];

const TabNavigator = createMaterialBottomTabNavigator({
  Timer: {
    screen: Timer,
  },
});

const AppContainer = createAppContainer(TabNavigator);

class App extends Component {
  state = {
    isReady: false,
  };

  render() {
    const { isReady } = this.state;

    if (process.env.NODE_ENV !== 'test' && !isReady) {
      return (
        <AppLoading
          startAsync={async () => await loadAssets(images, fonts)}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AppContainer />
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
