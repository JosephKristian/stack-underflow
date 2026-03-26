import { useParams, useNavigate } from "react-router-dom"
import { useQuestions } from "../context/QuestionContext"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import type { Question, Comment } from "../types/Question"

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { questions, dispatch } = useQuestions()
  const { user } = useAuth()

  const [comment, setComment] = useState("")

  const question = questions.find((q) => q.id === id)

  if (!question) {
    return (
      <div className="container center">
        <h2>Question not found</h2>
        <button onClick={() => navigate("/questions")}>Back to Questions</button>
      </div>
    )
  }

  function handleAddComment() {
    if (!comment.trim() || !user) return

    const newComment: Comment = {
      id: crypto.randomUUID(),
      content: comment,
      author: user,
      createdAt: new Date().toISOString()
    }

    const updatedQuestion: Question = {
      ...question!,
      comments: [...question!.comments, newComment]
    }

    dispatch({ type: "UPDATE_QUESTION", payload: updatedQuestion })
    setComment("")
  }

  function handleEditQuestion() {
    const newTitle = prompt("Edit title", question!.title)
    if (!newTitle) return
    const newDescription = prompt("Edit description", question!.description)
    if (!newDescription) return

    const updatedQuestion: Question = { ...question!, title: newTitle, description: newDescription }
    dispatch({ type: "UPDATE_QUESTION", payload: updatedQuestion })
  }

  function handleStatusChange(status: Question["status"]) {
    const updatedQuestion: Question = { ...question!, status }
    dispatch({ type: "UPDATE_QUESTION", payload: updatedQuestion })
  }

  function handleEditComment(commentItem: Comment) {
    const newContent = prompt("Edit comment", commentItem.content)
    if (!newContent) return

    const updatedComments: Comment[] = question!.comments.map((c) =>
      c.id === commentItem.id ? { ...c, content: newContent } : c
    )

    const updatedQuestion: Question = { ...question!, comments: updatedComments }
    dispatch({ type: "UPDATE_QUESTION", payload: updatedQuestion })
  }

  return (
    <div className="container">
      <button className="btn-outline btn-small" onClick={() => navigate("/questions")} style={{ marginBottom: "20px" }}>
        &larr; Back to Questions
      </button>

      <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
        <h1 style={{ marginBottom: "16px" }}>{question.title}</h1>
        <div className="meta-text" style={{ marginBottom: "20px", marginTop: "0" }}>
          <span className={`badge ${question.status}`}>{question.status}</span>
          <span>•</span>
          <span>Asked {new Date(question.createdAt).toLocaleString()} by <strong>{question.author}</strong></span>
        </div>
        
        <p style={{ fontSize: "16px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
          {question.description}
        </p>

        {question.author === user && (
          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-color)", display: "flex", gap: "12px", alignItems: "center" }}>
            <button className="btn-outline btn-small" onClick={handleEditQuestion}>Edit Question</button>
            <select
              style={{ width: "auto", padding: "6px 12px", height: "auto" }}
              value={question.status}
              onChange={(e) => handleStatusChange(e.target.value as Question["status"])}
            >
              <option value="open">Status: Open</option>
              <option value="answered">Status: Answered</option>
              <option value="closed">Status: Closed</option>
            </select>
          </div>
        )}
      </div>

      <div className="comment-section">
        <h3>{question.comments.length} Comments</h3>

        {question.comments.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <div style={{ marginBottom: "32px" }}>
            {question.comments.map((c) => (
              <div key={c.id} className="comment-card">
                <p style={{ margin: "0 0 8px 0" }}>{c.content}</p>
                <div className="meta-text" style={{ marginTop: 0 }}>
                  <span>By <strong>{c.author}</strong></span>
                  <span>•</span>
                  <span>{new Date(c.createdAt).toLocaleTimeString()}</span>
                  
                  {c.author === user && (
                    <button className="btn-outline btn-small" onClick={() => handleEditComment(c)} style={{ marginLeft: "auto", padding: "2px 8px", fontSize: "11px" }}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="card" style={{ background: "var(--bg-color)", boxShadow: "none" }}>
          <h4 style={{ marginTop: 0 }}>Add a Comment</h4>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
          />
          <button onClick={handleAddComment} style={{ marginTop: "12px" }}>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  )
}