import Immutable from 'immutable';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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

function ListItem({
  title,
  description,
  example,
  confusingTerms,
  relatedTerms,
  relatedSections,
  expanded,
  onPress,
}) {
  return (
    <TouchableRipple style={styles.itemContainer} onPress={onPress}>
      <View style={styles.item}>
        {title && <Text style={styles.itemTitle}>{title}</Text>}
        {description && (
          <Text
            numberOfLines={expanded ? undefined : 1}
            style={styles.itemDescription}
          >
            {description}
          </Text>
        )}
        {expanded && (
          <React.Fragment>
            {example && (
              <Text style={styles.itemDescription}>Example: {example}</Text>
            )}
            {confusingTerms && (
              <Text style={styles.itemDescription}>
                Not to be confused with: {confusingTerms.join(', ')}
              </Text>
            )}
            {relatedTerms && (
              <Text style={styles.itemDescription}>
                See also: {relatedTerms.join(', ')}
              </Text>
            )}
            {relatedSections && (
              <Text style={styles.itemDescription}>
                See sections: {relatedSections.join(', ')}
              </Text>
            )}
          </React.Fragment>
        )}
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
    expandedSection: null,
    expandedItems: Immutable.Set(),
  };

  handleToggleSection = (sectionName) => {
    const { expandedSection } = this.state;
    const wasExpanded = expandedSection === sectionName;
    this.setState({ expandedSection: wasExpanded ? null : sectionName });
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
    const { expandedSection, expandedItems } = this.state;

    return (
      <ScrollView style={styles.container}>
        {references.map(({ name: sectionName, iconName, items }) => (
          <List.Accordion
            key={sectionName}
            title={sectionName}
            left={getSectionIcon(iconName)}
            expanded={expandedSection === sectionName}
            onPress={() => this.handleToggleSection(sectionName)}
          >
            {items.map(({ name: itemName, ...props }) => (
              <ListItem
                {...props}
                key={itemName}
                title={itemName}
                expanded={expandedItems.contains(itemName)}
                onPress={() => this.handleToggleItem(itemName)}
              />
            ))}
          </List.Accordion>
        ))}
      </ScrollView>
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
