import { observable } from 'mobx';

import { initPersistedStore } from '../../storageUtils';

const STORAGE_KEY = 'SuggestionsSettingsModel';

export class SuggestionsSettingsModel {
  constructor() {
    initPersistedStore(this, STORAGE_KEY).catch((error) => {
      console.error('Failed to initPersistedStore:', error);
    });
  }
}
