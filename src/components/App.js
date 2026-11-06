import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const API_URL = "http://localhost:4000/questions";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  async function fetchQuestions() {
    const response = await fetch(API_URL);
    const data = await response.json();
    setQuestions(data);
  }

  useEffect(() => {
    let isMounted = true;

    if (page === "List") {
      fetchQuestions().catch(() => {
        if (isMounted) {
          setQuestions([]);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [page]);

  async function handleAddQuestion(question) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });
    const savedQuestion = await response.json();
    setQuestions((currentQuestions) => [...currentQuestions, savedQuestion]);
  }

  async function handleDeleteQuestion(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setQuestions((currentQuestions) =>
      currentQuestions.filter((question) => question.id !== id)
    );
  }

  async function handleUpdateQuestion(id, correctIndex) {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === id ? { ...question, correctIndex } : question
      )
    );

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    });
    const updatedQuestion = await response.json();
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === id ? updatedQuestion : question
      )
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
