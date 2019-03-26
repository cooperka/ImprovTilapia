import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FloatingNav from '../FloatingNav/component';
import { Button, FAB } from 'react-native-paper';
import { getRandomOccupation, getRandomRelationship } from './utils';
import { Constants } from 'expo';

class Timer extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: () => (
      <MaterialCommunityIcons name="message-outline" color="white" />
    ),
    tabBarVisible: !navigation.getParam('isFullscreen'),
  });

  state = {
    currSuggestion: 'Press a button below to get a suggestion',
    width: null,
  };

  handleLayoutChange = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    const { navigation } = this.props;
    navigation.setParams({ isFullscreen: width > height });

    this.setState({ width });
  };

  handleNewSuggestion = (suggestionFn) => () => {
    this.setState({ currSuggestion: suggestionFn() });
  };

  render() {
    const { navigation } = this.props;
    const { currSuggestion, width } = this.state;

    return (
      <View style={styles.container} onLayout={this.handleLayoutChange}>
        <FloatingNav navigation={navigation} />

        <View style={styles.container}>
          <Text style={[styles.suggestion, { fontSize: width / 8.0 }]}>
            {currSuggestion}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            onPress={this.handleNewSuggestion(getRandomRelationship)}
          >
            Relationship
          </Button>
          <Button
            style={styles.button}
            onPress={this.handleNewSuggestion(getRandomOccupation)}
          >
            Occupation
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  suggestion: {
    marginTop: Constants.statusBarHeight,
    marginBottom: 8,
    textAlign: 'center',
    color: '#0f0',
    marginHorizontal: 16,
  },
  buttonsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 500,
    maxHeight: 140,
  },
  button: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default Timer;
