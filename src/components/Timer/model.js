import * as _ from 'lodash';
import { AsyncStorage } from 'react-native';
import { observable, autorun, toJS } from 'mobx';

const STORAGE_KEY = 'TimerSettingsModel';

/** Debounce slightly. */
const PERSISTENCE_DELAY_MS = 100;

export class TimerSettingsModel {
  @observable
  shouldIncreaseBrightness = true;

  constructor() {
    retrieveData().then((savedValues) => {
      // Set initial state if there's something valid saved.
      if (_.isPlainObject(savedValues)) {
        Object.assign(this, savedValues);
      }

      // Persist state any time it changes.
      autorun(
        async () => {
          await storeData(toJS(this));
        },
        {
          delay: PERSISTENCE_DELAY_MS,
        },
      );
    });
  }
}

async function storeData(data) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to storeData:', error);
  }
}

async function retrieveData() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to retrieveData:', error);
  }
}
