# Stack Underflow

Stack Underflow is a lightweight, frontend-only Q&A web application inspired by Stack Overflow.

The application allows users to log in, browse questions, post new questions, update their own content, change question status, and participate in discussions through comments all within a **Single Page Application (SPA)**.

All data is managed **entirely in memory**, meaning no backend or external database is required.

---

# 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/JosephKristian/stack-underflow.git
cd stack-underflow
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Start the development server

```bash
npm run dev
```

or

```bash
yarn dev
```

### 4. Open the application

Navigate to:

```
http://localhost:5173
```

---

# 🧰 Tech Stack

* **React.js** – UI framework
* **TypeScript** – Type safety and improved developer experience
* **Vite** – Fast development server and build tool
* **React Router** – Client-side routing for SPA navigation
* **React Context API** – Application state management
* **Plain CSS** – Lightweight styling

---

# 📌 Features

### Authentication (Mock Login)

* Users can enter **any username and password**
* Login state is stored **in memory**
* Session remains active **until the page is refreshed**

---

### Questions

Users can:

* View a list of questions
* Create new questions
* Edit questions they created
* Change the status of their own questions

Each question includes:

* Title
* Description
* Status (`open`, `answered`, `closed`)
* Created timestamp
* Author information

Initial questions are **pre-populated in memory on application load**.

---

### Comments

Each question supports multiple comments.

Users can:

* Add comments
* Edit their own comments

Comments update the UI **immediately without page reload**, demonstrating reactive state management.

---

### Navigation & UI

The application is implemented as a **Single Page Application (SPA)** with two main views:

1. **Question List View**
2. **Question Detail View**

Navigation between views is handled using **React Router**.

The UI focuses on **clarity and usability**, with minimal but structured styling to keep the project lightweight while maintaining a clean layout.

---

# 🏗️ Technical Approach & Architecture

### State Management

State is managed using the **React Context API**.

Two primary contexts are used:

**AuthContext**

Responsible for:

* managing login state
* storing current user information
* handling logout functionality

**QuestionContext**

Responsible for:

* storing questions
* storing comments
* handling CRUD operations for questions and comments
* updating question status

The Context API was chosen instead of Redux because:

* application state is relatively small
* it avoids introducing unnecessary dependencies
* it keeps the architecture lightweight and easy to understand

---

### Component Structure

The project follows a **clear separation of concerns** between application layers.

```
src
 ├ assets
 │   ├ hero.png
 │   └ vite.svg
 │
 ├ context
 │   ├ AuthContext.tsx
 │   └ QuestionContext.tsx
 │
 ├ data
 │   └ mockQuestions.ts
 │
 ├ pages
 │   ├ LoginPage.tsx
 │   ├ QuestionListPage.tsx
 │   └ QuestionDetailPage.tsx
 │
 ├ styles
 │   └ app.css
 │
 ├ types
 │   └ index.ts
 │
 ├ App.tsx
 └ main.tsx
```

This structure helps keep:

* UI logic separated from state management
* types centralized
* pages focused on view-level logic

---

### Component Granularity Decision

Given the limited scope and time expectation of the assessment (4–8 hours), the UI components were intentionally kept relatively close to the page level.

Smaller reusable UI components (such as `QuestionCard` or `CommentItem`) could be introduced in a larger production application. However, in this project the UI structure is simple and does not significantly benefit from additional abstraction.

This approach keeps the code straightforward while avoiding unnecessary component fragmentation, which aligns with the goal of delivering a clear and maintainable solution within the expected time frame.

---

### Styling

Styling is implemented using **plain CSS with CSS variables**.

The goal was to keep styling:

* lightweight
* readable
* easy to maintain

Large UI frameworks (such as Tailwind or Material UI) were intentionally avoided to prevent unnecessary complexity for this small assessment project.

---

# ⚠️ Assumptions & Known Limitations

### In-Memory Data

Since there is no backend, all data is stored in React state.

Refreshing the page will reset:

* login state
* questions
* comments

This behavior follows the requirement that the application should operate **entirely in memory**.

---

### Mock Authentication

Authentication is intentionally simplified.

* Any username/password combination is accepted
* No password validation or persistence is implemented

---

### Simplified Editing UX

To keep the implementation focused and within the expected time frame, editing interactions use simplified input mechanisms.

In a production environment these would typically be replaced with:

* modal forms
* proper validation
* improved user experience

---

### Timestamp Handling

Timestamps are generated using the browser's local time:

```
new Date().toLocaleString()
```

Therefore, the displayed time depends on the user's local timezone.

---

# ⏱️ Time Spent

Approximately **4–6 hours** were spent implementing this project.

The focus was on:

* implementing all required functionality
* maintaining a clean and understandable architecture
* demonstrating clear state management
* keeping the UI simple but usable
