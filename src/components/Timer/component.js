import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { KeepAwake } from 'expo';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const PlayIcon = () => <Ionicons name="md-play" color="white" />;
const PauseIcon = () => <Ionicons name="md-pause" color="white" />;

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

  render() {
    const { isRunning } = this.state;

    return (
      <View className={styles.timeContainer}>
        <KeepAwake />
        <Text className={styles.time}>{this.state.seconds}</Text>
        <Button
          mode="contained"
          icon={isRunning ? PauseIcon : PlayIcon}
          onPress={this.handleToggleTimer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {},
});

export default Timer;
