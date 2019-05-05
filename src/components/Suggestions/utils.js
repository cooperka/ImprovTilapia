import * as _ from 'lodash';

import { relationships } from './lists/relationships';
import { occupations } from './lists/occupations';
import {
  clearEmotions,
  groupedEmotions,
  emotionalDiads,
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
  EMOTIONAL_DIAD: 'EMOTIONAL_DIAD',
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
    name: 'Emotion (main)',
    getRandomThing: getRandomThingFactory(clearEmotions),
  },
  [suggestionTypes.EMOTION_FULL]: {
    name: 'Emotion (full)',
    getRandomThing: getRandomThingFactory(groupedEmotions),
  },
  [suggestionTypes.EMOTIONAL_DIAD]: {
    name: 'Emotional diad',
    getRandomThing: getRandomThingFactory(emotionalDiads),
  },
  [suggestionTypes.LOCATION]: {
    name: 'Location',
    getRandomThing: getRandomThingFactory(locations),
  },
};
