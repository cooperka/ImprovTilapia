import { Duration } from 'luxon';
import React from 'react';
import { shallow } from 'enzyme';

import Component from './component';
import { SuggestionsSettingsModel } from './model';

jest.useFakeTimers();

const props = {
  navigation: {},
  suggestionsSettings: null,
};

beforeEach(() => {
  props.suggestionsSettings = new SuggestionsSettingsModel();
});

it('renders as expected', async () => {
  const wrapper = shallow(<Component {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it('handles timers', async () => {
  props.suggestionsSettings.shouldAutoSuggest = true;

  const wrapper = shallow(<Component {...props} />);

  // Get a suggestion to start the timer.
  wrapper
    .find({ id: 'Location' })
    .props()
    .onPress();

  const originalSuggestion = wrapper.state('currSuggestion');

  // Advance a few seconds.
  jest.advanceTimersByTime(
    Duration.fromObject({ seconds: 2 }).as('milliseconds'),
  );

  expect(wrapper.state('currSuggestion')).toEqual(originalSuggestion);

  // Complete the timer to get a new suggestion.
  jest.advanceTimersByTime(
    Duration.fromObject({ seconds: 10 }).as('milliseconds'),
  );

  expect(wrapper.state('currSuggestion')).not.toEqual(originalSuggestion);
});
