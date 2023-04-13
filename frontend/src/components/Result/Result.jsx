import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Result.css";
import { get_explanation } from "../queries";
import { ClipLoader } from "react-spinners";

const Result = (props) => {
  const location = useLocation();
  const resultData = location.state;
  const questions = resultData.questions;
  const answers = resultData.answers;

  const [loading, setLoading] = useState(true);

  const [explanations, setExplanations] = useState([]);

  const override: CSSProperties = {
    display: "block",
    margin: "10px auto",
  };

  const fetchExplanation = async (question_id) => {
    const explanation = await get_explanation(question_id);
    return explanation;
  };

  const getExplanations = async () => {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const explanation = await fetchExplanation(question.id);
      setExplanations((prevState) => {
        return [...prevState, explanation.text];
      });
      setLoading(!loading);
    }
  };

  useEffect(() => {
    getExplanations();
  }, []);
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
        const explanation = explanations[index];
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
                          className={`result_answer ${
                            question.selectedAnswer === answer.id &&
                            answer.is_correct
                              ? "correct"
                              : ""
                          }${
                            question.selectedAnswer === answer.id &&
                            !answer.is_correct
                              ? "incorrect"
                              : ""
                          }
                          ${
                            question.selectedAnswer && answer.is_correct
                              ? "correct"
                              : ""
                          }`}
                        >
                          <li>{answer.text}</li>
                        </div>
                      );
                    })}
              </ol>
            </div>
            <div className="questions__text" key={`explanation${question.id}`}>
              <h4>Explanation: {explanation}</h4>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div className="result_wrapper">
      <Navbar />
      <div id="wrapper" className="result__questions">
        <div className="result__container">
          <div className="result__score">
            <h3>Your Score: {calculateResult()}</h3>
          </div>
        </div>
        <ClipLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {loading && <h4 className="text-center">Preparing your test review</h4>}
        <div>{explanations.length > 0 && showQuestionsWithAnswers()}</div>
      </div>
    </div>
  );
};

export default React.memo(Result);
