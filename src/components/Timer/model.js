import * as _ from 'lodash';
import { observable, autorun, toJS } from 'mobx';
import { storeData, retrieveData } from '../../storageUtils';

const STORAGE_KEY = 'TimerSettingsModel';

/** Debounce slightly. */
const PERSISTENCE_DELAY_MS = 100;

export class TimerSettingsModel {
  @observable
  shouldIncreaseBrightness = true;

  constructor() {
    retrieveData(STORAGE_KEY).then((savedValues) => {
      // Set initial state if there's something valid saved.
      if (_.isPlainObject(savedValues)) {
        Object.assign(this, savedValues);
      }

      // Persist state any time it changes.
      autorun(
        async () => {
          await storeData(STORAGE_KEY, toJS(this));
        },
        {
          delay: PERSISTENCE_DELAY_MS,
        },
      );
    });
  }
}
