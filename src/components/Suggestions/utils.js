import { relationships } from '../../suggestions/relationships';
import { occupations } from '../../suggestions/occupations';

const getRandomThing = (list) => () => {
  return list[Math.floor(Math.random() * list.length)];
};

export const getRandomRelationship = getRandomThing(relationships);
export const getRandomOccupation = getRandomThing(occupations);
