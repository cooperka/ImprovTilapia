import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';

class Drawer extends Component {
  render() {
    return <DrawerItems {...this.props} />;
  }
}

const styles = StyleSheet.create({});

export default Drawer;
