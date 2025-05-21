# WTWR Backend 🌤️

The backend server for WTWR (What to Wear), providing a robust API for weather-based clothing recommendations.

## 🎯 Features

- RESTful API architecture
- User authentication with JWT
- MongoDB database integration
- Weather data processing
- Secure password handling
- Input validation and sanitization

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled
- ESLint for code quality

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
├── controllers/         # Route controllers
│   ├── users.js       # User-related operations
│   └── clothing.js    # Clothing-related operations
├── models/            # Database models
│   ├── user.js       # User model
│   └── clothing.js   # Clothing model
├── routes/           # API routes
│   ├── users.js     # User routes
│   └── clothing.js  # Clothing routes
├── middlewares/      # Custom middlewares
│   ├── auth.js      # Authentication middleware
│   └── error.js     # Error handling middleware
├── utils/           # Utility functions
└── app.js          # Main application file
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

- GET /clothing - Get all clothing items
- POST /clothing - Add new clothing item
- DELETE /clothing/:id - Remove clothing item

## 🤝 Contributing

1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.
