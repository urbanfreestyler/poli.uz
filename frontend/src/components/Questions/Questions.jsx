import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
<<<<<<< HEAD
import { Link } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import { getQuestions, getAnswers } from "../queries";
import "./Questions.css";
=======
import Navbar from "../Navbar/Navbar";
import { getQuestions, getAnswers } from "../queries";

import './Questions.css';
>>>>>>> 6237c69b9e9deea1bf9129185cec02ce73214020

const Question = () => {
  const { quiz_id } = useParams();

  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  const [activeQuestion, setActiveQuestion] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState({});
  const [incorrectAnswers, setIncorrectAnswers] = useState({});

  const handleAnswer = (answer) => {
<<<<<<< HEAD
    if (answer.is_correct) {
      answer.id === correctAnswers[answer.question]
        ? delete correctAnswers[answer.question]
        : (correctAnswers[answer.question] = answer.id);
=======
    if (answer.question in correctAnswers) {
      delete correctAnswers[answer.question];
      // document.body.className.remove("selected")
    } else if (answer.question in incorrectAnswers) {
>>>>>>> 6237c69b9e9deea1bf9129185cec02ce73214020
      delete incorrectAnswers[answer.question];
      // document.body.className.remove("selected")
    } else {
<<<<<<< HEAD
      answer.id === incorrectAnswers[answer.question]
        ? delete incorrectAnswers[answer.question]
        : (incorrectAnswers[answer.question] = answer.id);
      delete correctAnswers[answer.question];
=======
      answer.is_correct === true
        ? (correctAnswers[answer.question] = true)
        : (incorrectAnswers[answer.question] = true);
      // document.body.className.add("selected")
      
>>>>>>> 6237c69b9e9deea1bf9129185cec02ce73214020
    }

    console.log(correctAnswers);
    console.log(incorrectAnswers);
  };

  const showResults = () => {
<<<<<<< HEAD
    const result =
      1.5 * Object.keys(correctAnswers).length -
      0.5 * Object.keys(incorrectAnswers).length;
=======
    const result = 
      1.5 * Object.keys(correctAnswers).length -
        0.5 * Object.keys(incorrectAnswers).length;
>>>>>>> 6237c69b9e9deea1bf9129185cec02ce73214020
    console.log(result);
  };

  useEffect(() => {
    const questionList = async (pk) => {
      const questions = await getQuestions(pk);
      setQuestions(questions);
    };

    const activeQuestionDetector = () => {
<<<<<<< HEAD
      if (questions != null) {
        questions.map((index) => {
          if (activeQuestion === index) {
            document.body.classList.add("selected");
            console.log(index);
          }
        });
      }
    };
=======
      if(questions != null) {
        questions.map((index) => {
          if(activeQuestion === index){
             document.body.classList.add('selected')
             console.log(index);
           }
         })
      }
    }
>>>>>>> 6237c69b9e9deea1bf9129185cec02ce73214020

    const answersList = async (pk) => {
      const answers = await getAnswers(pk);
      setAnswers(answers);
    };
    questionList(quiz_id);
    answersList(quiz_id);
<<<<<<< HEAD
    activeQuestionDetector();
  }, [quiz_id, activeQuestion, questions]);
=======
    activeQuestionDetector()
  }, [quiz_id]);
>>>>>>> 6237c69b9e9deea1bf9129185cec02ce73214020

  const changeQuestion = (index) => {
    setActiveQuestion(index);
  };

  const resultData = {
    questions: questions,
    correctAnswers: correctAnswers,
    incorrectAnswers: incorrectAnswers,
  };

  return (
    <>
<<<<<<< HEAD
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
          <div className="container">
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
                          className="list-group-item answer"
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
                      <div>
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
                      <button
                        className="button button-large button-circle button-3d button-dirtygreen"
                        onClick={() => {
                          setActiveQuestion(activeQuestion + 1);
                        }}
                      >
                        Next
                      </button>
                    ) : (
                      <div>
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
=======
    <Navbar />

    <div className="questions__wrapper">
      <div className="questions__list">
        <p>
          Questions
        </p>
        <div className="questions__btns">
          {questions &&
          questions.map((question, index) => {
            return (
              <button
                key={index+1}
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
        <div className="container">
          <div className="questions__content">
            {questions &&
              questions.map((question, index) => {
                return activeQuestion === index ? (
                  <div>
                    Question {index+1}
                    <div className="questions__text" key={question.id}>{question.text}</div>
                  </div>
                ) : null;
              })}
            <div>
              <ul className="list-group">
              {answers &&
                answers.map((answer, index) => {
                  return activeQuestion === answer.question - 1 ? (
                    <div
                      className="list-group-item answer"
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
                  activeQuestion === questions.length - 1 ? 
                  (
                    <div>
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
                          showResults();
                        }}
                      >
                        Finish
                      </button>
                    </div>
                  ) : activeQuestion === index && index === 0 ? 
                  (
                    <button
                      className="button button-large button-circle button-3d button-dirtygreen"
                      onClick={() => {
                        setActiveQuestion(activeQuestion + 1);
                      }}
                    >
                      Next
                    </button>
                  )
                  :
                  (
                    <div>
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
              ) : null
            })
          }</div>
        </div>
      </div>

    </div>
>>>>>>> 6237c69b9e9deea1bf9129185cec02ce73214020
    </>
  );
};

export default Question;