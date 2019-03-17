import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Clock from '../Clock/component';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Clock />
      </View>
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
