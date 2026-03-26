import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!username) return

    login(username)
    navigate("/questions")
  }

  return (
    <div className="center">
      <h1 style={{ marginBottom: "24px" }}>Stack Underflow</h1>

      <form onSubmit={handleLogin} className="card login-form">
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>Username</label>
          <input
            placeholder="Enter any username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>Password</label>
          <input
            placeholder="Enter any password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "8px" }}>Log In</button>
      </form>
    </div>
  )
}