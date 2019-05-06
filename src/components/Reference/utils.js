import { vocab } from './lists/vocab';

export const referenceTypes = {
  VOCAB: 'VOCAB',
};

export const references = {
  [referenceTypes.VOCAB]: {
    name: 'Vocabulary',
    items: vocab,
  },
};
