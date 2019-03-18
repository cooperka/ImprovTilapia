import { DefaultTheme, Colors } from 'react-native-paper';

// https://github.com/callstack/react-native-paper/blob/master/src/styles/DefaultTheme.js
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.indigo500,
  },
};

export default theme;
