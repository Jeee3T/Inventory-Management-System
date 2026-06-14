# Inventory Management System

A simple full-stack inventory management app built as part of my internship assignment. It lets you add, view, update, and delete products, search by name, filter by category, and keeps an eye on items that are running low on stock.

Built with React on the frontend and a Node/Express + MongoDB backend.

## Tech Stack

**Frontend:** React (Vite), Axios
**Backend:** Node.js, Express
**Database:** MongoDB Atlas with Mongoose

## Features

- Add, edit, and delete products
- View all products in a table
- Search products by name
- Filter products by category
- Dashboard stats: total products, low stock count, number of categories
- Products are automatically marked "Low Stock" or "Out of Stock" based on quantity vs. minimum stock, and highlighted in the table

## How It Works

Here's a rough walkthrough of what happens when you actually use the app:

1. **On load**, the dashboard fires two requests to the backend: one to get *all* products (used to calculate the stats cards — total products, low stock count, categories), and one to get the *filtered* list that actually populates the table.

2. **Searching or filtering** updates the table-specific request — the search box and category dropdown get sent as query params to `GET /api/products?search=...&category=...`. The stats cards stay based on the full, unfiltered list, so they always reflect your whole inventory regardless of what you're currently searching for.

3. **Adding a product** opens a modal (with a blurred background) where you fill in name, category, price, quantity, and minimum stock. On submit, this sends a `POST /api/products` request. Once it succeeds, the modal closes and both the stats and the table refresh.

4. **Editing a product** works the same way, except the modal is pre-filled with the existing product's data and submits to `PUT /api/products/:id` instead.

5. **Deleting a product** asks for confirmation first, then sends `DELETE /api/products/:id`. Again, both the stats and table refresh afterward so everything stays in sync.

6. **Low stock / out of stock status** isn't stored anywhere — it's worked out on the frontend by comparing `quantity` to `minStock` for each product, every time the table renders. Rows are highlighted accordingly (yellow for low stock, red for out of stock).

7. Behind the scenes, every request from the frontend goes through a single Axios instance (`src/services/api.js`) pointed at the Express server, which talks to MongoDB via Mongoose. If anything goes wrong on the backend, a global error handler catches it and sends back a readable error message instead of crashing the server.

## Setup Instructions

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd inventory-management
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

You'll need a free MongoDB Atlas cluster — create one, add a database user, whitelist your IP (or use `0.0.0.0/0` for development), and grab the connection string from the "Connect" button.

Start the backend:

```bash
npm run dev
```

If everything's set up correctly, you should see:

```
MongoDB connected
Server running on port 5000
```

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

This will start the Vite dev server, usually at `http://localhost:5173`. Make sure the backend is running first, otherwise the dashboard will show a connection error.

## API Endpoints

| Method | Endpoint                  | Description                                  |
|--------|---------------------------|-----------------------------------------------|
| GET    | `/api/products`           | Get all products (supports `?search=` and `?category=` query params) |
| GET    | `/api/products/low-stock` | Get products where quantity ≤ minStock        |
| POST   | `/api/products`           | Add a new product                              |
| PUT    | `/api/products/:id`        | Update an existing product                     |
| DELETE | `/api/products/:id`        | Delete a product                               |

### Product fields

```json
{
  "name": "String",
  "category": "String",
  "price": "Number",
  "quantity": "Number",
  "minStock": "Number",
  "createdAt": "Date (auto-generated)"
}
```

## Assumptions Made

A few decisions I made while building this, since the assignment left some things open-ended:

- **No authentication.** The assignment explicitly excluded this, so there's no login/user system — anyone with access to the frontend can manage products.
- **"Status" is calculated, not stored.** Instead of saving a `status` field in the database, the frontend works it out on the fly from `quantity` vs `minStock`. This way it's always accurate and never goes stale.
- **Stats cards reflect the full inventory**, not just what's currently filtered/searched. So if you search for "Logitech," the table updates but the "Total Products" and "Categories" counts stay the same — they're meant to be a snapshot of your whole inventory.
- **Categories in the filter dropdown are pulled from existing products**, not hardcoded. Add a product with a brand-new category and it'll show up in the dropdown automatically.
- **Deleting a product asks for confirmation** via a simple browser confirm dialog — nothing fancy, just a safeguard against accidental clicks.
- **Pagination wasn't implemented.** The required APIs don't define pagination params (`page`, `limit`, etc.), so the table currently shows all matching results at once. Fine for the scale of this assignment, but would need addressing for a much larger product catalog.

## Possible Improvements

If I were to keep working on this, here's what I'd tackle next:

- Add pagination on the backend and frontend for large product lists
- Debounce the search input so it doesn't fire an API call on every keystroke
- Add toast notifications for success/error feedback instead of relying on console logs and browser alerts
- Sorting on table columns (price, quantity, etc.)
- Bulk actions (e.g., delete multiple products at once)
- Basic input validation feedback on the frontend before hitting the API
- Unit tests for the controllers and component tests for the React side

## Notes

This was built incrementally — backend first (with each API tested in Postman before moving on), then the React frontend connected to it piece by piece. The UI design was based on a dashboard mockup I was given, so some of the layout and styling decisions were made to match that as closely as possible while keeping things functional within the assignment's scope.
