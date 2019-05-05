import * as _ from 'lodash';
import { AsyncStorage } from 'react-native';
import { autorun, toJS } from 'mobx';

/** Debounce slightly. */
const PERSISTENCE_DELAY_MS = 100;

const VERBOSE = false;

function logVerbose(...args) {
  if (VERBOSE) {
    console.debug(...args);
  }
}

/**
 * Given a MobX store, make it persist its values on change.
 */
export async function initPersistedStore(store, key) {
  const savedValues = await retrieveData(key);

  // Set initial state if there's something valid saved.
  if (_.isPlainObject(savedValues)) {
    Object.assign(store, savedValues);
    logVerbose(`Initialized store for ${key}:`, savedValues);
  }

  // Persist state any time it changes.
  autorun(
    async () => {
      await storeData(key, toJS(store));
    },
    {
      delay: PERSISTENCE_DELAY_MS,
    },
  );
}

export async function storeData(key, data) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    logVerbose(`Stored data for ${key}:`, data);
  } catch (error) {
    console.error('Failed to storeData:', error);
  }
}

export async function retrieveData(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    const parsed = JSON.parse(data);
    logVerbose('Got data from storage:', parsed);
    return parsed;
  } catch (error) {
    console.error('Failed to retrieveData:', error);
  }
}
