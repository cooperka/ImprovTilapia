import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FloatingNav from '../FloatingNav/component';

class Timer extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: () => (
      <MaterialCommunityIcons name="message-outline" color="white" />
    ),
  });

  state = {};

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FloatingNav navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default Timer;
