import React, { useEffect, useState } from "react";
import "./Variants.css";
import { getVariants } from "../queries";

import ClipLoader from "react-spinners/ClipLoader";

function Variants() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const override: CSSProperties = {
    display: "block",
    margin: "10px auto",
  };

  useEffect(() => {
    const variantsList = async () => {
      const variants = await getVariants();
      setData(variants);
      setLoading(!loading);
    };
    variantsList();
  }, []);

  return (
    <div className="wrapper">
      <h3>Choose a variant to start the quiz:</h3>

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

      <ClipLoader
        color={"#ffffff"}
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Variants;
