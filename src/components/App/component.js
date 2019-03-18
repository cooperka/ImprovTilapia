import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import theme from './paperTheme';

import Timer from '../Timer/component';

class App extends Component {
  render() {
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
