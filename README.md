# 🚀 NovaAI - Advanced AI Chatbot

NovaAI is a cutting-edge AI chatbot platform with modern glassmorphism design inspired by iOS 26. Built with TypeScript, React, and Node.js.

## ✨ Features

- 🎨 **Glassmorphism Design** - Modern iOS-style UI with frosted glass effect
- 🤖 **Advanced AI** - Powered by state-of-the-art language models
- ⚡ **Real-time** - WebSocket support for instant messaging
- 🔒 **Secure** - End-to-end encryption ready
- 📱 **Responsive** - Works seamlessly on all devices
- 🎯 **Context Aware** - Maintains conversation history
- 🌙 **Dark Mode** - Built-in dark theme

## 🏗️ Project Structure

```
nova/
├── packages/
│   ├── web/        # React frontend with glassmorphism UI
│   ├── backend/    # Node.js API server
│   └── shared/     # Shared types and utilities
├── docker-compose.yml
└── package.json
```

## 🛠️ Tech Stack

### Frontend
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- WebSocket Client

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Redis (caching & sessions)
- Socket.io (real-time)

## 📦 Installation

```bash
# Install dependencies
yarn install

# Setup environment variables
cp .env.example .env.local

# Run development servers
yarn dev
```

## 🚀 Getting Started

### Development

```bash
# Start both frontend and backend
yarn dev

# Frontend runs on http://localhost:3000
# Backend runs on http://localhost:5000
```

### Production Build

```bash
yarn build
yarn start
```

## 🐳 Docker

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 📝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a Pull Request

## 📄 License

MIT License - feel free to use this project

## 👨‍💻 Author

Created by [@KemitPTS](https://github.com/KemitPTS)

---

**Made with ❤️ for the future of AI**