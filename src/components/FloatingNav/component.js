import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class FloatingNav extends Component {
  render() {
    return (
      <View style={styles.menuButton}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="menu"
          size={36}
          color="white"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 16,
    left: 16,
  },
});

export default FloatingNav;
