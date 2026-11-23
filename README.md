# Alumni-Student-Platform

A web-based platform designed to connect college students with alumni, helping students build professional networks, explore career opportunities, and receive mentorship from experienced graduates.

## About the Project

The Alumni-Student-Platform aims to strengthen the relationship between students and alumni through a centralized digital platform. It provides an environment where students can seek guidance, interact with alumni, and gain valuable insights into industry trends and career development.

## Features

- **Student & Alumni Registration:** Separate registration and login for students and alumni.
- **User Profiles:** Create and manage personal and professional profiles.
- **Alumni Networking:** Connect students with alumni.
- **Mentorship:** Enable students to seek career guidance and mentorship.
- **Communication:** Facilitate interaction between students and alumni.
- **Career Guidance:** Help students explore professional opportunities.

## Technology Stack

**Frontend**

- React.js
- HTML
- CSS
- JavaScript

**Backend**

- Node.js
- Express.js

**Database**

- MongoDB

**Development Tools**

- Visual Studio Code
- Git
- GitHub
- MongoDB Compass

## Project Structure

```text
Alumni-Student-Platform/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│
├── .gitignore
└── README.md
```

_Note: Update the folder structure if your actual project contains additional files or folders._

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd Alumni-Student-Platform
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder and configure the required variables.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 5. Start the Backend

```bash
npm start
```

Use `npm run dev` instead if your `package.json` defines a development script.

### 6. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Future Enhancements

- AI-powered alumni recommendations.
- Job and internship opportunities.
- Alumni events and announcements.
- Advanced mentorship matching.
- Real-time messaging and notifications.

## Contribution

Contributions, suggestions, and improvements are welcome.

## Author

**Akshada Chaudhari**

---

_Built to strengthen connections between students and alumni through technology._
