import { Duration } from 'luxon';
import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Constants, KeepAwake, Brightness } from 'expo';
import { Button, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react/native';

import theme from '../App/paperTheme';

import FloatingNav from '../FloatingNav/component';

const getFabIcon = (name) => () => (
  <MaterialCommunityIcons
    style={styles.icon}
    name={name}
    size={36}
    color="white"
  />
);
const PlayIcon = getFabIcon('play');
const PauseIcon = getFabIcon('pause');

function formatTime(seconds) {
  return Duration.fromObject({ seconds }).toFormat('m:ss');
}

function formatTimeCompact(seconds) {
  return Duration.fromObject({ seconds }).toFormat(
    seconds % 60 === 0 ? 'm' : ':ss',
  );
}

@inject('timerSettings')
@observer
class Timer extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="timer" color={tintColor} size={20} />
    ),
    tabBarVisible: !navigation.getParam('isFullscreen'),
  });

  state = {
    seconds: 0,
    isRunning: false,
    lastSetTime: 0,
    width: null,
    flashValue: new Animated.Value(1),
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    const { seconds, isRunning } = this.state;

    if (seconds <= 0) {
      if (isRunning) {
        this.startFlashAnim();
      }
      this.setState({ seconds: 0, isRunning: false });
    }

    // TODO: Save actual milliseconds instead of this short-term hack.
    this.setState(({ seconds, isRunning }) => ({
      seconds: seconds - (isRunning ? 1 : 0),
    }));
  };

  setMaxBrightness = async () => {
    const {
      timerSettings: { shouldIncreaseBrightness },
    } = this.props;
    if (!shouldIncreaseBrightness) {
      return;
    }

    Brightness.setBrightnessAsync(1.0);
  };

  undoBrightness = () => {
    const {
      timerSettings: { shouldIncreaseBrightness },
    } = this.props;
    if (!shouldIncreaseBrightness) {
      return;
    }

    Brightness.setBrightnessAsync(null);
  };

  startFlashAnim = () => {
    const { flashValue } = this.state;

    Animated.loop(
      Animated.sequence([
        Animated.timing(flashValue, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(flashValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          isInteraction: false,
        }),
      ]),
      {
        iterations: 5,
      },
    ).start(() => this.undoBrightness());
  };

  stopFlashAnim = () => {
    const { flashValue } = this.state;
    Animated.timing(flashValue).stop();
    flashValue.setValue(1);
  };

  handleToggleTimer = () => {
    const { isRunning } = this.state;
    const shouldPlay = !isRunning;

    if (shouldPlay) {
      this.setMaxBrightness();
    }

    this.setState({ isRunning: shouldPlay });
  };

  handleReset = () => {
    const { seconds, lastSetTime } = this.state;
    const newTime = lastSetTime === seconds ? 0 : lastSetTime;

    this.stopFlashAnim();
    this.undoBrightness();
    this.setState({
      seconds: newTime,
      isRunning: false,
      lastSetTime: newTime,
    });
  };

  handleAddTime = (additionalSeconds) => () => {
    this.stopFlashAnim();
    this.setState(({ seconds }) => {
      const newTime = seconds + additionalSeconds;
      return { seconds: newTime, lastSetTime: newTime };
    });
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

  render() {
    const { navigation } = this.props;
    const { isRunning, width, flashValue } = this.state;

    return (
      <View style={styles.container} onLayout={this.handleLayoutChange}>
        <KeepAwake />

        <FloatingNav navigation={navigation} floating />

        <View style={styles.timeContainer}>
          <Animated.Text
            id="timeRemaining"
            style={[
              styles.time,
              { fontSize: width / 4.0, opacity: flashValue },
            ]}
          >
            {formatTime(this.state.seconds)}
          </Animated.Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsRow}>
            <Button style={styles.button} onPress={this.handleReset}>
              Reset
            </Button>
            <FAB
              key={`playPause_${isRunning}`}
              style={styles.fab}
              icon={isRunning ? PauseIcon : PlayIcon}
              onPress={this.handleToggleTimer}
            />
            <Button style={styles.button} onPress={this.handleAddTime(10)}>
              +0:10
            </Button>
          </View>

          <View style={styles.buttonsRow}>
            {[1, 5, 10, 30]
              .map((num) => num * 60)
              .map((seconds) => (
                <Button
                  key={seconds}
                  id={seconds}
                  style={styles.button}
                  onPress={this.handleAddTime(seconds)}
                >
                  {`+${formatTimeCompact(seconds)}`}
                </Button>
              ))}
          </View>
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
  timeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
    marginBottom: 8,
  },
  time: {
    color: '#f00',
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 500,
    maxHeight: 180,
  },
  buttonsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
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
