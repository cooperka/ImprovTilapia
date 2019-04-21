import { relationships } from '../../suggestions/relationships';
import { occupations } from '../../suggestions/occupations';
import {
  clearEmotions,
  groupedEmotions,
  emotionalDiads,
} from '../../suggestions/emotions';
import { locations } from '../../suggestions/locations';

const getRandomThing = (list) => () => {
  return list[Math.floor(Math.random() * list.length)];
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
    getRandomThing: getRandomThing(relationships),
  },
  [suggestionTypes.OCCUPATION]: {
    name: 'Occupation',
    getRandomThing: getRandomThing(occupations),
  },
  [suggestionTypes.EMOTION_SHORT]: {
    name: 'Emotion (main)',
    getRandomThing: getRandomThing(clearEmotions),
  },
  [suggestionTypes.EMOTION_FULL]: {
    name: 'Emotion (full)',
    getRandomThing: getRandomThing(groupedEmotions),
  },
  [suggestionTypes.EMOTIONAL_DIAD]: {
    name: 'Emotional diad',
    getRandomThing: getRandomThing(emotionalDiads),
  },
  [suggestionTypes.LOCATION]: {
    name: 'Location',
    getRandomThing: getRandomThing(locations),
  },
};
