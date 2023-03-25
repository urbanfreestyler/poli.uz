import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getQuestions, getAnswers } from "../queries";

function Question() {
  const { quiz_id } = useParams();

  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  const [activeQuestion, setActiveQuestion] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState({});
  const [incorrectAnswers, setIncorrectAnswers] = useState({});

  const handleAnswer = (answer) => {
    if (answer.question in correctAnswers) {
      delete correctAnswers[answer.question];
    } else if (answer.question in incorrectAnswers) {
      delete incorrectAnswers[answer.question];
    } else {
      answer.is_correct === true
        ? (correctAnswers[answer.question] = true)
        : (incorrectAnswers[answer.question] = true);
    }

    console.log(correctAnswers);
    console.log(incorrectAnswers);
  };

  const showResults = () => {
    const result = Math.floor(
      1.5 * Object.keys(correctAnswers).length -
        0.5 * Object.keys(incorrectAnswers).length
    );
    console.log(result);
  };

  useEffect(() => {
    const questionList = async (pk) => {
      const questions = await getQuestions(pk);
      setQuestions(questions);
    };

    const answersList = async (pk) => {
      const answers = await getAnswers(pk);
      setAnswers(answers);
    };

    questionList(quiz_id);
    answersList(quiz_id);
  }, [quiz_id]);

  const changeQuestion = (index) => {
    setActiveQuestion(index);
  };

  return (
    <div>
      <div className="questions_list">
        {questions &&
          questions.map((question, index) => {
            return (
              <button
                key={question.id}
                disabled={activeQuestion === index ? true : false}
                onClick={() => {
                  changeQuestion(index);
                }}
              >
                {index + 1}
              </button>
            );
          })}
      </div>
      <div className="questions_list">
        {questions &&
          questions.map((question, index) => {
            return activeQuestion === index ? (
              <div key={question.id}>{question.text}</div>
            ) : null;
          })}
      </div>
      <ul>
        {answers &&
          answers.map((answer, index) => {
            return activeQuestion === answer.question - 1 ? (
              <li
                style={{ padding: "15px" }}
                key={answer.id}
                onClick={() => {
                  handleAnswer(answer);
                }}
              >
                answer: {answer.text}
              </li>
            ) : null;
          })}
      </ul>
      {questions &&
        questions.map((question, index) => {
          return activeQuestion === index &&
            activeQuestion < questions.length - 1 ? (
            <button
              onClick={() => {
                setActiveQuestion(activeQuestion + 1);
              }}
            >
              Next
            </button>
          ) : activeQuestion === index ? (
            <button
              onClick={() => {
                showResults();
              }}
            >
              Finish
            </button>
          ) : null;
        })}
    </div>
  );
}

export default Question;
