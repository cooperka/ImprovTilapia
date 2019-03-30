import { relationships } from '../../suggestions/relationships';
import { occupations } from '../../suggestions/occupations';

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
};
