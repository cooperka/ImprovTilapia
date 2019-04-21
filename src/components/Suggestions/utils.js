import { relationships } from '../../suggestions/relationships';
import { occupations } from '../../suggestions/occupations';
import {
  clearEmotions,
  groupedEmotions,
  emotionalDiads,
} from '../../suggestions/emotions';

const getRandomThing = (list) => () => {
  return list[Math.floor(Math.random() * list.length)];
};

export const suggestionTypes = {
  RELATIONSHIP: {
    name: 'Relationship',
    getRandomThing: getRandomThing(relationships),
  },
  OCCUPATION: {
    name: 'Occupation',
    getRandomThing: getRandomThing(occupations),
  },
  EMOTION_SHORT: {
    name: 'Emotion (short list)',
    getRandomThing: getRandomThing(clearEmotions),
  },
  EMOTION_FULL: {
    name: 'Emotion (full list)',
    getRandomThing: getRandomThing(groupedEmotions),
  },
  EMOTIONAL_DIAD: {
    name: 'Emotional diad',
    getRandomThing: getRandomThing(emotionalDiads),
  },
};
