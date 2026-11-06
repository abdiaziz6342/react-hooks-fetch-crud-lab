import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleCorrectAnswerChange(event) {
    if (onUpdateQuestion) {
      onUpdateQuestion(id, Number(event.target.value));
    }
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button type="button" onClick={() => onDeleteQuestion(id)}>
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;
