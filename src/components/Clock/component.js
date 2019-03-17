import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Clock extends Component {
  state = {
    seconds: 0,
  };

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState((state) => ({ seconds: state.seconds + 1 }));
  }

  render() {
    return (
      <View className={styles.timeContainer}>
        <Text className={styles.time}>{this.state.seconds}</Text>
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

export default Clock;
