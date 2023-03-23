import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Variants.css";

function Variants() {
  const api_url = "http://127.0.0.1:4000/";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(api_url + "api/variants/");
        setData(response.data);
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

  const startQuiz = (variant) => {
    console.log(variant);
  };

  return (
    <div className="wrapper">
      <h2>Please choose a variant to start the quiz:</h2>

      <div className="variants-group">
        {data &&
          data.map(({ id, variant }) => {
            return (
              <a key={id} href={"/quiz/" + id} className="variants-link">
                {variant}
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default Variants;
