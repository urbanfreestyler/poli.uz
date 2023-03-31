import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Result.css";

const Result = (props) => {
  const location = useLocation();
  const resultData = location.state;
  const selectedAnswers = resultData.selectedAnswers;
  const questions = resultData.questions;
  const answers = resultData.answers;
  console.log(answers);

  let correctAnswers = 0;
  let incorrectAnswers = 0;

  questions &&
    questions.map((question, index) => {
      const selectedAnswer = selectedAnswers[question];
      const correctAnswer = answers[selectedAnswer];

      console.log(selectedAnswer);
      console.log(correctAnswer);

      if (correctAnswer === selectedAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    });

  const result = 1.5 * correctAnswers - 0.5 * incorrectAnswers;
  console.log(correctAnswers);
  console.log(incorrectAnswers);

  return (
    <>
      <Navbar />
      <div className="result__container">
        <div>YourResult</div>
        {result}
      </div>
    </>
  );
};

export default React.memo(Result);
