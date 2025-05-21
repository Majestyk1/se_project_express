# WTWR Backend 🌤️

The backend server for WTWR (What to Wear), providing a robust API for weather-based clothing recommendations.

## 🎯 Features

- RESTful API architecture
- User authentication with JWT
- MongoDB database integration
- Weather data processing
- Secure password handling
- Input validation and sanitization
- Centralized error handling with custom error classes
- Logging with middleware

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled
- ESLint for code quality
- Winston for logging

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the backend directory:

```bash
cd se_project_express
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The server will be available at http://localhost:3001

- [SubDomain - wtw.epicgamer.org](https://wtw.epicgamer.org)

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
se_project_express/
├── app.js                # Main application file
├── error.log             # Error log file
├── request.log           # Request log file
├── controllers/          # Route controllers
│   ├── clothingItems.js  # Clothing-related operations
│   ├── likes.js          # Like-related operations
│   └── users.js          # User-related operations
├── middlewares/          # Custom middlewares
│   ├── auth.js           # Authentication middleware
│   ├── error-handler.js  # Centralized error handling middleware
│   ├── logger.js         # Logging middleware
│   └── validation.js     # Input validation middleware
├── models/               # Database models
│   ├── clothingItem.js   # Clothing item model
│   └── user.js           # User model
├── routes/               # API routes
│   ├── clothingItems.js  # Clothing routes
│   ├── index.js          # Main router
│   └── users.js          # User routes
├── utils/                # Utility functions and configurations
│   ├── config.js         # Configuration utilities
│   ├── errors.js         # Error utilities
│   └── errors/           # Custom error classes
│       ├── BadRequestError.js
│       ├── ConflictError.js
│       ├── ForbiddenError.js
│       ├── NotFoundError.js
│       └── UnauthorizedError.js
└── package.json          # Project metadata and dependencies
```

## 🔧 Development Guidelines

### Code Style

- Follow ESLint configuration
- Use async/await for asynchronous operations
- Implement proper error handling
- Write meaningful function and variable names

### Best Practices

- Keep controllers thin
- Use proper middleware
- Implement proper validation
- Follow REST API conventions
- Use proper error handling

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3001
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://127.0.0.1:27017/wtwr_db
```

## 📚 API Documentation

### Authentication Endpoints

- POST /signup - Register a new user
- POST /signin - Login user
- GET /users/me - Get current user

### Clothing Endpoints

- GET /items - Get all clothing items
- POST /items - Add new clothing item
- DELETE /:itemId - Remove clothing item

### Like Endpoints

- POST /:itemId/likes - Like a clothing item
- DELETE /:itemId/likes - Unlike a clothing item

## 🤝 Contributing

1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.
