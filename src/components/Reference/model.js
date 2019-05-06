import { initPersistedStore } from '../../storageUtils';

const STORAGE_KEY = 'ReferenceSettingsModel';

export class ReferenceSettingsModel {
  constructor() {
    initPersistedStore(this, STORAGE_KEY).catch((error) => {
      console.error('Failed to initPersistedStore:', error);
    });
  }
}
