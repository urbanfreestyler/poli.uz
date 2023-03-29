// - Remove console.log statements as they can slow down the application.
// - Instead of using Object.keys to get the length of correctAnswers and incorrectAnswers, use the length property directly as it is faster and more efficient.
// - Consider using useMemo hook to memoize the Results component and avoid unnecessary re-renders.
// - Consider using React.memo to memoize the Result component and avoid unnecessary re-renders.

import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Result.css";

const Result = (props) => {
  const location = useLocation();
  const resultData = location.state;
  const answers = resultData.answers;
  const correctAnswers = resultData.correctAnswers;
  const incorrectAnswers = resultData.incorrectAnswers;

  const Results = useMemo(() => {
    const correctPoints = correctAnswers.length;
    const incorrrectPoints = incorrectAnswers.length;

    const result = 1.5 * correctPoints - 0.5 * incorrrectPoints;

    return (
      <div>
        <div>Correct answers: {correctPoints}</div>
        <div>Incorrect answers: {incorrrectPoints}</div>
        <div>Result: {result}</div>
      </div>
    );
  }, [correctAnswers, incorrectAnswers]);

  return (
    <>
      <Navbar />
      <div className="result__container">
        <div>YourResult</div>
        {Results}
      </div>
      {answers &&
        answers.map((question, index) => {
          return <div>{answers.question}</div>;
        })}
    </>
  );
};

export default React.memo(Result);
