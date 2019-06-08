import * as _ from 'lodash';

import { relationships } from './lists/relationships';
import { occupations } from './lists/occupations';
import {
  clearEmotions,
  groupedEmotions,
  emotionalDyads,
} from './lists/emotions';
import { locations } from './lists/locations';

const getRandomThingFactory = (list) => {
  let shuffledList;
  let shuffleIndex;

  const reset = () => {
    shuffledList = _.shuffle(list);
    shuffleIndex = 0;
  };

  reset();

  return () => {
    if (shuffleIndex >= shuffledList.length) {
      reset();
    }
    return shuffledList[shuffleIndex++];
  };
};

export const suggestionTypes = {
  RELATIONSHIP: 'RELATIONSHIP',
  OCCUPATION: 'OCCUPATION',
  EMOTION_SHORT: 'EMOTION_SHORT',
  EMOTION_FULL: 'EMOTION_FULL',
  EMOTIONAL_DYAD: 'EMOTIONAL_DYAD',
  LOCATION: 'LOCATION',
};

export const suggestions = {
  [suggestionTypes.RELATIONSHIP]: {
    name: 'Relationship',
    getRandomThing: getRandomThingFactory(relationships),
  },
  [suggestionTypes.OCCUPATION]: {
    name: 'Occupation',
    getRandomThing: getRandomThingFactory(occupations),
  },
  [suggestionTypes.EMOTION_SHORT]: {
    name: 'Emotion (70)',
    getRandomThing: getRandomThingFactory(clearEmotions),
  },
  [suggestionTypes.EMOTION_FULL]: {
    name: 'Emotion (150)',
    getRandomThing: getRandomThingFactory(groupedEmotions),
  },
  [suggestionTypes.EMOTIONAL_DYAD]: {
    name: 'Dyad',
    getRandomThing: getRandomThingFactory(emotionalDyads),
  },
  [suggestionTypes.LOCATION]: {
    name: 'Location',
    getRandomThing: getRandomThingFactory(locations),
  },
};
