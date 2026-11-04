import { useState } from "react";

function FlipCard({ title, content }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h3>{title}</h3>
        </div>

        <div className="flip-card-back">
          {content}
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
