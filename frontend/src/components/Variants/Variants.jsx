import React, { useEffect, useState } from "react";
import "./Variants.css";
import { getVariants } from "../queries";

function Variants() {
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

  return (
    <div className="wrapper">
      <h2>Please choose a variant to start the mock exam:</h2>

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
