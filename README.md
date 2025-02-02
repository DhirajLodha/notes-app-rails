# Notes App (React + Rails API)

This is a **Notes App** built with **React** for the frontend and **Ruby on Rails** for the backend API. Users can create, edit, delete, and search notes efficiently.

## Features
- **User Authentication** (JWT-based login & signup)
- **Create, Read, Update, and Delete (CRUD) Notes**
- **Search & Highlight Matching Text**
- **Token-based API Authentication**
- **React Router for Navigation**
- **Styled with Tailwind CSS**
- **Uses PostgreSQL for Backend Database**

## Project Structure
```
Notes-APP-RAILS/
├── frontend/  (React App)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   ├── .env
│
├── backend/  (Rails API)
│   ├── app/
│   ├── config/
│   ├── db/
│   ├── Gemfile
│   ├── config.ru
│   ├── .env
│
└── README.md
```

## Backend Setup (Rails API)
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   bundle install
   ```
3. Set up the database:
   ```sh
   rails db:create db:migrate db:seed
   ```
4. Start the Rails API server:
   ```sh
   rails s
   ```

## Frontend Setup (React)
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /auth/login` - User Login
- `POST /auth/signup` - User Signup

### Notes
- `GET /dashboard` - Fetch all notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## Environment Variables
Create a `.env` file in both `frontend` and `backend` directories and configure it as per your setup.

**Frontend (`frontend/.env`):**
```
REACT_APP_API_URL=http://localhost:3000
```

**Backend (`backend/.env`):**
```
DATABASE_URL=postgres://your_database_url
SECRET_KEY_BASE=your_secret_key
```


