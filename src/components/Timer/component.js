import { Duration } from 'luxon';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { KeepAwake } from 'expo';
import { Button, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from '../App/paperTheme';

import FloatingNav from '../FloatingNav/component';

const FabIcon = ({ name }) => (
  <MaterialCommunityIcons
    style={styles.icon}
    name={name}
    size={36}
    color="white"
  />
);
const PlayIcon = () => <FabIcon name="play" />;
const PauseIcon = () => <FabIcon name="pause" />;

function formatTime(seconds) {
  return Duration.fromObject({ seconds }).toFormat('m:ss');
}

class Timer extends Component {
  static navigationOptions = {
    tabBarIcon: () => <MaterialCommunityIcons name="timer" color="white" />,
  };

  state = {
    seconds: 0,
    isRunning: false,
    // Track width to be responsive to layout changes.
    width: null,
  };

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    const { seconds } = this.state;

    if (seconds <= 0) {
      this.setState({ seconds: 0, isRunning: false });
    }

    // TODO: Save actual milliseconds instead of this short-term hack.
    this.setState(({ seconds, isRunning }) => ({
      seconds: seconds - (isRunning ? 1 : 0),
    }));
  }

  handleToggleTimer = () => {
    const { isRunning } = this.state;
    this.setState({ isRunning: !isRunning });
  };

  handleReset = () => {
    this.setState({ seconds: 0, isRunning: false });
  };

  handleAddTime = (additionalSeconds) => () => {
    this.setState(({ seconds }) => ({ seconds: seconds + additionalSeconds }));
  };

  handleLayoutChange = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    this.setState({ width });
  };

  render() {
    const { navigation } = this.props;
    const { isRunning, width } = this.state;

    return (
      <View style={styles.timeContainer} onLayout={this.handleLayoutChange}>
        <KeepAwake />

        <FloatingNav navigation={navigation} />

        <Text style={[styles.time, { fontSize: width / 4.0 }]}>
          {formatTime(this.state.seconds)}
        </Text>

        <View style={[styles.buttonsContainer, styles.buttonsTop]}>
          <Button style={styles.button} onPress={this.handleReset}>
            Reset
          </Button>
          <FAB
            key={`playPause_${isRunning}`}
            style={styles.fab}
            icon={isRunning ? PauseIcon : PlayIcon}
            onPress={this.handleToggleTimer}
          />
          <Button style={styles.button} onPress={this.handleAddTime(60)}>
            +1 min
          </Button>
        </View>

        <View style={[styles.buttonsContainer, styles.buttonsBottom]}>
          {[5, 10, 20, 30].map((minutes) => (
            <Button
              key={minutes}
              style={styles.button}
              onPress={this.handleAddTime(minutes * 60)}
            >
              {`+${minutes}`}
            </Button>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  time: {
    marginBottom: 8,
    color: '#f00',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 500,
  },
  buttonsTop: {
    justifyContent: 'center',
  },
  buttonsBottom: {
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 16,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: 16,
  },
  icon: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default Timer;
