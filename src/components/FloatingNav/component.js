import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class FloatingNav extends Component {
  handleOpenDrawer = () => {};

  render() {
    return (
      <FAB
        style={styles.menuButton}
        onPress={this.handleOpenDrawer}
        icon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            name="menu"
            size={36}
            color="white"
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 16,
    left: 16,
    backgroundColor: 'transparent',
  },
  icon: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default FloatingNav;
