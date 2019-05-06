import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FloatingNav from '../FloatingNav/component';

@inject('referenceSettings')
@observer
class Reference extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="book-open-page-variant"
        color={tintColor}
        size={20}
      />
    ),
    tabBarVisible: !navigation.getParam('isFullscreen'),
  });

  state = {};

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FloatingNav navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Reference;
