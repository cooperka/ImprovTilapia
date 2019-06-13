import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { IconButton, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StatusBarHeight from '@expo/status-bar-height';

import { color } from '../../constants';
import { icon36 } from '../../styles';

class FloatingNav extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    floating: PropTypes.bool,
  };

  state = {
    statusBarHeight: Constants.statusBarHeight,
  };

  handleLayoutChange = async () => {
    const statusBarHeight = await StatusBarHeight.getAsync();
    this.setState({ statusBarHeight });
  };

  handleOpenDrawer = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  render() {
    const { floating } = this.props;
    const { statusBarHeight } = this.state;

    if (floating) {
      // Create a hacky listener view to detect layout changes so we can
      // check for status bar changes.
      // All other options currently don't handle orientation changes properly.
      return (
        <React.Fragment>
          <View
            style={styles.invisibleView}
            onLayout={this.handleLayoutChange}
          />
          <FAB
            style={[styles.floatingMenuButton, { top: statusBarHeight + 16 }]}
            onPress={this.handleOpenDrawer}
            icon={() => (
              <MaterialCommunityIcons
                style={icon36}
                name="menu"
                size={36}
                color="white"
              />
            )}
          />
        </React.Fragment>
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
  invisibleView: {
    height: 0,
    width: 0,
  },
  floatingMenuButton: {
    zIndex: 9999,
    position: 'absolute',
    // 'top' is set programmatically.
    left: 16,
    backgroundColor: 'transparent',
  },
});

export default FloatingNav;
