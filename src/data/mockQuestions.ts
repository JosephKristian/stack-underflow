import type { Question } from "../types/Question"

export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "How does React Context work?",
    description: "Can someone explain React Context in simple terms?",
    status: "open",
    author: "alice",
    createdAt: new Date().toISOString(),
    comments: [
      {
        id: "c1",
        content: "It allows global state sharing without prop drilling.",
        author: "bob",
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: "2",
    title: "Difference between let and var in JavaScript?",
    description: "I am confused about the scope differences.",
    status: "answered",
    author: "john",
    createdAt: new Date().toISOString(),
    comments: []
  }
]