import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  icon: {},
  icon_android: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  icon_ios: {
    marginTop: -5,
    marginLeft: -5,
  },
});

/**
 * Platform-dependent styles for big icons (because iOS is janky).
 * Hacky and only tested on size 36 icons.
 */
export const icon36 = [
  styles.icon,
  Platform.OS === 'ios' ? styles.icon_ios : styles.icon_android,
];
