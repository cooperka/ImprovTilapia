import { observable } from 'mobx';

import { initPersistedStore } from '../../storageUtils';

const STORAGE_KEY = 'SuggestionsSettingsModel';

export class SuggestionsSettingsModel {
  @observable
  shouldAutoSuggest = true;

  @observable
  autoSuggestIntervalSeconds = 10;

  constructor() {
    initPersistedStore(this, STORAGE_KEY).catch((error) => {
      console.error('Failed to initPersistedStore:', error);
    });
  }
}
