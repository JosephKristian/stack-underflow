import { useQuestions } from "../context/QuestionContext"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import type { Question } from "../types/Question"

export default function QuestionsPage() {
  const { questions, dispatch } = useQuestions()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleCreate() {
    const title = prompt("Enter Question Title:")
    if (!title) return
    const description = prompt("Enter Question Description:")
    if (!description) return

    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "open",
      author: user!,
      comments: [],
      createdAt: new Date().toISOString()
    }

    dispatch({ type: "ADD_QUESTION", payload: newQuestion })
  }

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <div className="container">
      <div className="header-flex">
        <h1>All Questions</h1>
        <div className="user-info">
          <span>Hello, <strong>{user}</strong></span>
          <button className="btn-outline btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button onClick={handleCreate}>Ask Question</button>
      </div>

      {questions.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>No questions yet. Be the first to ask!</p>
      ) : (
        questions.map((q: Question) => (
          <div key={q.id} className="card">
            <Link to={`/questions/${q.id}`}>
              <h3 style={{ marginBottom: "8px" }}>{q.title}</h3>
            </Link>
            <p style={{ margin: "0 0 12px 0", color: "var(--text-muted)" }}>
              {q.description.length > 100 ? `${q.description.substring(0, 100)}...` : q.description}
            </p>
            <div className="meta-text">
              <span className={`badge ${q.status}`}>{q.status}</span>
              <span>•</span>
              <span>Asked by <strong>{q.author}</strong></span>
              <span>•</span>
              <span>{new Date(q.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}