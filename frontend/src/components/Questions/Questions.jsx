import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import { getQuestions, getAnswers } from "../queries";
import "./Questions.css";
import Question from "./Question";
import ClipLoader from "react-spinners/ClipLoader";

const Questions = () => {
  const { quiz_id } = useParams();
  const [loading, setLoading] = useState(true);

  const override: CSSProperties = {
    display: "block",
    margin: "10px auto",
  };

  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  const [activeQuestion, setActiveQuestion] = useState(0);

  const questionsList = async (pk) => {
    const questions = await getQuestions(pk);
    setQuestions(questions);
    setLoading(!loading);
  };

  const answersList = async (pk) => {
    const answers = await getAnswers(pk);
    setAnswers(answers);
  };

  useEffect(() => {
    const fetchData = async () => {
      await questionsList(quiz_id);
      await answersList(quiz_id);
    };
    fetchData();
  }, [quiz_id]);

  const handleQuestionChange = (index) => {
    setActiveQuestion(index);
  };

  function handleSelect(answer) {
    const updatedQuestions = [...questions];
    updatedQuestions[activeQuestion] = {
      ...updatedQuestions[activeQuestion],
      selectedAnswer: answer,
    };

    setQuestions(updatedQuestions);
  }

  const resultData = {
    questions,
    answers,
  };

  return (
    <>
      <div className="page_container">
        <Navbar />
        <div className="questions__wrapper" id="wrapper">
          <div className="questions__list">
            <h4>Questions</h4>
            <div className="questions__btns">
              {questions &&
                questions.map((question, index) => {
                  return (
                    <button
                      key={index + 1}
                      className=""
                      disabled={activeQuestion === index}
                      onClick={() => {
                        handleQuestionChange(index);
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                })}
            </div>
            <ClipLoader
              color={"#ffffff"}
              loading={loading}
              cssOverride={override}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {loading && <h5 style={{ textAlign: "center" }}>Loading...</h5>}
          </div>

          <div className="questions__answer_wrapper">
            <div className="questions__content">
              <ClipLoader
                color={"#ffffff"}
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {questions && (
                <Question
                  key={questions && questions[activeQuestion].id}
                  question={questions && questions[activeQuestion]}
                  answers={
                    answers &&
                    answers.filter(
                      (answer) =>
                        answer.question === questions[activeQuestion].id
                    )
                  }
                  onSelect={handleSelect}
                  activeQuestion={activeQuestion}
                />
              )}

              <div className="nav__btns">
                {questions && activeQuestion > 0 && (
                  <div className="nav__btn">
                    <button
                      className="button button-large button-circle button-3d button-dirtygreen"
                      onClick={() => {
                        setActiveQuestion(activeQuestion - 1);
                      }}
                    >
                      Prev.
                    </button>
                  </div>
                )}
                {questions && activeQuestion < questions.length - 1 && (
                  <div className="nav__btn">
                    <button
                      className="button button-large button-circle button-3d button-dirtygreen"
                      onClick={() => {
                        setActiveQuestion(activeQuestion + 1);
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
                {questions && activeQuestion === questions.length - 1 && (
                  <div className="nav__btn">
                    <Link
                      className="button button-large button-circle button-3d"
                      to="/result"
                      state={resultData}
                    >
                      Finish
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
