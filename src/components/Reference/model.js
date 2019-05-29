import { observable, action } from 'mobx';

import { initPersistedStore } from '../../storageUtils';
import { references } from './utils';

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

  @action
  expandAllItems() {
    this.expandedSection = references[0].name;
    references.forEach(({ items }) => {
      items.forEach(({ name }) => this.expandedItems.add(name));
    });
  }

  @action
  collapseAllItems() {
    this.expandedSection = null;
    this.expandedItems.clear();
  }
}
