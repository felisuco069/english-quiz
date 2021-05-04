import shuffle from 'lodash.shuffle';
import { VerbEntityGlobal } from 'core/verbs';
import { VerbQuiz } from './test-multiple-choice.vm';
import { Verb, VerbCorrect, createDefaultVerbCorrect } from 'common/model';
import { pickRandomVerb } from 'common/business';

export const pickOtherOptions = (
  rightOption: Verb,
  selectedVerbs: string[],
  verbs: VerbEntityGlobal[],
): Verb[] => {
  const option1 = pickOption([rightOption], selectedVerbs, verbs);
  const option2 = pickOption([rightOption, option1], selectedVerbs, verbs);

  return [option1, option2];
};

const pickOption = (
  optionsExcluded: Verb[],
  selectedVerbs: string[],
  verbs: VerbEntityGlobal[]
) : Verb => {
  let option: Verb;

  do {
    option = pickRandomVerb(selectedVerbs, verbs);
  } while(optionsExcluded.findIndex(verb => verb.infinitive === option.infinitive) !== -1);
  
  return option;
};

export const answerIsCorrect = (verb: Verb, quiz: VerbQuiz): VerbCorrect => {
  const isCorrect = verb.infinitive === quiz.response;
  return {
    infinitive: isCorrect,
    past: isCorrect,
    participle: isCorrect,
    all: isCorrect,
  };
};

export const mixOptions = (options: Verb[]) => {
  return shuffle(options);
};