import { observable } from 'mobx';

export class TimerSettingsModel {
  @observable
  shouldIncreaseBrightness = true;
}
