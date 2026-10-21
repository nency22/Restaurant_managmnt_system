
# Restaurant Management System

A full-stack Restaurant Management System built with **Django REST Framework**, **PostgreSQL**, and **React**. 
It helps restaurants manage their menu, customer orders,
and table reservations through a clean web interface backed by a REST API.

## Features

- **Menu Management:** add, edit, delete, and categorize menu items (with price, image, and availability)
- **Order Management:** create orders, add items, and track status (Pending, Preparing, Served, Paid)
- **Table Reservations:** book tables by date, time, and number of guests; view and cancel reservations
- **Table Management:** manage tables and their status (Available, Reserved, Occupied)
- **Authentication:** secure login with JWT and role-based access (Admin, Staff, Customer)
- **REST API:** well-structured endpoints consumed by the React frontend

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React, React Router, Axios              |
| Backend    | Python, Django, Django REST Framework   |
| Database   | PostgreSQL                              |
| Auth       | JWT (djangorestframework-simplejwt)     |





## Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- PostgreSQL 14+

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/nency22/restaurant-management-system.git
cd restaurant-management-system
```

### 2. Backend setup (Django)


cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt


### 3. Database setup (PostgreSQL)

Create a database:


CREATE DATABASE restaurant_db;

Create a `.env` file inside the `backend` folder:

```
SECRET_KEY=your_django_secret_key
DEBUG=True
DB_NAME=restaurant_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

Run migrations and create an admin user:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

Start the backend server:

```bash
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000/`

### 4. Frontend setup (React)

Check your versions:

node -v
npm -v
Download Node.js from https://nodejs.org if you don't have it.

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

Start the frontend:

```bash
npm  run dev 
```

The app runs at :(http://localhost:5173/)

## API Endpoints

| Method | Endpoint                     | Description                     |
|--------|------------------------------|---------------------------------|
| POST   | `/api/auth/login/`           | Login and get JWT tokens        |
| POST   | `/api/auth/register/`        | Register a new user             |
| GET    | `/api/menu/`                 | List all menu items             |
| POST   | `/api/menu/`                 | Add a menu item (Admin)         |
| PUT    | `/api/menu/<id>/`            | Update a menu item (Admin)      |
| DELETE | `/api/menu/<id>/`            | Delete a menu item (Admin)      |
| GET    | `/api/orders/`               | List orders                     |
| POST   | `/api/orders/`               | Create a new order              |
| PATCH  | `/api/orders/<id>/`          | Update order status             |
| GET    | `/api/tables/`               | List tables and their status    |
| GET    | `/api/reservations/`         | List reservations               |
| POST   | `/api/reservations/`         | Create a reservation            |
| DELETE | `/api/reservations/<id>/`    | Cancel a reservation            |

> Update this table to match your actual URLs.

## Usage

1. Log in with your admin account at `http://localhost:3000/login`
2. Go to the **Menu** page and add categories and items
3. Go to the **Tables** page and add your restaurant tables
4. Use the **Orders** page to create orders and update their status
5. Use the **Reservations** page to book or cancel tables
6. Manage everything from the Django admin panel at `http://127.0.0.1:8000/admin/`

## Project Structure

```
restaurant-management-system/
├── backend/
│   ├── config/            # Django project settings and main urls
│   ├── accounts/          # User authentication and roles
│   ├── menu/              # Menu items and categories
│   ├── orders/            # Orders and order items
│   ├── reservations/      # Tables and reservations
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Menu, Orders, Reservations, Login
│       ├── services/      # Axios API calls
│       └── App.js
├── screenshots/
└── README.md
```

## Database Schema

| Table          | Description                                   |
|----------------|-----------------------------------------------|
| users          | Staff, admin, and customer accounts           |
| categories     | Menu categories (Starters, Main Course, etc.) |
| menu_items     | Food items with price, image, availability    |
| tables         | Restaurant tables with capacity and status    |
| orders         | Customer orders linked to a table             |
| order_items    | Items and quantities in each order            |
| reservations   | Table bookings with date, time, and guests    |

## Future Scope

- Online payment integration (Razorpay / Stripe)
- Bill and invoice PDF generation
- QR code based digital menu
- Kitchen display screen for real-time orders
- Email / SMS notifications for reservations
- Sales reports and analytics dashboard

#screen shot
<img width="1366" height="610" alt="Screenshot (118)" src="https://github.com/user-attachments/assets/2dd27bd9-a47d-49f9-ba0f-4e4e9b2ed727" />
<img width="1271" height="715" alt="Screenshot (117)" src="https://github.com/user-attachments/assets/afbbf89d-c7c3-4b1a-87ad-e6421add2519" />
<img width="1226" height="690" alt="Screenshot (116)" src="https://github.com/user-attachments/assets/7b203bab-a13e-4c39-b67a-e4c0b57848b2" />



## Contributing

Contributions are welcome. Fork the repository, create a new branch, commit your changes, and open a pull request.

## License

This project is licensed under the MIT License.

## Author

**Your Name**
- GitHub:https://github.com/nency22
- Email: nensipan123@gmail.com
