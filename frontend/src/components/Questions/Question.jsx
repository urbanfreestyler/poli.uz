import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Question() {
  const { id } = useParams();
  console.log(id);
  const api_url = "http://127.0.0.1:4000/";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(api_url + "api/questions/");
        setData(response.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {data &&
        data.map(({ id, text, answers }) => {
          return (
            <div>
              {text}
              {answers}
            </div>
          );
        })}
    </div>
  );
}

export default Question;
