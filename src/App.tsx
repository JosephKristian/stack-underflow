import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import QuestionsPage from "./pages/QuestionsPage"
import QuestionDetailPage from "./pages/QuestionDetailPage"
import { useAuth } from "./context/AuthContext"
import type { JSX } from "react"

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" />

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <QuestionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute>
              <QuestionDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App