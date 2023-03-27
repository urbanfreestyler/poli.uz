import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Result.css";
const Result = (props) => {
  const location = useLocation();
  const resultData = location.state;
  const answers = resultData.answers;
  const correctAnswers = resultData.correctAnswers;
  const incorrectAnswers = resultData.incorrectAnswers;

  const Results = () => {
    const correctPoints = Object.keys(correctAnswers).length;
    const incorrrectPoints = Object.keys(incorrectAnswers).length;

    const result = 1.5 * correctPoints - 0.5 * incorrrectPoints;

    console.log(correctPoints);
    console.log(incorrrectPoints);
    console.log(result);

    return (
      <div>
        <div>Correct answers: {correctPoints}</div>
        <div>Incorrect answers: {incorrrectPoints}</div>
        <div>Result: {result}</div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="result__container">
        <div>YourResult</div>
        <Results />
      </div>
      {answers &&
        answers.map((question, index) => {
          return <div>{answers.question.text}</div>;
        })}
    </>
  );
};

export default Result;
