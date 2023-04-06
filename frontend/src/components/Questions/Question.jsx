const Question = ({ question, answers, onSelect, activeQuestion }) => {
  const handleOptionClick = (option) => {
    if (question.selectedAnswer === option) {
      onSelect(null);
    } else {
      onSelect(option);
    }
  };

  return (
    <>
      <div>
        <h5>Question {activeQuestion + 1}</h5>

        <div className="questions__text" key={question.id}>
          <h5>{question.text}</h5>
        </div>
      </div>
      <div>
        <ol className="list-group answers__list">
          {answers &&
            answers.map((answer, index) => {
              return (
                <div
                  key={answer.id}
                  className={`answer ${
                    question.selectedAnswer === answer.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    handleOptionClick(answer.id);
                  }}
                >
                    <li>{answer.text}</li>
                </div>
              );
            })}
        </ol>
      </div>
    </>
  );
};

export default Question;
