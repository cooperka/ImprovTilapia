import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List } from 'react-native-paper';

import { references } from './utils';
import FloatingNav from '../FloatingNav/component';

/** Adapted from Paper's `List.Icon`. */
const getSectionIcon = (name) => (props) => {
  const { color: iconColor } = props;

  return (
    <View style={styles.drawerIcon} pointerEvents="box-none">
      <MaterialCommunityIcons name={name} size={24} color={iconColor} />
    </View>
  );
};

@inject('referenceSettings')
@observer
class Reference extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Reference',
    headerLeft: () => <FloatingNav navigation={navigation} />,
  });

  static tabNavigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="book-open-page-variant"
        color={tintColor}
        size={20}
      />
    ),
  });

  state = {};

  render() {
    return (
      <View style={styles.container}>
        {references.map(({ name: sectionName, iconName, items }) => (
          <List.Accordion
            key={sectionName}
            title={sectionName}
            left={getSectionIcon(iconName)}
            expanded={true}
          >
            {items.map(({ name: itemName, description }) => (
              <List.Item
                key={itemName}
                title={itemName}
                description={description}
              />
            ))}
          </List.Accordion>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /** Adapted from Paper's `List.Icon`. */
  drawerIcon: {
    margin: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Reference;
