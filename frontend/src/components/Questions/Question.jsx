const Question = ({ question, answers, onSelect }) => {
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
        <div className="questions__text" key={question.id}>
          {question.text}
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
