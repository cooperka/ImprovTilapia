import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import theme from './paperTheme';
import { loadAssets } from './utils';

import Timer from '../Timer/component';

const images = [];
const fonts = [Ionicons.font];

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
        <View style={styles.container}>
          <Timer />
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
