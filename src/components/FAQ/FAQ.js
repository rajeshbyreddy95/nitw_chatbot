import React from "react";

const FAQ = ({ questions }) => {
  return (
    <div>
      {questions.map((q, idx) => (
        <div key={idx}>
          <h3>{q.question}</h3>
          <p>{q.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
