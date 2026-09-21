# FoodWaste – Food Expiry Tracker with Friends & Groups

Web app that helps people reduce food waste. Users keep track of the food products they have, with category, quantity and expiration date, connect with friends and organize into groups.

## Features
- Sign up and log in
- Add products with name, category, quantity, expiration date and availability, and list your own products
- Send and accept friend requests, view your friendships
- Create groups and add friends to them

## Tech stack

| Part | Technologies |
|---|---|
| Frontend (`app/frontend`) | React (Create React App), React Router, Axios |
| Backend (`app/backend`) | Node.js (ES modules), Express, Sequelize, MySQL, dotenv |

## Project structure

```
app/
  backend/
    entities/     Sequelize models: User, Product, Grup, Friendship, FriendshipRequest, and database setup
    dataAccess/   data access layer and validations
    routes/       REST routes under /api
    dbConfig.js   database connection
    index.js      Express server
  frontend/
    src/pages/    Home, LoginForm, SignupForm, AddProduct, FriendshipDisplay, Grupuri, ...
```

Main API routes (prefix `/api`): `/create`, `/signup`, `/login`, `/add-product`, `/user/:userEmail/products`, `/send-request`, `/accept-friend-request`, `/friendship`, `/grup`, `/add-to-group`.

## Getting started

### Prerequisites
- Node.js 18 or newer
- A MySQL server running on `127.0.0.1`

### Backend

```bash
cd app/backend
npm install
```

Create `app/backend/.env`:

```env
PORT=8000
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_DIALECT=mysql
DB_DATABASE=foodwaste
```

Start the server:

```bash
node index.js
```

Then open `http://localhost:8000/api/create` once. It creates the database and all the tables.

### Frontend

```bash
cd app/frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` and calls the API at `http://localhost:8000` (configured in `app/frontend/src/pages/config.js`).
