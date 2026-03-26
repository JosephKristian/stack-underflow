export type Comment = {
  id: string
  content: string
  author: string
  createdAt: string
}

export type Question = {
  id: string
  title: string
  description: string
  status: "open" | "answered" | "closed"
  author: string
  createdAt: string
  comments: Comment[]
}