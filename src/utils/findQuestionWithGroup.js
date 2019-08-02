const findQuestionWithGroup = (children, type) => {
  const filteredQuestions = [
    { bind: null, type: null, name: "--Select Question--", label: null }
  ];

  const filterQuestionByType = (questions, name) => {
    // if (type) {
    questions.forEach(question => {
      if (question.type === type) {
        filteredQuestions.push({
          ...question,
          groupName: name ? name : null
        });
      }

      if (question.type === "group" || question.type === "repeat") {
        filterQuestionByType(
          question.children,
          name ? `${name}/${question.name}` : question.name
        );
      }
    });
  };

  filterQuestionByType(children);
  return filteredQuestions;
};

export default findQuestionWithGroup;
