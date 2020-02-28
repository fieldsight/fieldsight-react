/* eslint-disable */

export const groupQuestion = formQuestionsChildren => {
  const groupQuestionName = question => {
    if (question.type === 'group' || question.type === 'repeat') {
      question.children = question.children.map(childQuestion => {
        childQuestion.name = `${question.name}/${childQuestion.name}`;
        if (
          childQuestion.type === 'group' ||
          childQuestion.type === 'repeat'
        ) {
          groupQuestionName(childQuestion);
        }
        return childQuestion;
      });
    }

    return question;
  };
  return formQuestionsChildren.map(question => {
    return groupQuestionName(question);
  });
};

const findQuestion = children => {
  const filteredQuestions = [];

  const filterQuestionByType = questions => {
    questions.forEach(question => {
      if (question.type === 'group' || question.type === 'repeat') {
        return filterQuestionByType(question.children);
      }
      return filteredQuestions.push(question);
    });
  };

  filterQuestionByType(children);

  return filteredQuestions;
};

export default findQuestion;
