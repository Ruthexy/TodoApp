
# ✅ React Todo App

A modern, fully functional and responsive Todo List Application built with **React**, **React Router**, **TanStack Query v5**, and styled using **external CSS**. It includes **CRUD operations**, **search**, **filters**, **pagination**, a detailed view, and a clean, user-friendly UI.

---

## 🚀 Features

- 🔍 **Search Todos** by title
- 🎯 **Filter Todos** by status: all / complete / incomplete
- ✅ **Mark Todos as Completed** with red strikethrough
- 📝 **View & Edit Todo Details** on a separate page
- ➕ **Create New Todos** using a form
- ❌ **Delete Todos** with instant UI update
- 📄 **Pagination** for manageable list navigation
- 📱 **Responsive UI** with elegant design using pure CSS
- 🧭 **404 Page Not Found** handler
- ⚙️ **API Integration** with [JSONPlaceholder](https://jsonplaceholder.typicode.com)

---

## 📸 Screenshots



- **🏠 Homepage**  
  `./assets/homepage.jpg`

- **✅ Todo List**  
  `./assets/todolist.jpg`

- **📋 Error Page**  
  `./assets/errorpage.jpg`
  

---

## 🛠️ Tech Stack

| Tech               | Description                                  |
|--------------------|----------------------------------------------|
| React              | Frontend framework                           |
| React Router       | Routing and navigation                       |
| TanStack Query v5  | Server state management and caching          |
| Axios              | HTTP client for API requests                 |
| JSONPlaceholder    | Mock API for todos                           |
| External CSS       | Custom styles with responsive design         |

---

## 📁 Folder Structure

```
src/
├── api/
│   └── todos.js         # Axios API methods (fetch, update, delete, create)
├── components/
│   ├── TodoList.jsx     # Main todo list with pagination & filtering
│   ├── TodoDetail.jsx   # Single todo view, edit/delete
│   ├── TodoForm.jsx   # Form to create new todos
│   ├── Pagination.jsx   # Reusable pagination component
    |--- CalendarCard.css # homepage calendar styling
    |___ CalendarCard.jsx # calendar file imported from UI library
    |___ ErrorBoundary.jsx # create error boundary
│   └── NotFound.jsx     # 404 page component
    
├── styles/
    |__ NotFound.css     #  external styling for error page
│   └── TodoStyles.css   # external styling for todolist page
|__ App.css              # external styling for home page
|__ Home.jsx             # Home page layout
|__ Router.jsx           # 
├── App.jsx              # Routing and layout setup
└── main.jsx             # App entry point

```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/react-todo-app.git
cd react-todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Then open your browser at `http://localhost:5173`

---

## 🌐 API Reference

Using [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos)

| Method | Endpoint | Description              |
|--------|----------|--------------------------|
| GET    | /todos?_page=1&_limit=10 | Get paginated todos |
| GET    | /todos/:id     | Get a specific todo     |
| POST   | /todos         | Create a new todo       |
| PUT    | /todos/:id     | Update an existing todo |
| DELETE | /todos/:id     | Delete a todo           |

⚠️ **Note:** JSONPlaceholder is a mock API and does not persist data. All mutations behave locally for demonstration.

---

## ✨ Credits

- Built with ❤️ using:
  - [React](https://reactjs.org/)
  - [TanStack Query](https://tanstack.com/query)
  - [JSONPlaceholder](https://jsonplaceholder.typicode.com)
- Inspired by clean UI principles and productivity apps

---

## 📄 License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.
