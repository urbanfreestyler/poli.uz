import axios from "axios";

const host_url = "https://api.poli.uz/";

const fetchData = async (url) => {
  try {
    const response = await axios.get(host_url + url);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getVariants = async () => {
  return await fetchData("api/variants/");
};

export const getQuestions = async (pk) => {
  return await fetchData(`api/quiz-questions/${pk}`);
};

export const getAnswers = async (pk) => {
  return await fetchData(`api/answers/${pk}`);
};

export const get_explanation = async (question_id) => {
  return await fetchData(`api/explanation/${question_id}`);
};
