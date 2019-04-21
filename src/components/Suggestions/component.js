import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';

import FloatingNav from '../FloatingNav/component';
import { Button } from 'react-native-paper';
import { suggestionTypes, suggestions } from './utils';
import { Constants } from 'expo';

const suggestionOrder = [
  suggestionTypes.RELATIONSHIP,
  suggestionTypes.OCCUPATION,
  suggestionTypes.EMOTION_SHORT,
  suggestionTypes.EMOTION_FULL,
  suggestionTypes.EMOTIONAL_DIAD,
];

class Timer extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="message-outline"
        color={tintColor}
        size={20}
      />
    ),
    tabBarVisible: !navigation.getParam('isFullscreen'),
  });

  state = {
    currCategory: null,
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

  handleNewSuggestion = (category, suggestionFn) => () => {
    this.setState({ currCategory: category, currSuggestion: suggestionFn() });
  };

  isActive = (name) => {
    const { currCategory } = this.state;
    return name === currCategory;
  };

  render() {
    const { navigation } = this.props;
    const { currSuggestion, width } = this.state;

    return (
      <View style={styles.container} onLayout={this.handleLayoutChange}>
        <FloatingNav navigation={navigation} />

        <View style={styles.suggestionContainer}>
          <Text style={[styles.suggestion, { fontSize: width / 8.0 }]}>
            {currSuggestion}
          </Text>
        </View>

        <Grid style={styles.buttonsContainer}>
          {suggestionOrder
            .map((key) => suggestions[key])
            .map(({ name, getRandomThing }) => (
              <Row key={name}>
                <Button
                  mode={this.isActive(name) ? 'contained' : 'text'}
                  style={styles.button}
                  onPress={this.handleNewSuggestion(name, getRandomThing)}
                >
                  {name}
                </Button>
              </Row>
            ))}
        </Grid>
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
  suggestionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    maxWidth: 500,
    maxHeight: 140,
  },
  button: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default Timer;
