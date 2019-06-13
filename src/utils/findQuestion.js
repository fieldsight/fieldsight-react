const findQuestion = (children, type) => {
  const filteredQuestions = [];
  const filterQuestionByType = questions => {
    if (type) {
      questions.forEach(question => {
        if (question.type === type) {
          filteredQuestions.push(question);
        }

        if (question.type === "group") {
          filterQuestionByType(question.children);
        }
      });
    } else {
      questions.forEach(question => {
        if (question.type === "group") {
          return filterQuestionByType(question.children);
        }
        filteredQuestions.push(question);
      });
    }
  };
  filterQuestionByType(children);
  return filteredQuestions;
};

export default findQuestion;
