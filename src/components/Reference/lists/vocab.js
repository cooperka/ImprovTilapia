/**
 * These items may individually be subject to a different license than
 * the main project. See the LICENSE file in this directory for more details.
 *
 * To the best of my ability, I've included comments describing the source of
 * each group of items.
 */

export const basic = [
  // Cleaned up from TODO.
  // License: TODO

  // From my own head and things I've heard:
  {
    name: 'Short-form (adjective)',
    description:
      'A type of improv where you play structured "games" with predetermined rules (like in the TV show "Whose Line Is It Anyway?").',
    example: 'I watched short-form improv last night.',
    relatedTerms: ['Short form (noun)', 'Game (a)'],
  },
  {
    name: 'Short form (noun)',
    description: 'A performance of short-form improv.',
    example: 'I watched a short form last night.',
    relatedTerms: ['Short-form (adjective)'],
  },
  {
    name: 'Long-form (adjective)',
    description:
      'A type of improv where the structure is decided in advance but there\'s no predetermined "game" to be played.',
    example: 'I watched long-form improv last night.',
    relatedTerms: ['Long form (noun)'],
  },
  {
    name: 'Long form (noun)',
    description: 'A performance of long-form improv.',
    example: 'I watched a long form last night.',
    relatedTerms: ['Long-form (adjective)'],
  },
  {
    name: 'Character',
    description: "The person or thing you're acting like while you perform.",
    relatedTerms: ['Performer'],
  },
  {
    name: 'Performer',
    description: "You, the person (not the character you're playing).",
    relatedTerms: ['Character'],
  },
  {
    name: 'Warm up',
    description:
      'An activity that helps you "get in the moment", "get out of your head", and be prepared to take risks with the other performers you\'re about improvise with. Often fun and goofy. Warm ups also work well as icebreakers for new groups of people.',
  },
  {
    name: 'Exercise',
    description:
      'An activity with predetermined rules that helps you develop specific improv skills.',
    relatedTerms: ['Game (a)'],
  },
  {
    name: 'Game (a)',
    description:
      'An activity with predetermined rules that you can generally perform for an audience. Often used for short-form improv.',
    confusingTerms: ['Game (the)'],
    relatedTerms: ['Exercise', 'Short-form'],
  },
  {
    name: 'Scene',
    description:
      'A small performance that has a distinct start and end. This could be a single game in short-form, or one piece of a long-form set. The end of a scene is often triggered by an edit. A series of scenes generally make up a whole show.',
    relatedTerms: ['Show', 'Edit', 'Game (a)'],
  },
  {
    name: 'Show, Set, Performance',
    description:
      'The entire performance that an audience comes to watch. Generally made up of a series of scenes.',
    relatedTerms: ['Scene'],
  },
  {
    name: 'Edit',
    description:
      'A way to end a scene. For example, clapping loudly to signal that one scene is over.',
    relatedSections: ['Types of edits'],
  },
  {
    name: '"Yes, and"',
    description:
      'A common phrase used to convey the idea of "accepting" plus "advancing".',
    relatedTerms: ['Accepting', 'Advancing'],
  },
];

export const major = [
  // From my own head and things I've heard:
  {
    name: 'Ask, Ask-for',
    description:
      'A question you ask the audience, e.g. "Can I get a location?" to help inspire a scene.',
    relatedTerms: ['Suggestion'],
  },
  {
    name: 'Suggestion, Get',
    description:
      'A word or phrase you get from the audience, e.g. the answer to "Can I get a location?" that helps inspire a scene.',
    relatedTerms: ['Ask'],
  },
  {
    name: 'Accepting, Agreeing',
    description:
      'Embracing ideas and going along with them. You as a character can say "no" as long as you as a performer are still accepting the idea.',
    scene: [
      'Would you like a delicious apple? [offer]',
      'Not the poison apple, you\'re trying to kill me! [saying "no" while still accepting the idea]',
    ],
    relatedTerms: ['"Yes, and", Blocking'],
  },
  {
    name: 'Blocking, Denial, Rejecting',
    description:
      'Rejecting ideas and not advancing the narrative. One of the most common problems experienced by new improvisers.',
    note:
      'In conventional theater, blocking refers to pre-planned stage movement.',
    scene: [
      'Would you like a delicious apple?',
      "That's not an apple, it's a porcupine! [audience laughs, but now your partner has to scrap their idea and start over. Rude.]",
    ],
    relatedTerms: ['Accepting'],
  },
  {
    name: 'Canceling',
    description:
      'Making a previous idea irrelevant. Often problematic because it wastes time and causes the audience to stop caring about your ideas.',
    example:
      "Pulling out a guitar, but then realizing you don't know how to play it and deciding to go to the opera instead. Why not just start at the opera?",
    relatedTerms: ['Advancing, Blocking'],
  },
  {
    name: 'Advancing',
    description: 'Doing things to move the scene forward.',
    relatedTerms: ['Heightening, Exploring, Raising the stakes, "Yes, and"'],
  },
  {
    name: 'Heightening',
    description:
      "Building on what's already there. Taking things one step further.",
    example: "If you're upset, finding a reason to become furious.",
    relatedTerms: ['Raising the stakes, Advancing, Exploring'],
  },
  {
    name: 'Exploring',
    description:
      "Seeing where an idea leads. If one thing is true, what else might be true? Don't think too hard; often the most obvious ideas lead to the funniest scenes.",
    relatedTerms: ['Advancing'],
  },
  {
    name: 'Raising the stakes',
    description:
      'Increasing the possible consequences for the characters. Making your actions have more significance.',
    relatedTerms: ['Heightening, Advancing'],
  },
  {
    name: 'Objective, Motivation',
    description:
      'The thing your character wants. The driving force behind what your character does.',
  },
  {
    name: 'Naming',
    description:
      "Identifying things specifically. Giving characters names, describing objects, etc. This adds detail and helps the audience visualize what's going on.",
  },
  {
    name: 'Relationship',
    description:
      "How you're related to another character in the scene. Often surface-level.",
    example: 'Siblings, doctor/patient, jars of salsa on a grocery store shelf',
    relatedTerms: ['Dynamic'],
  },
  {
    name: 'Dynamic',
    description:
      'The way you interact with another character in the scene. Goes deeper than a simple relationship.',
    example: 'Supportive friendship, tender romance, aggressive competition',
    relatedTerms: ['Relationship'],
  },
  {
    name: 'Game (the)',
    description:
      'The "game" of a scene is often described as the "one weird thing" that you focus on and heighten. "Gamey" scenes often focus on the game more than the story, whereas "grounded" scenes are less gamey.',
    confusingTerms: ['Game (a)'],
    relatedTerms: ['Heightening, Dynamic, Raising the stakes'],
  },
  {
    name: 'Status',
    description:
      "Your character's place in the world; your self-worth or importance relative to other characters. Your status can change throughout a scene, which is often exciting to see. Objects can also have status.",
  },
];

export const other = [
  {
    name: 'Story',
    description: 'A sequence of events with a beginning, middle, and end.',
    relatedTerms: ['Plot, Narrative'],
  },
  {
    name: 'Plot',
    description:
      'The way the events in a story relate to each other. Cause and effect.',
    relatedTerms: ['Story, Narrative'],
  },
  {
    name: 'Narrative',
    description: 'How a story is told; its structure or interpretation.',
    relatedTerms: ['Story, Plot'],
  },
  {
    name: 'Beat',
    description: `1. A stand-alone part of a scene. Often contains significant events that affect the characters. Scenes sometimes have multiple beats. Edits generally happen at the end of a beat.
2. A specific situation that can be revisited later. This term is most often used during the Harold, a form composed of three beats.
3. A small, purposeful pause.`,
    relatedTerms: ['Scene, Edit'],
  },
];
