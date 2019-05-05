import { observable } from 'mobx';

import { initPersistedStore } from '../../storageUtils';

const STORAGE_KEY = 'TimerSettingsModel';

export class TimerSettingsModel {
  @observable
  shouldIncreaseBrightness = true;

  constructor() {
    initPersistedStore(this, STORAGE_KEY).catch((error) => {
      console.error('Failed to initPersistedStore:', error);
    });
  }
}
