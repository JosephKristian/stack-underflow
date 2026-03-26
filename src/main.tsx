import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { QuestionProvider } from "./context/QuestionContext"
import "./styles/app.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QuestionProvider>
        <App />
      </QuestionProvider>
    </AuthProvider>
  </React.StrictMode>
)