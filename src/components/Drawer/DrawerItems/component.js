import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  withNavigation,
  DrawerItems as DefaultDrawerItems,
} from 'react-navigation';
import { List, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native';

import { getCurrRouteName } from '../utils';

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

function ListItem({ title, description, ...viewProps }) {
  return (
    <TouchableRipple style={styles.settingsItem} {...viewProps}>
      <View>
        {title ? <Text style={styles.itemTitle}>{title}</Text> : null}
        {description ? (
          <Text style={styles.itemDescription}>{description}</Text>
        ) : null}
      </View>
    </TouchableRipple>
  );
}

export function RouteItems() {
  return (
    <List.Accordion
      title="Routes"
      left={(props) => <List.Icon {...props} icon="routes" />}
    >
      <DefaultDrawerItems {...this.props} />
    </List.Accordion>
  );
}

@inject('timerSettings')
@observer
export class TimerItems extends Component {
  handleTapBrightness = () => {
    const { timerSettings } = this.props;
    timerSettings.shouldIncreaseBrightness = !timerSettings.shouldIncreaseBrightness;
  };

  render() {
    const {
      timerSettings: { shouldIncreaseBrightness },
      currRouteName,
    } = this.props;

    return (
      <List.Accordion
        title="Timer settings"
        left={getDrawerIcon('timer')}
        expanded={currRouteName === 'Timer'}
      >
        <ListItem
          title="Increase screen brightness while timer is running"
          description={`Currently ${shouldIncreaseBrightness ? 'ON' : 'OFF'}`}
          onPress={this.handleTapBrightness}
        />
      </List.Accordion>
    );
  }
}

export class SuggestionsItems extends Component {
  render() {
    const { currRouteName } = this.props;

    return (
      <List.Accordion
        title="Suggestions settings"
        left={getDrawerIcon('message-outline')}
        expanded={currRouteName === 'Suggestions'}
      >
        <ListItem title="Nothing yet" />
      </List.Accordion>
    );
  }
}

class DrawerItems extends Component {
  render() {
    const { navigation } = this.props;
    const currRouteName = getCurrRouteName(navigation);
    const sectionProps = {
      currRouteName,
    };

    return (
      <React.Fragment>
        {SHOW_ROUTES ? <RouteItems {...sectionProps} /> : null}
        <TimerItems {...sectionProps} />
        <SuggestionsItems {...sectionProps} />
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

export default withNavigation(DrawerItems);
