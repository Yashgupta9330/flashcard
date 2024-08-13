# Flashcard Learning Tool

Welcome to the Flashcard Learning Tool! This project is designed to help users study and learn using flashcards, with a focus on simplicity and efficiency. The tool includes both a frontend and a backend, allowing for a fully functional application with database integration.

## 🌟 Features

- **Flashcards Display:** Users can view flashcards one at a time, with the option to flip them to see the answer.
- **Navigation:** Easily navigate through flashcards using "Next" and "Previous" buttons.
- **Admin Dashboard:** Add, edit, or delete flashcards through a user-friendly internal dashboard.
- **Database Integration:** All flashcards are stored in a SQL database, ensuring data persistence and integrity.


## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- shadcn
- axios
- Vite
- TypeScript

### Backend
- SQL
- TypeScript
- Node.js
- Express
- Zod
- Prisma
-Node.js
-Express
-Zod
-Prisma
## 📂 File Structure

```plaintext
flashcard/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── backend/
    ├── src/
    ├── prisma/
    ├── node_modules/
    ├── package.json
    └── tsconfig.json
plaintext```
 
## 🚀 Getting Started

### Prerequisites
- Node.js
- SQL 

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Yashgupta9330/flashcard.git
    cd flashcard
    ```

2. **Set up the Backend**

    Navigate to the backend directory and install dependencies:

    ```bash
    cd backend
    npm install
    ```

    Set up the Prisma schema and migrate the database:

    ```bash
    npx prisma migrate dev
    ```

    Start the backend server:

    ```bash
    npm start
    ```

3. **Set up the Frontend**

    Navigate to the frontend directory and install dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

    Start the frontend development server:

    ```bash
    npm run dev
    ```

4. **Environment Variables**

    Create a `.env` file in both frontend and backend directories and add the necessary environment variables:

    **Frontend `.env`:**
    ```env
    VITE_API_URL=http://localhost:5173
    ```

    **Backend `.env`:**
    ```env
    DATABASE_URL=your_sql_database_url
    ```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
