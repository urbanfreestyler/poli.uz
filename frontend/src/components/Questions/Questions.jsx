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

  const questionList = async (pk) => {
    const questions = await getQuestions(pk);
    setQuestions(questions);
  };

  const answersList = async (pk) => {
    const answers = await getAnswers(pk);
    setAnswers(answers);
  };
  const handleAnswer = (answer) => {
    const question = answer.question;
    const id = answer.id;
    if (question === selectedAnswers[question]) {
      const newAnswers = { ...selectedAnswers };
      delete newAnswers[question];
      setSelectedAnswers(newAnswers);
    } else {
      setSelectedAnswers({ ...selectedAnswers, [question]: id });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await questionList(quiz_id);
      await answersList(quiz_id);
    };
    fetchData();

    console.log(selectedAnswers);
  }, [quiz_id, selectedAnswers]);

  const handleQuestionChange = (index) => {
    setActiveQuestion(index);
  };

  const resultData = {
    selectedAnswers,
    questions,
    answers,
  };

  return (
    <>
      <div div className="page_container">
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
                        handleQuestionChange(index);
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
                  return (
                    activeQuestion === index && (
                      <div>
                        Question {index + 1}
                        <div className="questions__text" key={question.id}>
                          {question.text}
                        </div>
                      </div>
                    )
                  );
                })}
              <div>
                <ol className="list-group answers__list">
                  {answers &&
                    answers.map((answer, index) => {
                      return (
                        activeQuestion === answer.question - 1 && (
                          <div
                            key={answer.id}
                            className={`answer ${
                              selectedAnswers[answer.question] === answer.id
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              handleAnswer(answer);
                            }}
                          >
                            <li>{answer.text}</li>
                          </div>
                        )
                      );
                    })}
                </ol>
              </div>
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

export default Question;
