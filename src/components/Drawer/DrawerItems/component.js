import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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

function ListItem({ title, description }) {
  return (
    <View style={styles.settingsItem}>
      {title ? <Text style={styles.itemTitle}>{title}</Text> : null}
      {description ? (
        <Text style={styles.itemDescription}>{description}</Text>
      ) : null}
    </View>
  );
}

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
          <ListItem
            title="Increase screen brightness while timer is running"
            description="Currently OFF"
          />
        </List.Accordion>

        <List.Accordion
          title="Suggestions settings"
          left={getDrawerIcon('message-outline')}
        >
          <ListItem title="Nothing yet" />
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
  /** Adapted from Paper's `List.ListAccordion`. */
  settingsItem: {
    marginLeft: 64 + 8,
    marginRight: 16,
  },
  /** Adapted from Paper's `List.ListItem`. */
  itemTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default DrawerItems;
