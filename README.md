# GrowShare Fullstack Platform

GrowShare is a full-stack web application designed for gardening enthusiasts. It features a complete marketplace for plants and seeds, a social feed for sharing updates, and a garden management system to track plant progress.

## Project Structure

This project follows a modular, monorepo-style structure:
- `/client` - Next.js frontend application (React, TailwindCSS, Framer Motion)
- `/server` - Express.js backend API (TypeScript, Prisma ORM, PostgreSQL)

---

## 🚀 Backend Project Requirements Implementation

This backend was built adhering strictly to the required specifications:

### 1. Project Setup
- **Express.js & TypeScript:** Used as the core backend framework.
- **PostgreSQL & Prisma:** Normalized relational database management.
- **JWT & bcrypt:** Secure authentication and password hashing.
- **dotenv & CORS:** Environment configuration and cross-origin security.

### 2. Project Structure
Maintains a clean and modular architecture (`/server/src`):
- `/controllers` - Contains both logic (services) and routing grouped by module (e.g., `/user`, `/category`, `/listing`).
- `/middlewares` - Global error handlers and authentication guards.
- `/lib` - Reusable utilities like the Prisma client.

### 3. Database Design
- **Minimum 4 services:** Contains 15+ services (Users, Gardens, Plants, Posts, Listings, Transactions, etc.).
- **At least 2 Enums:** Used `UserRole`, `ListingType`, `ListingStatus`, `ExchangeStatus`, `PlantStage`, etc.
- **Soft Delete:** Implemented `isDeleted` on all major models.
- **Timestamps:** Included `createdAt` and `updatedAt`.
- **Table Mapping:** Used `@@map()` for all models (e.g., `@@map("users")`).
- **Indexes:** Applied `@@index` for optimized querying (e.g., `@@index([userId])`).

### 4. Authentication System
Fully implemented user registration, login, JWT issuance, and bcrypt password hashing.

### 5. CRUD API Development
Developed complete REST APIs with a consistent response structure:
```json
{
  "success": true,
  "message": "Entity retrieved successfully",
  "data": { ... }
}
```

---

## 📖 API Documentation

Below is the API documentation for the core modules. All endpoints (except public ones like auth) require a `Bearer <token>` in the `Authorization` header.

### Authentication (`/api/auth`)

| Endpoint | Method | Description | Request Body | Status | Response Data |
|----------|--------|-------------|--------------|--------|---------------|
| `/register` | POST | Register a new user | `{ name, email, password }` | 201 | `{ id, name, email, role }` |
| `/login` | POST | Login and get token | `{ email, password }` | 200 | `{ accessToken, user: {...} }` |

### Users (`/api/users`)

| Endpoint | Method | Description | Request Body | Status | Response Data |
|----------|--------|-------------|--------------|--------|---------------|
| `/profile` | GET | Get logged-in user profile | None | 200 | `{ id, name, email, bio, ... }` |
| `/profile` | PATCH | Update user profile | `{ name, bio, location, profileImage }` | 200 | `{ id, name, ... }` |
| `/` | GET | Get all active users | None | 200 | `[{ id, name, email }]` |
| `/:id` | DELETE | Soft delete a user | None | 200 | `null` |

### Categories (`/api/categories`)

| Endpoint | Method | Description | Request Body | Status | Response Data |
|----------|--------|-------------|--------------|--------|---------------|
| `/` | POST | Create a new category | `{ name, description }` | 201 | `{ id, name, description }` |
| `/` | GET | Get all categories | None | 200 | `[{ id, name, description }]` |
| `/:id` | PATCH | Update a category | `{ name, description }` | 200 | `{ id, name, description }` |
| `/:id` | DELETE | Soft delete a category | None | 200 | `null` |

### Gardens (`/api/gardens`)

| Endpoint | Method | Description | Request Body | Status | Response Data |
|----------|--------|-------------|--------------|--------|---------------|
| `/` | POST | Create a garden | `{ name }` | 201 | `{ id, name, userId }` |
| `/` | GET | Get user's gardens | None | 200 | `[{ id, name, plants: [...] }]` |
| `/:id` | PATCH | Update garden | `{ name }` | 200 | `{ id, name }` |
| `/:id` | DELETE | Soft delete garden | None | 200 | `null` |

### Listings (Marketplace) (`/api/listings`)

| Endpoint | Method | Description | Request Body | Status | Response Data |
|----------|--------|-------------|--------------|--------|---------------|
| `/` | POST | Create a listing | `{ title, description, price, type, location, categoryId, status }` | 201 | `{ id, title, price, type, ... }` |
| `/` | GET | Get all listings (Filters via Query) | None | 200 | `{ meta: {...}, data: [...] }` |
| `/:id` | GET | Get listing by ID | None | 200 | `{ id, title, category: {...}, user: {...} }` |
| `/:id` | PATCH | Update a listing | `{ title, price, status... }` | 200 | `{ id, title, ... }` |
| `/:id` | DELETE | Soft delete a listing | None | 200 | `null` |

### Social Feed (`/api/posts` & `/api/likes`)

| Endpoint | Method | Description | Request Body | Status | Response Data |
|----------|--------|-------------|--------------|--------|---------------|
| `/posts` | POST | Create a social post | `{ description, postType }` | 201 | `{ id, description, postType }` |
| `/posts` | GET | Get all active posts | None | 200 | `{ meta: {...}, data: [{..., _count}] }` |
| `/posts/:id` | DELETE | Soft delete a post | None | 200 | `null` |
| `/likes` | POST | Toggle a like on a post | `{ postId }` | 201/200| `{ id, postId, userId }` or `{ status: "unliked" }` |
| `/comments` | POST | Add a comment to a post | `{ postId, content }` | 201 | `{ id, content, postId }` |

---

## 💻 Frontend Integration
The Next.js frontend uses an Axios interceptor (`/client/src/lib/api/axios.ts`) to attach the JWT dynamically. All backend routes have been fully consumed across pages (Dashboard, Marketplace, Social Feed), enabling end-to-end authentication and real-time UI updates upon CRUD operations.
