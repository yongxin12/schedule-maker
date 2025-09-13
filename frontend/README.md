# Schedule Maker - Frontend

A modern, responsive schedule maker application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Intuitive Schedule Grid**: Visual weekly schedule with time slots
- 🔐 **User Authentication**: Secure login and registration
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Modern UI**: Clean, professional interface with Tailwind CSS
- ⚡ **Fast & Efficient**: Built with Next.js 15 and App Router
- 🔒 **Secure**: JWT-based authentication with HTTP-only cookies

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **UI Components**: Custom components with Lucide React icons
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running backend server (see backend README)

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard page
│   │   ├── login/              # Login page
│   │   ├── register/           # Register page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable components
│   │   ├── auth/               # Authentication components
│   │   ├── layout/             # Layout components
│   │   ├── schedule/           # Schedule-related components
│   │   └── ui/                 # Base UI components
│   ├── contexts/               # React contexts
│   ├── lib/                    # Utility libraries
│   ├── services/               # API services
│   └── store/                  # Zustand stores
├── public/                     # Static assets
├── .env.local                  # Environment variables
└── package.json
```

## Key Components

### Authentication
- **LoginForm**: User login with email/password
- **RegisterForm**: User registration with validation
- **ProtectedRoute**: Route guard for authenticated pages

### Schedule Management
- **ScheduleGrid**: Visual weekly schedule display
- **TimeSlotForm**: Modal for adding/editing time slots
- **Dashboard**: Main application interface

### UI Components
- **Button**: Customizable button with variants
- **Input**: Form input with validation states
- **Select**: Dropdown select component
- **Loading**: Loading spinner component

## Features Overview

### Schedule Management
- Create, edit, and delete time slots
- Visual weekly grid layout
- Color-coded activities
- Time conflict prevention
- Responsive design for all devices

### Authentication
- Secure user registration and login
- JWT token management
- Automatic session handling
- Protected routes

### User Experience
- Intuitive drag-and-drop interface
- Real-time form validation
- Toast notifications
- Loading states
- Error handling

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add frontend application"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set the environment variables in Vercel dashboard
   - Deploy automatically on push

### Other Platforms

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm run start
   ```

## API Integration

The frontend communicates with the FastAPI backend through:

- **Authentication**: Login, register, logout, user profile
- **JWT Tokens**: Automatic token management and refresh
- **Error Handling**: Comprehensive error handling and user feedback

## Development Notes

### State Management
- **Auth Store**: User authentication state
- **Schedule Store**: Schedule data and UI state
- **Persistent Storage**: JWT tokens in HTTP-only cookies

### Form Validation
- **Zod Schemas**: Type-safe form validation
- **React Hook Form**: Efficient form handling
- **Real-time Validation**: Immediate feedback to users

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **Component Variants**: Flexible component styling
- **Responsive Design**: Mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
