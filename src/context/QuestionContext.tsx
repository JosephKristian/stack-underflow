import { createContext, useContext, useReducer } from "react"
import { mockQuestions } from "../data/mockQuestions"
import type { Question } from "../types/Question"

type Action =
  | { type: "ADD_QUESTION"; payload: Question }
  | { type: "UPDATE_QUESTION"; payload: Question }

type QuestionContextType = {
  questions: Question[]
  dispatch: React.Dispatch<Action>
}

const QuestionContext = createContext<QuestionContextType | null>(null)

function reducer(state: Question[], action: Action): Question[] {

  switch (action.type) {

    case "ADD_QUESTION":
      return [action.payload, ...state]

    case "UPDATE_QUESTION":
      return state.map(q =>
        q.id === action.payload.id ? action.payload : q
      )

    default:
      return state
  }
}

export function QuestionProvider({ children }: { children: React.ReactNode }) {

  const [questions, dispatch] = useReducer(reducer, mockQuestions)

  return (
    <QuestionContext.Provider value={{ questions, dispatch }}>
      {children}
    </QuestionContext.Provider>
  )
}

export function useQuestions() {
  const context = useContext(QuestionContext)
  if (!context) throw new Error("useQuestions must be used within provider")
  return context
}