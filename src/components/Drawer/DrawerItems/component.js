import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DrawerItems as DefaultDrawerItems } from 'react-navigation';
import { List } from 'react-native-paper';

const SHOW_ROUTES = false;

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

        <List.Accordion
          title="Timer settings"
          left={(props) => <List.Icon {...props} icon="timer" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Suggestions settings"
          left={(props) => <List.Icon {...props} icon="message-outline" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default DrawerItems;
