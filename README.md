Role-Based Access Control (RBAC) UI

- A Role-Based Access Control (RBAC) system implemented with React, TypeScript, and mock APIs. This project provides a user-friendly interface to manage users, roles, and permissions, allowing administrators to assign permissions based on roles effectively.

Features:

-> Users Management 
  - View a list of users.
  - Add, edit, or delete users.
  - Assign roles to users.

-> Permissions Management
  - View and edit permissions assigned to roles.


Setup Instructions: 

-> Prerequisites
  - [Node.js](https://nodejs.org/) (v14 or above)
  - [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

Steps to Run the Project:

1. Clone the Repository
   git clone
   cd rbac-ui
   

2. Install Dependencies
   npm install

3. Start the Development Server and json server
   npx json-server --watch db.json --port 3001
   npm start

5. Open your browser and navigate to:
   http://localhost:3001



Technologies Used:
- Frontend: React, TypeScript, CSS.
- State Management: React Hooks.
- Mock APIs: Axios.
- UI Library: Plain CSS (custom modals, tables, and forms).



Future Enhancements: 
- Add a backend service for real API calls.
- Implement authentication and authorization.
- Improve UI/UX with modern libraries like Material-UI or Tailwind CSS.
- Add unit and integration tests.
