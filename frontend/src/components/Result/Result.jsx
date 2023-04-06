import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Result.css";

const Result = (props) => {
  const location = useLocation();
  const resultData = location.state;
  const questions = resultData.questions;
  const answers = resultData.answers;

  let correctAnswers = 0;
  let incorrectAnswers = 0;

  const calculateResult = () => {
    questions &&
      questions.map((question, index) => {
        if (question.selectedAnswer) {
          const answer = answers.find(
            (answer) => answer.id === question.selectedAnswer
          );
          answer.is_correct ? correctAnswers++ : incorrectAnswers++;
        }
      });

    const result = 1.5 * correctAnswers - 0.5 * incorrectAnswers;
    return result;
  };

  const showQuestionsWithAnswers = () => {
    return (
      questions &&
      questions.map((question, index) => {
        return (
          <div className="questions__content">
            <div className="questions__text" key={question.id}>
              <h4>
                {index + 1}. {question.text}
              </h4>
            </div>
            <div>
              <ol className="list-group answers__list">
                {answers &&
                  answers
                    .filter((answer) => answer.question === question.id)
                    .map((answer, index) => {
                      return (
                        <div
                          key={answer.id}
                          className={`result_answer
                          ${answer.is_correct ? "correct" : ""}
                          ${
                            question.selectedAnswer === answer.id &&
                            answer.is_correct
                              ? "selected"
                              : ""
                          } ${
                            question.selectedAnswer === answer.id &&
                            !answer.is_correct
                              ? "incorrect"
                              : ""
                          }
                        `}
                        >
                          <li>{answer.text}</li>
                        </div>
                      );
                    })}
              </ol>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div className="result_wrapper">
      <Navbar />
      <div id="wrapper">
        <div className="result__container">
          <div className="result__score">
            <h3>Your Score: {calculateResult()}</h3>
          </div>
        </div>

        <div>{showQuestionsWithAnswers()}</div>
      </div>
    </div>
  );
};

export default React.memo(Result);
