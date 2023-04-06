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
          <div>
            <div key={question.id}>{question.text}</div>
            {answers
              .filter((answer) => answer.question === question.id)
              .map((answer) => {
                return (
                  <div key={answer.id}>
                    {answer.text}{" "}
                    {question.selectedAnswer === answer.id &&
                      !answer.is_correct &&
                      "❌"}
                    {answer.is_correct && "✅"}
                  </div>
                );
              })}
          </div>
        );
      })
    );
  };

  return (
    <>
      <Navbar />

      <div className="result__container">
        <div className="result__score">Your Score:</div>
        {calculateResult()}
      </div>

      <div>{showQuestionsWithAnswers()}</div>
    </>
  );
};

export default React.memo(Result);
