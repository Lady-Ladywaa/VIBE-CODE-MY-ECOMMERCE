# AGENTS.md

# Project Overview

Wa-Vibe Fashion is a Muslim fashion e-commerce platform that supports both product sales and rental services.

Customers can:   //ลูกค้าสามารถทำอะไรได้บ้าง
- Buy products
- Rent dresses and accessories
- Book rental periods
- Purchase additional services

Project Structure

- apps/api → Backend
- apps/web → Frontend

---

# Tech Stack

Frontend
- HTML5
- CSS3
- JavaScript (ES6)

Backend
- Node.js
- Express.js

Database
- MongoDB

Version Control
- Git
- GitHub

---

# Database

Database Name

Wa-Vibe-Fashion-db

Collections

| Collection | Description |
|------------|-------------|
| users | Store customer information |
| products | Store products for sale and rental |
| orders | Store purchase orders |
| rentalBookings | Store rental transactions |
| services | Store additional services |

---

# Collection Key Fields

## users

- name
- email
- password
- phone
- address
- measurements

---

## products

- productName
- description
- category
- salePrice
- rentalPrice
- deposit
- canSale
- canRental
- canAlter
- stockQuantity
- imageUrl
- colors
- sizes
- isActive
- createdAt
- updatedAt

---

## orders

- userId
- products
- totalAmount
- paymentStatus
- orderStatus
- createdAt
- updatedAt

---

## rentalBookings

- userId
- items
- rentalStartDate
- rentalEndDate
- actualReturnDate
- totalAmount
- paymentStatus
- rentalStatus
- returnStatus
- createdAt
- updatedAt

---

## services

- serviceName
- description
- serviceType
- price
- duration
- isActive
- createdAt
- updatedAt

---

# Business Rules

Sale

- Customers can buy products.
- Stock quantity decreases after purchase.

Rental

- Customers select rental dates.
- Customers pay rental fee and deposit.
- Rental dates cannot overlap.
- Deposit is refunded after product inspection.

Services

- Makeup Service
- Hijab Styling
- Delivery Service

---

# Coding Standards

- Use camelCase for field names.
- Keep naming consistent.
- Write clean and readable code.
- Reuse existing database collections.
- Do not rename existing fields unless necessary.

---

# Current Status

Completed

- Business Requirement
- MongoDB Schema
- Mock Data

In Progress

- Frontend (apps/web)

Planned

- Backend (apps/api)
