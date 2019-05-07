import Immutable from 'immutable';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List, TouchableRipple } from 'react-native-paper';

import { references } from './utils';
import FloatingNav from '../FloatingNav/component';
import { color } from '../../constants';

/** Adapted from Paper's `List.Icon`. */
const getSectionIcon = (name) => (props) => {
  const { color: iconColor } = props;

  return (
    <View style={styles.drawerIcon} pointerEvents="box-none">
      <MaterialCommunityIcons name={name} size={24} color={iconColor} />
    </View>
  );
};

function ListItem({ title, description, expanded, onPress }) {
  return (
    <TouchableRipple style={styles.itemContainer} onPress={onPress}>
      <View style={styles.item}>
        {title ? <Text style={styles.itemTitle}>{title}</Text> : null}
        {description ? (
          <Text
            numberOfLines={expanded ? undefined : 1}
            style={styles.itemDescription}
          >
            {description}
          </Text>
        ) : null}
      </View>
    </TouchableRipple>
  );
}

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

  state = {
    expandedItems: Immutable.Set(),
  };

  handleToggleItem = (itemName) => {
    const { expandedItems } = this.state;
    const exists = expandedItems.contains(itemName);
    const newItems = exists
      ? expandedItems.delete(itemName)
      : expandedItems.add(itemName);
    this.setState({ expandedItems: newItems });
  };

  render() {
    const { expandedItems } = this.state;

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
              <ListItem
                key={itemName}
                title={itemName}
                expanded={expandedItems.contains(itemName)}
                description={description}
                onPress={() => this.handleToggleItem(itemName)}
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
  itemContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  /** Adapted from Paper's `List.ListAccordion`. */
  item: {
    marginLeft: 64 + 8,
    marginRight: 16,
  },
  /** Adapted from Paper's `List.ListItem`. */
  itemTitle: {
    color: color.MATERIAL_PRIMARY,
    fontSize: 16,
  },
  itemDescription: {
    color: color.MATERIAL_SECONDARY,
    fontSize: 14,
    marginBottom: 8,
  },
});

export default Reference;
