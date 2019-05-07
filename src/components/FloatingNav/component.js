import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { IconButton, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { color } from '../../constants';

class FloatingNav extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    floating: PropTypes.bool,
  };

  handleOpenDrawer = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  render() {
    const { floating } = this.props;

    if (floating) {
      return (
        <FAB
          style={styles.floatingMenuButton}
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

    return (
      <IconButton
        style={styles.menuButton}
        onPress={this.handleOpenDrawer}
        icon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            name="menu"
            size={28}
            color={color.MATERIAL_PRIMARY}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuButton: {
    // TODO: Improve hacky margin to make it look centered.
    marginLeft: 22,
  },
  floatingMenuButton: {
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
