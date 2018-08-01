import React from "react";

import "./styles.css";

export default ({ name, image, sex }) => {
  const backgroundImage = `url(${image})`;
  const backgroundColor = sex === "M" ? "#d4e7ff" : "#ffe0e6";
  return (
    <div className="card">
      <div className="card--inner">
        <div className="image">
          <div className="image--content" style={{ backgroundImage }} />
        </div>
        <div className="meta" style={{ backgroundColor }}>
          <h4>{name}</h4>
        </div>
      </div>
    </div>
  );
};
