# AgroMan API Specification

## Overview

RESTful API para a plataforma AgroMan - Marketplace de Produtos Agrícolas.

**Base URL**: `http://localhost:5000/api`  
**Version**: 0.1.0  
**Authentication**: JWT Bearer Token

---

## Authentication Endpoints

### Register User

Register a new user as producer, vendor, or consumer.

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "João Silva",
  "user_type": "producer",
  "phone": "+258 84 123 4567",
  "location": "Maputo"
}
```

**Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "João Silva",
    "user_type": "producer"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Login

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (200 OK):
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "João Silva",
    "user_type": "producer"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Get User Profile

**Endpoint**: `GET /auth/profile/:userId`

**Response** (200 OK):
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "João Silva",
  "user_type": "producer",
  "phone": "+258 84 123 4567",
  "location": "Maputo",
  "created_at": "2025-11-30T10:00:00.000Z"
}
```

---

## Products Endpoints

### List Products

Get all available products with optional filtering.

**Endpoint**: `GET /products?category=Vegetais&search=tomate&limit=20&offset=0`

**Query Parameters**:
- `category` (optional): Filter by category
- `search` (optional): Search by name or description
- `limit` (optional, default 20): Maximum results
- `offset` (optional, default 0): Pagination offset

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Tomates Orgânicos",
    "description": "Tomates frescos de excelente qualidade",
    "category": "Vegetais",
    "price": 5.50,
    "quantity": 100,
    "image_url": null,
    "is_available": true,
    "seller_name": "João Silva",
    "created_at": "2025-11-30T10:00:00.000Z"
  }
]
```

---

### Get Product Details

**Endpoint**: `GET /products/:id`

**Response** (200 OK):
```json
{
  "id": 1,
  "user_id": 1,
  "name": "Tomates Orgânicos",
  "description": "Tomates frescos de excelente qualidade",
  "category": "Vegetais",
  "price": 5.50,
  "quantity": 100,
  "is_available": true,
  "seller_name": "João Silva",
  "created_at": "2025-11-30T10:00:00.000Z"
}
```

---

### Add Product (Vendor/Producer Only)

**Endpoint**: `POST /products`

**Request Body**:
```json
{
  "user_id": 1,
  "name": "Alface Fresca",
  "description": "Alface cultivada em sistema hidropônico",
  "category": "Vegetais",
  "price": 3.00,
  "quantity": 150
}
```

**Response** (201 Created):
```json
{
  "message": "Product added successfully",
  "product_id": 6
}
```

---

### Update Product

**Endpoint**: `PUT /products/:id`

**Request Body**:
```json
{
  "name": "Alface Fresca Premium",
  "price": 3.50,
  "quantity": 200,
  "is_available": true
}
```

**Response** (200 OK):
```json
{
  "message": "Product updated successfully"
}
```

---

### Get Categories

**Endpoint**: `GET /products/categories/list`

**Response** (200 OK):
```json
[
  "Vegetais",
  "Frutas",
  "Grãos",
  "Naturais"
]
```

---

## Sales & Orders Endpoints

### Get User Cart

**Endpoint**: `GET /sales/cart/:userId`

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "product_id": 1,
      "name": "Tomates Orgânicos",
      "price": 5.50,
      "image_url": null
    }
  ],
  "total": "11.00"
}
```

---

### Add to Cart

**Endpoint**: `POST /sales/cart/add`

**Request Body**:
```json
{
  "user_id": 3,
  "product_id": 1,
  "quantity": 2
}
```

**Response** (200 OK):
```json
{
  "message": "Product added to cart"
}
```

---

### Remove from Cart

**Endpoint**: `DELETE /sales/cart/item/:cartItemId`

**Response** (200 OK):
```json
{
  "message": "Item removed from cart"
}
```

---

### Create Order

Converts cart items to an order.

**Endpoint**: `POST /sales/order/create`

**Request Body**:
```json
{
  "buyer_id": 3,
  "seller_id": 1,
  "delivery_address": "Avenida 25 de Junho, Maputo"
}
```

**Response** (201 Created):
```json
{
  "message": "Order created successfully",
  "order_id": 5,
  "total_amount": "11.00"
}
```

---

### Get User Orders

Get all orders for a user (as buyer or seller).

**Endpoint**: `GET /sales/orders/:userId`

**Response** (200 OK):
```json
[
  {
    "id": 5,
    "buyer_id": 3,
    "seller_id": 1,
    "total_amount": 11.00,
    "status": "pending",
    "delivery_address": "Avenida 25 de Junho, Maputo",
    "seller_name": "João Silva",
    "created_at": "2025-11-30T11:30:00.000Z",
    "updated_at": "2025-11-30T11:30:00.000Z"
  }
]
```

---

### Update Order Status

**Endpoint**: `PUT /sales/order/:id/status`

**Request Body**:
```json
{
  "status": "confirmed"
}
```

**Valid Status Values**: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

**Response** (200 OK):
```json
{
  "message": "Order status updated"
}
```

---

## Intelligent Queries Endpoints

### Submit Query

Submit a question about agriculture, plants, or farming practices.

**Endpoint**: `POST /consultas/query`

**Request Body**:
```json
{
  "user_id": 3,
  "query_text": "Como cultivar tomates organicamente?",
  "category": "agricultura"
}
```

**Response** (201 Created):
```json
{
  "query_id": 1,
  "query": "Como cultivar tomates organicamente?",
  "response": "Tomates precisam de sol pleno (6-8 horas), rega regular e solo bem drenado. Cultive em primavera/verão.",
  "timestamp": "2025-11-30T11:45:00.000Z"
}
```

---

### Get Query History

**Endpoint**: `GET /consultas/history/:userId?limit=20`

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "query_text": "Como cultivar tomates organicamente?",
    "category": "agricultura",
    "response": "Tomates precisam de sol pleno...",
    "created_at": "2025-11-30T11:45:00.000Z"
  }
]
```

---

### Get Common Topics

**Endpoint**: `GET /consultas/topics/common`

**Response** (200 OK):
```json
{
  "topics": [
    "Cultivo de plantas",
    "Irrigação e rega",
    "Pragas e doenças",
    "Preparação do solo",
    "Fertilização",
    "Colheita e armazenamento"
  ]
}
```

---

## Dashboard Endpoints

### Get Metrics

Get overall platform metrics.

**Endpoint**: `GET /dashboard/metrics`

**Response** (200 OK):
```json
{
  "active_producers": 5,
  "active_vendors": 8,
  "total_sales": 42,
  "total_revenue": 523.50,
  "popular_products": [
    {
      "id": 1,
      "name": "Tomates Orgânicos",
      "order_count": 12
    }
  ]
}
```

---

### Get Vendor Sales History

**Endpoint**: `GET /dashboard/vendor/:vendorId/sales`

**Response** (200 OK):
```json
[
  {
    "id": 5,
    "buyer_id": 3,
    "buyer_name": "Carlos Consumidor",
    "total_amount": 11.00,
    "status": "pending",
    "created_at": "2025-11-30T11:30:00.000Z"
  }
]
```

---

### Get Vendor Statistics

**Endpoint**: `GET /dashboard/vendor/:vendorId/stats`

**Response** (200 OK):
```json
{
  "products_listed": 12,
  "total_sales": 42,
  "total_revenue": 523.50,
  "pending_orders": 5
}
```

---

### Get Category Sales

**Endpoint**: `GET /dashboard/categories/sales`

**Response** (200 OK):
```json
[
  {
    "category": "Vegetais",
    "sales_count": 25,
    "total_quantity": 150
  },
  {
    "category": "Frutas",
    "sales_count": 12,
    "total_quantity": 80
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 409 Conflict
```json
{
  "error": "Email already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Health Check

**Endpoint**: `GET /health`

**Response** (200 OK):
```json
{
  "status": "OK",
  "timestamp": "2025-11-30T12:00:00.000Z"
}
```

---

## Rate Limiting

Not yet implemented. To be added in production.

## CORS

Enabled for all origins in development.

## Authentication

Use the JWT token received during login in the `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

**Last Updated**: 2025-11-30  
**API Version**: 0.1.0
