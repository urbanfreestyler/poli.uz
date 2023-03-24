import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { getQuestions, getAnswers } from "../queries";

function Question() {
  const { quiz_id } = useParams();

  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

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
  return (
    <div>
      {questions &&
        questions.map(({ id, text, variant }) => {
          return <div key={id}>{text}</div>;
        })}

      {answers &&
        answers.map(({ id, text, question, is_correct }) => {
          return (
            <div key={id}>
              Question: {question}, answer: {text} {is_correct}
            </div>
          );
        })}
    </div>
  );
}

export default Question;
