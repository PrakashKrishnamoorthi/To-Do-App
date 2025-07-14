# TaskFlow - Modern Task Management Application

<div align="center">

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-Productivity%20App-blue?style=for-the-badge&logo=react)

**Stay organized, stay productive**

A beautiful, modern task management application built with React, TypeScript, and Tailwind CSS featuring Material Design principles, dark mode support, and advanced task tracking capabilities.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/taskflow)
[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-blue?logo=tailwindcss)](https://tailwindcss.com/)

</div>

## ✨ Features

### ���� **Core Task Management**

- ✅ **Create, Edit, and Delete Tasks** - Full CRUD operations with intuitive interface
- 📊 **Task Status Tracking** - Not Started, In Progress, Completed states
- 🏷️ **Priority Levels** - Low, Medium, High with visual color coding
- 📅 **Due Date Management** - Set deadlines with smart notifications
- 🔍 **Advanced Filtering** - Filter by status (All, Active, Completed)
- 📈 **Progress Analytics** - Real-time stats and completion tracking

### 🎨 **Beautiful Design**

- 🌙 **Dark/Light Mode** - Toggle with system preference detection
- 🎭 **Material Design** - Google's Material Design principles
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- ⚡ **Smooth Animations** - Micro-interactions and transitions
- 🎨 **Custom Color Palette** - Modern blue-based design system

### 🚀 **Advanced Features**

- 💾 **Local Storage Persistence** - Auto-save with data validation
- ⌨️ **Keyboard Shortcuts** - Ctrl+K (add task), Ctrl+1/2/3 (filters)
- 📊 **Smart Statistics** - Track completion rates and overdue tasks
- 🔔 **Smart Notifications** - Overdue task alerts and due date reminders
- 🎯 **Empty State Guidance** - Helpful prompts for new users

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to see the application running.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📖 How to Use TaskFlow

### Getting Started

1. **Create Your First Task**

   - Click the dashed "Add a new task" card
   - Enter your task title
   - Select status (Not Started, In Progress, Completed)
   - Choose priority level (Low, Medium, High)
   - Optionally set a due date
   - Click "Add Task"

2. **Managing Tasks**

   - **Complete Task**: Click the checkbox to mark as done
   - **Edit Task**: Click the three dots menu for options
   - **Delete Task**: Use the delete option in the task menu

3. **Organizing Tasks**
   - **Filter Tasks**: Use the filter bar (All, Active, Completed)
   - **Track Progress**: View statistics at the top of the page
   - **Manage Completed**: Clear completed tasks when needed

### Advanced Features

#### Keyboard Shortcuts

- **Ctrl/Cmd + K**: Quick add new task
- **Ctrl/Cmd + 1**: Show all tasks
- **Ctrl/Cmd + 2**: Show active tasks only
- **Ctrl/Cmd + 3**: Show completed tasks only

#### Task Status System

- **🔴 Not Started**: Tasks that haven't been begun
- **🔵 In Progress**: Tasks currently being worked on
- **🟢 Completed**: Finished tasks

#### Priority Levels

- **🔵 Low**: Nice-to-have tasks
- **🟡 Medium**: Important tasks
- **🔴 High**: Urgent, critical tasks

#### Due Date Features

- **Due Today**: Highlighted in yellow
- **Due Tomorrow**: Shown in blue
- **Overdue**: Marked in red with warning icon

### Theme Customization

Click the theme toggle button (🌙/☀️) in the top-right corner to switch between:

- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for night work

## 🌐 Deployment

### Deploying to Vercel (Recommended)

TaskFlow is optimized for Vercel deployment with zero configuration:

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it as a React project
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to `main` branch triggers auto-deployment
   - Preview deployments for pull requests

### Alternative Deployment Options

#### Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

#### GitHub Pages

```bash
npm install -g gh-pages
npm run build
npx gh-pages -d dist
```

## 🛠️ Technical Stack

### Frontend

- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful, customizable icons
- **date-fns** - Modern date utility library

### Development Tools

- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

### State Management

- **React Hooks** - useState, useEffect, useReducer, useContext
- **Custom Hooks** - Reusable logic for tasks and persistence
- **Local Storage** - Client-side data persistence

## 📁 Project Structure

```
taskflow/
├── client/                     # Frontend React application
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components (buttons, cards, etc.)
│   │   ├── TaskCard.tsx      # Individual task display
│   │   ├── AddTaskForm.tsx   # Task creation form
│   │   ├── FilterBar.tsx     # Task filtering interface
│   │   ├── TaskStats.tsx     # Statistics display
│   │   └── TaskManager.tsx   # Main application component
│   ├── contexts/             # React contexts
│   │   └── ThemeContext.tsx  # Dark/light mode management
│   ├── hooks/                # Custom React hooks
│   │   ├── useTaskReducer.ts # Task state management
│   │   └── useTaskPersistence.ts # Local storage logic
│   ├── lib/                  # Utility functions
│   │   ├── utils.ts         # General utilities
│   │   └── storage.ts       # Local storage helpers
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Home page
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # Application root
│   └── global.css           # Global styles and CSS variables
├── shared/                   # Shared types and interfaces
│   └── tasks.ts             # Task-related TypeScript types
├── server/                   # Express server (optional)
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## 🎨 Customization

### Color Scheme

Edit `client/global.css` to customize the color palette:

```css
:root {
  --primary: 214 100% 59%; /* Main blue color */
  --secondary: 220 13% 95%; /* Light gray */
  --success: 142 76% 36%; /* Green for completed */
  --warning: 38 92% 50%; /* Orange for warnings */
  --destructive: 0 84% 60%; /* Red for errors */
}
```

### Adding New Features

1. Create types in `shared/tasks.ts`
2. Update the reducer in `client/hooks/useTaskReducer.ts`
3. Modify components as needed
4. Update storage validation in `client/lib/storage.ts`

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript checks
npm test            # Run tests
npm run format.fix   # Format code with Prettier
```

### Code Quality

- **TypeScript**: Full type coverage for better development experience
- **ESLint**: Consistent code style and error prevention
- **Prettier**: Automatic code formatting
- **Component Architecture**: Modular, reusable components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Lucide** - For beautiful icons
- **Vercel** - For seamless deployment platform

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

[Report Bug](https://github.com/yourusername/taskflow/issues) • [Request Feature](https://github.com/yourusername/taskflow/issues) • [Documentation](https://github.com/yourusername/taskflow/wiki)

</div>
