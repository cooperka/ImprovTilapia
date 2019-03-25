import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerItems as DefaultDrawerItems } from 'react-navigation';
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SHOW_ROUTES = false;

/** Adapted from Paper's `List.Icon`. */
const getDrawerIcon = (name) => (props) => {
  const { color: iconColor } = props;

  return (
    <View style={styles.drawerIcon} pointerEvents="box-none">
      <MaterialCommunityIcons name={name} size={24} color={iconColor} />
    </View>
  );
};

class DrawerItems extends Component {
  render() {
    return (
      <React.Fragment>
        {SHOW_ROUTES ? (
          <List.Accordion
            title="Routes"
            left={(props) => <List.Icon {...props} icon="routes" />}
          >
            <DefaultDrawerItems {...this.props} />
          </List.Accordion>
        ) : null}

        <List.Accordion title="Timer settings" left={getDrawerIcon('timer')}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Suggestions settings"
          left={getDrawerIcon('message-outline')}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  /** Adapted from Paper's `List.Icon`. */
  drawerIcon: {
    margin: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DrawerItems;
