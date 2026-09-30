# GaneshKart 🛒✨

A full-stack, modern E-Commerce web application built with **React (Vite)**, **ASP.NET Core Web API (.NET 10)**, and **SQL Server**.

---

## 🚀 Tech Stack

### Frontend (`/client`)
- **React 19** with **Vite**
- **Lucide React** for clean and modern iconography
- **Custom CSS Design System** featuring responsive glassmorphism, fluid typography, and micro-interactions
- Context API for state management (Cart, Wishlist, Authentication)

### Backend (`/server`)
- **ASP.NET Core Web API (.NET 10)**
- **Entity Framework Core 10** (SQL Server Provider)
- **Swagger / OpenAPI** for API documentation and testing
- Clean architecture with Controllers, DTOs, and Entity Models

### Database (`/database`)
- **Microsoft SQL Server**
- Relational schema with Users, Addresses, Products, Categories, Cart, Wishlist, Orders, and Payments
- Includes comprehensive schema (`schema.sql`) and sample seed data (`seed.sql`)

---

## 📂 Project Structure

```text
GaneshKart/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Cart, ProductGrid, etc.)
│   │   ├── context/            # React Context providers (AuthContext, CartContext, etc.)
│   │   ├── pages/              # Views (Home, ProductDetails, Checkout, MyOrders, etc.)
│   │   └── data/               # Static datasets and configuration
│   └── package.json
├── server/                     # ASP.NET Core Backend
│   └── GaneshKart.API/
│       ├── Controllers/        # REST API endpoints
│       ├── Data/               # EF Core DbContext
│       ├── Models/             # Entity models
│       ├── DTOs/               # Data Transfer Objects
│       └── appsettings.json    # Application configuration & connection strings
├── database/                   # Database scripts
│   ├── schema.sql              # Table definitions and constraints
│   └── seed.sql                # Initial seed dataset
├── .gitignore                  # Git ignore rules for .NET and Node.js
└── README.md
```

---

## 🛠️ Getting Started

### 1. Database Setup
1. Open SQL Server Management Studio (SSMS) or Azure Data Studio.
2. Execute [`database/schema.sql`](file:///c:/.net/GaneshKart/database/schema.sql) to create the `GaneshKartDB` database and tables.
3. Execute [`database/seed.sql`](file:///c:/.net/GaneshKart/database/seed.sql) to populate categories and demo products.

### 2. Run the Backend API
```bash
cd server/GaneshKart.API
dotnet restore
dotnet run
```
*API Swagger Documentation will be accessible at: `https://localhost:5056/swagger` (or the configured port).*

### 3. Run the Frontend Client
```bash
cd client
npm install
npm run dev
```
*Vite dev server will start at `http://localhost:5173`.*

---

## 👤 Author
- **GitHub**: [@ganeshsawant8086-ux](https://github.com/ganeshsawant8086-ux)
