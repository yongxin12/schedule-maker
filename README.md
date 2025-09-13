# Schedule Maker

A modern, full-stack schedule maker application that helps users create and manage their weekly schedules with an intuitive interface.

## 🌟 Features

- **Visual Schedule Grid**: Interactive weekly calendar view
- **User Authentication**: Secure registration and login system
- **Time Slot Management**: Create, edit, and delete time slots with ease
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Validation**: Immediate feedback on form inputs
- **Modern UI**: Clean, professional interface with smooth animations
- **Secure Backend**: JWT-based authentication with bcrypt password hashing

## 🏗️ Architecture

This project follows a clean separation between frontend and backend:

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, and modern React patterns
- **Backend**: FastAPI with SQLAlchemy, PostgreSQL/SQLite, and JWT authentication
- **Communication**: RESTful API with proper error handling and validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd schedule-maker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the backend server
python run.py
```

The backend will be running at [http://localhost:8000](http://localhost:8000)

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your backend URL

# Start the development server
npm run dev
```

The frontend will be running at [http://localhost:3000](http://localhost:3000)

### 4. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```
schedule-maker/
├── frontend/                   # Next.js frontend application
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/        # Reusable React components
│   │   ├── lib/              # Utility functions and configurations
│   │   ├── services/         # API service functions
│   │   └── store/            # Zustand state management
│   ├── public/               # Static assets
│   └── package.json
│
├── backend/                    # FastAPI backend application
│   ├── app/
│   │   ├── routers/          # API route handlers
│   │   ├── models.py         # Database models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── auth.py           # Authentication utilities
│   │   └── main.py           # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Environment variables
│
└── README.md                  # This file
```

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **UI Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.8+
- **Database**: SQLAlchemy with PostgreSQL/SQLite
- **Authentication**: JWT with python-jose
- **Password Hashing**: bcrypt via passlib
- **Validation**: Pydantic
- **CORS**: FastAPI CORS middleware

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email and password
2. **Login**: Users authenticate with email/password
3. **JWT Tokens**: Backend returns JWT access tokens
4. **Protected Routes**: Frontend protects authenticated pages
5. **Token Management**: Automatic token refresh and logout

## 📱 Features Overview

### User Management
- User registration with validation
- Secure login/logout
- Profile management
- Session persistence

### Schedule Management
- Visual weekly grid layout
- Create time slots with title, description, and color
- Edit existing time slots
- Delete time slots
- Time conflict prevention
- Responsive design for mobile devices

### User Experience
- Intuitive click-to-add interface
- Real-time form validation
- Loading states and error handling
- Toast notifications for user feedback
- Responsive design for all screen sizes

## 🚀 Deployment

### Frontend (Vercel)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push

### Backend (Railway/Heroku)

1. **Prepare for deployment**:
   - Update `requirements.txt`
   - Set production environment variables
   - Configure database connection

2. **Deploy**:
   - Connect repository to hosting platform
   - Set environment variables
   - Deploy and monitor

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
npm run test:e2e
```

### Backend Testing
```bash
cd backend
pip install pytest pytest-asyncio httpx
pytest
```

## 🔧 Development

### Code Quality

**Frontend**:
```bash
npm run lint
npm run type-check
npm run format
```

**Backend**:
```bash
black .
isort .
flake8 .
```

### Environment Variables

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend** (`.env`):
```env
DATABASE_URL=sqlite:///./schedulemaker.db
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=["http://localhost:3000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write tests for new features
- Update documentation for significant changes
- Ensure all tests pass before submitting PR
- Use meaningful commit messages

## 📝 API Documentation

Once the backend is running, visit [http://localhost:8000/docs](http://localhost:8000/docs) for interactive API documentation.

### Key Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `POST /auth/logout` - User logout

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**:
   - Check Python version (3.8+ required)
   - Ensure all dependencies are installed
   - Verify environment variables in `.env`

2. **Frontend won't start**:
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Verify environment variables in `.env.local`

3. **CORS errors**:
   - Ensure frontend URL is in backend `CORS_ORIGINS`
   - Check environment variable format

4. **Database errors**:
   - Verify database URL in `.env`
   - For SQLite, ensure directory exists
   - For PostgreSQL, verify connection details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the excellent Python web framework
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for hosting and deployment platform

## 📞 Support

If you have any questions or need help with setup, please open an issue in this repository.

---

**Happy Scheduling! 📅**
