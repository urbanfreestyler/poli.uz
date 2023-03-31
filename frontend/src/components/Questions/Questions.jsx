import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import { getQuestions, getAnswers } from "../queries";
import "./Questions.css";

const Question = () => {
  const { quiz_id } = useParams();

  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  const [activeQuestion, setActiveQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswer = (answer) => {
    const question = answer.question;
    const id = answer.id;
    id === selectedAnswers[question]
      ? delete selectedAnswers[question]
      : (selectedAnswers[question] = id);
    console.log(selectedAnswers);
  };

  const questionList = async (pk) => {
    const questions = await getQuestions(pk);
    setQuestions(questions);
  };

  const answersList = async (pk) => {
    const answers = await getAnswers(pk);
    setAnswers(answers);
  };

  useEffect(() => {
    const fetchData = async () => {
      await questionList(quiz_id);
      await answersList(quiz_id);
    };
    fetchData();
  }, [quiz_id]);

  const changeQuestion = (index) => {
    setActiveQuestion(index);
  };

  const resultData = {
    selectedAnswers,
    questions,
    answers,
  };

  return (
    <>
      <div className="page_container">
        <Navbar />
        <div className="questions__wrapper">
          <div className="questions__list">
            <p>Questions</p>
            <div className="questions__btns">
              {questions &&
                questions.map((question, index) => {
                  return (
                    <button
                      key={index + 1}
                      className=""
                      onClick={() => {
                        changeQuestion(index);
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="questions__answer_wrapper">
            <div className="questions__content">
              {questions &&
                questions.map((question, index) => {
                  return activeQuestion === index ? (
                    <div>
                      Question {index + 1}
                      <div className="questions__text" key={question.id}>
                        {question.text}
                      </div>
                    </div>
                  ) : null;
                })}
              <div>
                <ul className="list-group">
                  {answers &&
                    answers.map((answer, index) => {
                      return activeQuestion === answer.question - 1 ? (
                        <div
                          className={
                            answer.id === selectedAnswers[answer.question]
                              ? "list-group-item answer selected"
                              : "list-group-item answer"
                          }
                          key={answer.id}
                          onClick={() => {
                            handleAnswer(answer);
                          }}
                        >
                          {answer.text}
                        </div>
                      ) : null;
                    })}
                </ul>
              </div>
              {questions &&
                questions.map((question, index) => {
                  return activeQuestion === index ? (
                    activeQuestion === questions.length - 1 ? (
                      <div className="nav__btn">
                        <button
                          className="button button-large button-circle button-3d button-dirtygreen"
                          onClick={() => {
                            setActiveQuestion(activeQuestion - 1);
                          }}
                        >
                          Prev.
                        </button>
                        <Link
                          className="button button-large button-circle button-3d button-dirtygreen"
                          to="/result"
                          state={resultData}
                        >
                          Finish
                        </Link>
                      </div>
                    ) : activeQuestion === index && index === 0 ? (
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
                    ) : (
                      <div className="nav__btn">
                        <button
                          className="button button-large button-circle button-3d button-dirtygreen"
                          onClick={() => {
                            setActiveQuestion(activeQuestion - 1);
                          }}
                        >
                          Prev.
                        </button>
                        <button
                          className="button button-large button-circle button-3d button-dirtygreen"
                          onClick={() => {
                            setActiveQuestion(activeQuestion + 1);
                          }}
                        >
                          Next
                        </button>
                      </div>
                    )
                  ) : null;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
