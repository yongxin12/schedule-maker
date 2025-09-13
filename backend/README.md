# Schedule Maker - Backend

A robust, scalable backend API for the Schedule Maker application built with FastAPI, SQLAlchemy, and PostgreSQL.

## Features

- 🚀 **Fast API**: High-performance API with automatic docs
- 🔐 **Secure Authentication**: JWT-based auth with bcrypt password hashing
- 📊 **Database**: SQLAlchemy ORM with PostgreSQL/SQLite support
- 🔒 **Security**: CORS, input validation, and secure password handling
- 📚 **Auto Documentation**: Interactive API docs with Swagger UI
- ⚡ **Async Support**: High-performance async operations
- 🐳 **Docker Ready**: Container support for easy deployment

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLAlchemy with PostgreSQL/SQLite
- **Authentication**: JWT tokens with python-jose
- **Password Hashing**: bcrypt via passlib
- **Validation**: Pydantic models
- **CORS**: FastAPI CORS middleware
- **Environment**: python-dotenv

## Getting Started

### Prerequisites

- Python 3.8+
- pip or pipenv
- PostgreSQL (optional, SQLite works for development)

### Installation

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DATABASE_URL=sqlite:///./schedulemaker.db
   SECRET_KEY=your-super-secret-key-change-this-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   CORS_ORIGINS=["http://localhost:3000"]
   ENVIRONMENT=development
   ```

5. **Run the application**:
   ```bash
   python run.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Access the API**:
   - API: [http://localhost:8000](http://localhost:8000)
   - Interactive Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
   - Alternative Docs: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Project Structure

```
backend/
├── app/
│   ├── routers/                # API route handlers
│   │   ├── __init__.py
│   │   └── auth.py             # Authentication routes
│   ├── __init__.py
│   ├── auth.py                 # Authentication utilities
│   ├── config.py               # Configuration settings
│   ├── crud.py                 # Database operations
│   ├── database.py             # Database setup
│   ├── dependencies.py         # FastAPI dependencies
│   ├── main.py                 # FastAPI application
│   ├── models.py               # SQLAlchemy models
│   └── schemas.py              # Pydantic schemas
├── .env                        # Environment variables
├── requirements.txt            # Python dependencies
└── run.py                      # Application runner
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/auth/logout` | User logout | Yes |

### General

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | API information | No |
| GET | `/health` | Health check | No |

## API Documentation

### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "tokens": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "token_type": "bearer"
  }
}
```

### Login User

```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=john@example.com&password=securepassword123
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "tokens": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "token_type": "bearer"
  }
}
```

### Get Current User

```http
GET /auth/me
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

## Database Models

### User Model

```python
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DATABASE_URL=sqlite:///./schedulemaker.db
# For PostgreSQL: postgresql://user:password@localhost/dbname

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
CORS_ORIGINS=["http://localhost:3000", "http://127.0.0.1:3000"]

# Environment
ENVIRONMENT=development
```

### Database Setup

#### SQLite (Development)
```env
DATABASE_URL=sqlite:///./schedulemaker.db
```

#### PostgreSQL (Production)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/schedulemaker
```

## Security Features

### Password Security
- **bcrypt**: Secure password hashing
- **Salt**: Automatic salt generation
- **Verification**: Secure password verification

### JWT Authentication
- **Secure Tokens**: HS256 algorithm
- **Expiration**: Configurable token expiry
- **Validation**: Automatic token validation

### CORS Protection
- **Origin Control**: Configurable allowed origins
- **Credentials**: Support for authenticated requests
- **Headers**: Controlled header access

## Development

### Running Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Formatting
```bash
# Install development dependencies
pip install black isort flake8

# Format code
black .
isort .

# Lint code
flake8 .
```

### Database Migrations

For production databases, use Alembic:

```bash
# Initialize migrations
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Create users table"

# Apply migrations
alembic upgrade head
```

## Deployment

### Docker

1. **Create Dockerfile**:
   ```dockerfile
   FROM python:3.11-slim
   
   WORKDIR /app
   
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   
   COPY . .
   
   EXPOSE 8000
   
   CMD ["python", "run.py"]
   ```

2. **Build and run**:
   ```bash
   docker build -t schedule-maker-backend .
   docker run -p 8000:8000 schedule-maker-backend
   ```

### Production Deployment

1. **Set production environment variables**:
   ```env
   DATABASE_URL=postgresql://user:pass@prod-db:5432/schedulemaker
   SECRET_KEY=production-secret-key
   ENVIRONMENT=production
   CORS_ORIGINS=["https://yourdomain.com"]
   ```

2. **Use production WSGI server**:
   ```bash
   pip install gunicorn
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

### Vercel Deployment

1. **Create `vercel.json`**:
   ```json
   {
     "builds": [
       {
         "src": "app/main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "app/main.py"
       }
     ]
   }
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

## Monitoring and Logging

### Health Checks
- **Health Endpoint**: `/health` for monitoring
- **Database Check**: Automatic database connectivity check
- **Status Codes**: Proper HTTP status code usage

### Logging
```python
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

## Error Handling

The API returns consistent error responses:

```json
{
  "detail": "Error message",
  "status_code": 400
}
```

Common status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

## Performance

### Optimization Tips
- **Connection Pooling**: Configure database connection pools
- **Async Operations**: Use async/await for I/O operations
- **Caching**: Implement Redis caching for frequently accessed data
- **Database Indexing**: Add indexes on frequently queried columns

### Monitoring
- **Response Times**: Monitor API response times
- **Database Performance**: Track database query performance
- **Memory Usage**: Monitor application memory usage
- **Error Rates**: Track error rates and patterns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details
