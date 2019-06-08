import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';

import FloatingNav from '../FloatingNav/component';
import { Button } from 'react-native-paper';
import { suggestionTypes, suggestions } from './utils';
import { Constants } from 'expo';

// Organized in pairs (left and right column).
const suggestionOrder = [
  suggestionTypes.RELATIONSHIP,
  suggestionTypes.EMOTION_SHORT,

  suggestionTypes.OCCUPATION,
  suggestionTypes.EMOTION_FULL,

  suggestionTypes.LOCATION,
  suggestionTypes.EMOTIONAL_DIAD,
];

@inject('suggestionsSettings')
@observer
class Suggestions extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="message-text" color={tintColor} size={20} />
    ),
    tabBarVisible: !navigation.getParam('isFullscreen'),
  });

  state = {
    currCategory: null,
    currSuggestion: 'Press a button below to get a suggestion',
    suggestionFn: null,
    seconds: 0,
    width: null,
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    const {
      suggestionsSettings: { shouldAutoSuggest, autoSuggestIntervalSeconds },
    } = this.props;
    const { currCategory, suggestionFn, seconds } = this.state;

    if (shouldAutoSuggest && currCategory && suggestionFn) {
      this.setState(({ seconds }) => ({
        seconds: seconds + 1,
      }));

      if (seconds + 1 >= autoSuggestIntervalSeconds) {
        this.handleNewSuggestion(currCategory, suggestionFn)();
      }
    } else {
      // Reset seconds to 0 in case they turn it on later.
      this.setState({ seconds: 0 });
    }
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
    this.setState({
      currCategory: category,
      currSuggestion: suggestionFn(),
      suggestionFn,
      seconds: 0,
    });
  };

  isActive = (name) => {
    const { currCategory } = this.state;
    return name === currCategory;
  };

  render() {
    const { navigation } = this.props;
    let { currSuggestion, width } = this.state;
    const textLengthFactor =
      currSuggestion.length > 20
        ? // 5% smaller for each character beyond 20, but at most half the normal size.
          Math.min(((currSuggestion.length - 20) * 5) / 100 + 1, 2)
        : 1;

    return (
      <View style={styles.container} onLayout={this.handleLayoutChange}>
        <FloatingNav navigation={navigation} floating />

        <View style={styles.suggestionContainer}>
          <Text
            style={[
              styles.suggestion,
              { fontSize: width / 8.0 / textLengthFactor },
            ]}
          >
            {currSuggestion}
          </Text>
        </View>

        <Grid style={styles.buttonsContainer}>
          {suggestionOrder
            // Get data.
            .map((key) => suggestions[key])
            // Pair into columns.
            .reduce((reduction, value, index) => {
              if (index % 2 === 0) {
                reduction.push([value]);
              } else {
                reduction[reduction.length - 1].push(value);
              }
              return reduction;
            }, [])
            // Render each pair.
            .map((pair, index) => (
              <Row key={index}>
                {pair.map(({ name, getRandomThing }, index) => (
                  <Col key={name}>
                    <Button
                      id={name}
                      mode={this.isActive(name) ? 'contained' : 'text'}
                      style={[
                        styles.button,
                        index > 0 ? styles.button_right : styles.button_left,
                      ]}
                      onPress={this.handleNewSuggestion(name, getRandomThing)}
                    >
                      {name}
                    </Button>
                  </Col>
                ))}
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
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 16,
  },
  button_right: {
    marginLeft: 8,
  },
  button_left: {
    marginRight: 8,
  },
});

export default Suggestions;
