import axios from "axios";

const api_url = "http://127.0.0.1:8000/";

export const getVariants = async () => {
  try {
    const variants = await axios.get(api_url + "api/variants/");
    return variants.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getQuestions = async (pk) => {
  try {
    const questions = await axios.get(api_url + "api/quiz-questions/" + pk);
    return questions.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAnswers = async (pk) => {
  try {
    const answers = await axios.get(api_url + "api/answers/" + pk);
    return answers.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getExplanations = async (pk) => {
  try {
    const explanations = await axios.get(api_url + "api/explanations/" + pk);
    return explanations.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// export {getVariants getQuestions getAnswers getExplanations}
