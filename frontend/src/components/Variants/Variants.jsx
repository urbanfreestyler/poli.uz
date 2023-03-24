import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Variants.css";
import { getVariants } from "../queries";

function Variants() {
  const api_url = "http://127.0.0.1:4000/";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const variantsList = async () => {
      const variants = await getVariants();
      setData(variants);
    };
    variantsList();
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
              <a key={id} href={"/quiz/" + variant} className="variants-link">
                {variant}
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default Variants;
