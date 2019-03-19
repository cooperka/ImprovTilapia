import { Duration } from 'luxon';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeepAwake } from 'expo';
import { Headline, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import theme from '../App/paperTheme';

const FabIcon = ({ name }) => (
  <Ionicons style={styles.icon} name={name} size={28} color="white" />
);
const PlayIcon = () => <FabIcon name="md-play" />;
const PauseIcon = () => <FabIcon name="md-pause" />;

function formatTime(seconds) {
  return Duration.fromObject({ seconds }).toFormat('m:ss');
}

class Timer extends Component {
  state = {
    seconds: 0,
    isRunning: false,
  };

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    // TODO: Save actual milliseconds instead of this short-term hack.
    this.setState(({ seconds, isRunning }) => ({
      seconds: seconds + (isRunning ? 1 : 0),
    }));
  }

  handleToggleTimer = () => {
    const { isRunning } = this.state;
    this.setState({ isRunning: !isRunning });
  };

  handleReset = () => {
    this.setState({ seconds: 0 });
  };

  handleAddTime = (additionalSeconds) => () => {
    this.setState(({ seconds }) => ({ seconds: seconds + additionalSeconds }));
  };

  render() {
    const { isRunning } = this.state;

    return (
      <View style={styles.timeContainer}>
        <KeepAwake />
        <Headline style={styles.time}>
          {formatTime(this.state.seconds)}
        </Headline>
        <View style={styles.buttonsContainer}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    marginBottom: 8,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
  },
  fab: {
    backgroundColor: theme.colors.primary,
  },
  icon: {
    // TODO: Figure out why the icon isn't centering.
    marginLeft: 4,
  },
});

export default Timer;
