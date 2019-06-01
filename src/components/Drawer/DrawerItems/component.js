import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  withNavigation,
  DrawerItems as DefaultDrawerItems,
} from 'react-navigation';
import { List, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native';

import { color } from '../../../constants';
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

function ListItem({ title, description, onPress, containerStyle }) {
  return (
    <TouchableRipple style={styles.settingsItemContainer} onPress={onPress}>
      <View style={[styles.settingsItem, containerStyle]}>
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
  routeName = 'Timer';

  handleTapBrightness = () => {
    const { timerSettings } = this.props;
    timerSettings.shouldIncreaseBrightness = !timerSettings.shouldIncreaseBrightness;
  };

  render() {
    const {
      timerSettings: { shouldIncreaseBrightness },
      currRouteName,
      navigateToRoute,
    } = this.props;

    return (
      <List.Accordion
        title="Timer settings"
        left={getDrawerIcon('timer')}
        expanded={currRouteName === this.routeName}
        onPress={() => navigateToRoute(this.routeName)}
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

@inject('suggestionsSettings')
@observer
export class SuggestionsItems extends Component {
  routeName = 'Suggestions';

  handleTapAutoSuggest = () => {
    const { suggestionsSettings } = this.props;
    suggestionsSettings.shouldAutoSuggest = !suggestionsSettings.shouldAutoSuggest;
  };

  handleTapAutoSuggestInterval = () => {
    const { suggestionsSettings } = this.props;
    const { autoSuggestIntervalSeconds } = suggestionsSettings;
    // Simple toggle for now.
    suggestionsSettings.autoSuggestIntervalSeconds =
      autoSuggestIntervalSeconds >= 30 ? 10 : 30;
  };

  render() {
    const {
      suggestionsSettings: { shouldAutoSuggest, autoSuggestIntervalSeconds },
      currRouteName,
      navigateToRoute,
    } = this.props;

    return (
      <List.Accordion
        title="Suggestions settings"
        left={getDrawerIcon('message-text')}
        expanded={currRouteName === this.routeName}
        onPress={() => navigateToRoute(this.routeName)}
      >
        <ListItem
          title="Auto-suggest"
          description={`Using the interval defined below.\nCurrently ${
            shouldAutoSuggest ? 'ON' : 'OFF'
          }`}
          onPress={this.handleTapAutoSuggest}
        />
        <ListItem
          title="Auto-suggest interval"
          description={`Currently ${autoSuggestIntervalSeconds} seconds`}
          onPress={this.handleTapAutoSuggestInterval}
        />
      </List.Accordion>
    );
  }
}

@inject('referenceSettings')
@observer
export class ReferenceItems extends Component {
  routeName = 'Reference';

  handleExpandAll = () => {
    const { referenceSettings } = this.props;
    referenceSettings.expandAllItems();
  };

  handleCollapseAll = () => {
    const { referenceSettings } = this.props;
    referenceSettings.collapseAllItems();
  };

  render() {
    const { currRouteName, navigateToRoute } = this.props;

    return (
      <List.Accordion
        title="Reference settings"
        left={getDrawerIcon('book-open-page-variant')}
        expanded={currRouteName === this.routeName}
        onPress={() => navigateToRoute(this.routeName)}
      >
        <ListItem
          containerStyle={styles.titleOnly}
          title="Expand all items"
          onPress={this.handleExpandAll}
        />
        <ListItem
          containerStyle={styles.titleOnly}
          title="Collapse all items"
          onPress={this.handleCollapseAll}
        />
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
      navigateToRoute: (routeName) => {
        navigation.navigate({ routeName });
        navigation.openDrawer();
      },
    };

    return (
      <React.Fragment>
        {SHOW_ROUTES ? <RouteItems {...sectionProps} /> : null}
        <TimerItems {...sectionProps} />
        <SuggestionsItems {...sectionProps} />
        <ReferenceItems {...sectionProps} />
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
  settingsItemContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  /** Adapted from Paper's `List.ListAccordion`. */
  settingsItem: {
    marginLeft: 64 + 8,
    marginRight: 16,
  },
  /** Adapted from Paper's `List.ListItem`. */
  itemTitle: {
    color: color.MATERIAL_PRIMARY,
    fontSize: 16,
  },
  titleOnly: {
    paddingVertical: 8,
  },
  itemDescription: {
    color: color.MATERIAL_SECONDARY,
    fontSize: 14,
    marginBottom: 8,
  },
});

export default withNavigation(DrawerItems);
