const findQuestion = (children, type) => {
  const filteredQuestions = [
    { bind: null, type: null, name: "--Select Question--", label: null }
  ];

  const filterQuestionByType = questions => {
    if (type) {
      questions.forEach(question => {
        if (question.type === type) {
          filteredQuestions.push(question);
        }

        if (question.type === "group" || question.type === "repeat") {
          filterQuestionByType(question.children);
        }
      });
    } else {
      questions.forEach(question => {
        if (question.type === "group" || question.type === "repeat") {
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
