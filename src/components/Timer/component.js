import { Duration } from 'luxon';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { KeepAwake } from 'expo';
import { Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';

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
    isShowingPicker: false,
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

  handleSetTime = (date) => {
    const minutes = date.getHours();
    const seconds = date.getMinutes();
    this.setState({ seconds: minutes * 60 + seconds });
    this.hidePicker();
  };

  handleAddTime = (additionalSeconds) => () => {
    this.setState(({ seconds }) => ({ seconds: seconds + additionalSeconds }));
  };

  showPicker = () => {
    this.setState({ isShowingPicker: true });
  };

  hidePicker = () => {
    this.setState({ isShowingPicker: false });
  };

  render() {
    const { isRunning, isShowingPicker } = this.state;
    const width = Dimensions.get('window').width;

    return (
      <View style={styles.timeContainer}>
        <KeepAwake />

        <Text
          style={[styles.time, { fontSize: width / 4.0 }]}
          onPress={this.showPicker}
        >
          {formatTime(this.state.seconds)}
        </Text>

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

        <DateTimePicker
          mode="time"
          isVisible={isShowingPicker}
          onConfirm={this.handleSetTime}
          onCancel={this.hidePicker}
        />
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
    color: '#f00',
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
