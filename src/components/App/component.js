import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as MobxProvider } from 'mobx-react/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from './paperTheme';
import { loadAssets } from './utils';
import { TimerSettingsModel } from '../Timer/model';

import AppNavigator from './AppNavigator/component';

const images = [];
const fonts = [MaterialCommunityIcons.font];

const timerSettings = new TimerSettingsModel();

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
      <MobxProvider timerSettings={timerSettings}>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </PaperProvider>
      </MobxProvider>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
