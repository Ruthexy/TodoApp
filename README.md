# 📝 Next.js Todo App

A modern, full-stack todo application built with Next.js 15, TypeScript, MongoDB, and NextAuth. Features user authentication, CRUD operations, real-time updates, and a clean, responsive interface.

## ✨ Features

- **🔐 User Authentication**: Secure login/register system with NextAuth
- **📋 Todo Management**: Create, read, update, and delete todos
- **🔍 Search & Filter**: Search todos by title and filter by completion status
- **📱 Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **⚡ Real-time Updates**: Optimistic UI updates with React Query
- **📅 Calendar Integration**: Interactive calendar component
- **🔒 Protected Routes**: Authentication-required areas
- **🎨 Modern UI**: Clean, gradient-based design with smooth animations
- **📄 Pagination**: Efficient todo list pagination
- **⚠️ Confirmation Modals**: User-friendly delete confirmations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Authentication**: NextAuth.js with Credentials Provider
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Query (TanStack Query)
- **Icons**: React Icons
- **Calendar**: React Calendar
- **Build Tool**: Next.js with SWC

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ruthexy/TodoApp.git
   cd TodoApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
TodoApp/
├── app/                    # Next.js App Router
│   ├── (root)/            # Main application routes
│   │   ├── page.tsx       # Landing page
│   │   ├── todos/         # Todo management
│   │   └── auth/          # Authentication pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   └── todos/         # Todo CRUD operations
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── todo-list.tsx      # Main todo list component
│   ├── header.tsx         # Navigation header
│   ├── calendar-card.tsx  # Calendar widget
│   ├── pagination.tsx     # Pagination component
│   ├── confirm-modal.tsx  # Delete confirmation
│   └── todo-edit.tsx      # Todo edit form
├── lib/                   # Utility functions
│   ├── mongodb.ts         # MongoDB connection
│   └── current-user.ts    # User utility functions
├── models/                # Mongoose schemas
│   ├── User.ts            # User model
│   └── Todo.ts            # Todo model
├── providers/             # React providers
│   ├── ReactQueryProvider.tsx
│   └── SessionProviderWrapper.tsx
└── services/              # API service functions
    └── todoService.ts     # Todo API calls
```

## 🔑 Key Features Deep Dive

### Authentication System

- **NextAuth.js Integration**: Secure session-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Automatic redirect for unauthenticated users
- **User Registration**: Complete registration flow with validation

### Todo Management

- **CRUD Operations**: Full create, read, update, delete functionality
- **Optimistic Updates**: Instant UI feedback with React Query
- **Search Functionality**: Real-time title-based search
- **Status Filtering**: Filter by all, complete, or incomplete todos
- **Pagination**: Efficient loading with page-based navigation

### UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Confirmation Dialogs**: Prevent accidental deletions
- **Calendar Widget**: Interactive date picker on homepage

## 🎯 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Todos

- `GET /api/todos` - Fetch todos (with pagination)
- `POST /api/todos` - Create new todo
- `PUT /api/todos/[id]` - Update todo
- `DELETE /api/todos/[id]` - Delete todo

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

- Build: `npm run build`
- Start: `npm start`
- Environment variables required for production

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Styling

- Modify `app/globals.css` for global styles
- Update Tailwind classes in components
- Customize color scheme in tailwind.config.js

### Database

- MongoDB schema can be extended in `models/` directory
- Add new fields to Todo or User models as needed

### Features

- Add new API endpoints in `app/api/`
- Extend React Query hooks for new functionality
- Add new components in `components/` directory

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- React Query for the powerful data fetching
- NextAuth.js for the authentication solution

---

Built with ❤️ by [Your Name]
