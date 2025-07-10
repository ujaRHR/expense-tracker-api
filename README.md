A RESTful API built with Node.js, Express, and MongoDB for managing user expenses with authentication and filtering features. You can integrate this API with your frontend or existing application to enable secure user authentication, dynamic expense and category management, and real-time filtering of financial data.

**Features**
- User registration and login with JWT authentication
- MongoDB schema modeling using Mongoose
- Category management (CRUD)
- Expense management (CRUD)
- Filter expenses by:
    - Last 7 days
    - Last month
    - Last 3 months
    - Custom date range
- Pagination support
- Input validation
- Clean folder structure

#### Installation
1. Clone the repository:
   ```
   git clone https://github.com/ujaRHR/expense-tracker-api.git
   cd expense-tracker-api
   ```  
2. Install dependencies:
   ```
   pnpm install
   ```
3. Create a .env file in the root directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```
   pnpm start
   ```

### API Endpoints
**Auth**
- POST: ```/api/auth/signup```
- POST: ```/api/auth/login```

**Categories**
- GET: ```/api/categories```
- GET: ```/api/categories/:categoryId```
- POST: ```/api/categories```
- PUT: ```/api/categories/:categoryId```
- DELETE: ```/api/categories/:categoryId```

**Expenses**
- GET: ```/api/expenses```
- GET: ```/api/expenses/:expenseId```
- POST: ```/api/expenses```
- PUT: ```/api/expenses/:expenseId```
- DELETE: ```/api/expenses/:expenseId```
- GET: ```/api/expenses/filter?range=week|month|3months|from=YYYY-MM-DD&to=YYYY-MM-DD```

**Tech Stack**: Node.js, Express, MongoDB + Mongoose, JWT, bcrypt

---
