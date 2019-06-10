import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

function StatusBarEffect({ navigation, barStyle }) {
  useEffect(() => {
    const focusListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle(barStyle);
    });

    return () => focusListener.remove();
  });

  return <StatusBar barStyle={barStyle} />;
}

export default StatusBarEffect;
