import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { getQuestions, getAnswers } from "../queries";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Question() {
  const { quiz_id } = useParams();

  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    const questionList = async (pk) => {
      const questions = await getQuestions(pk);
      setQuestions(questions);
    };

    const answersList = async (pk) => {
      const answers = await getAnswers(pk);
      setAnswers(answers);
    };

    questionList(quiz_id);
    answersList(quiz_id);
  }, []);

  const changeQuestion = (index) => {
    setActiveQuestion(index);
  };

  return (
    <div>
      <div className="questions_list">
        {questions &&
          questions.map((question, index) => {
            return (
              <button
                key={question.id}
                disabled={activeQuestion === index ? true : false}
                onClick={() => {
                  changeQuestion(index);
                }}
              >
                {index + 1}
              </button>
            );
          })}
      </div>
      <div className="questions_list">
        {questions &&
          questions.map((question, index) => {
            return activeQuestion === index ? (
              <div key={question.id}>{question.text}</div>
            ) : null;
          })}
      </div>
      {answers &&
        answers.map((answer, index) => {
          return activeQuestion === answer.question - 1 ? (
            <div key={answer.id}>
              Question: {answer.question}, answer: {answer.text}
              {answer.is_correct}
            </div>
          ) : null;
        })}
      {questions &&
        questions.map((question, index) => {
          return activeQuestion === index &&
            activeQuestion < questions.length - 1 ? (
            <button
              onClick={() => {
                setActiveQuestion(activeQuestion + 1);
              }}
            >
              Next
            </button>
          ) : activeQuestion === index ? (
            <button
              onClick={() => {
                setActiveQuestion(activeQuestion + 1);
              }}
            >
              Finish
            </button>
          ) : null;
        })}
    </div>
  );
}

export default Question;
