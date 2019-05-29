import { observable } from 'mobx';

import { initPersistedStore } from '../../storageUtils';

const STORAGE_KEY = 'ReferenceSettingsModel';

export class ReferenceSettingsModel {
  @observable
  expandedSection = null;

  @observable
  expandedItems = new Set();

  constructor() {
    initPersistedStore(this, STORAGE_KEY)
      .then(() => {
        // Re-hydrate special types that aren't serialized well.
        this.expandedItems = new Set(this.expandedItems);
      })
      .catch((error) => {
        console.error('Failed to initPersistedStore:', error);
      });
  }
}
