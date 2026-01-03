# Cinema Management System

A comprehensive web application for managing a single-theater cinema, handling both customer-facing ticket sales and staff operations.

## Overview

This application serves a cinema/theater with a single screening space. It provides two main interfaces:

- **Client Side**: Public-facing ticket booking and purchase experience
- **Staff Side**: Administrative and operational management tools

## Architecture

### Client Side

The client-facing application provides a modern, image-focused browsing experience with minimal text until the purchase process. Key features include:

- **Browse & Purchase**: Customers can browse movies and purchase tickets without requiring an account
- **Visual-First Design**: Image-heavy interface with sliders/carousels showcasing movies
- **Seat Selection**: Interactive seat map with 10-minute reservation holds during selection
- **Payment Integration**: MercadoPago payment processing (Argentina)
- **Subscription Program**: Membership program with benefits (details TBD)
- **Guest Checkout**: Full purchase flow available without account registration

### Staff Side

#### Admin/Director Access

Full administrative control including:

- Complete movie/event management (CRUD operations)
- Showtime scheduling and management
- Financial reports and analytics
- Staff management and role-based permissions
- Pricing configuration and dynamic pricing per showtime/movie
- Discount codes and promotions management
- System configuration

#### Employee Access

Limited operational capabilities:

- Ticket sales at point of sale
- Candy bar/concessions sales
- Ticket printing from online purchases (QR code scanning)
- No access to financial data or reports
- No access to administrative functions

## Key Features

### Booking & Reservations

- Real-time seat availability
- 10-minute temporary seat reservation during selection
- Automatic release of unconfirmed reservations
- QR code generation for online purchases
- Ticket printing at cinema location

### Pricing

- Dynamic pricing per showtime and movie
- Discount codes and promotional pricing
- Support for multiple price types (standard, student, senior, etc.)

### Concessions

- Candy bar/food sales management
- Combo deals (to be elaborated)
- Integration with point-of-sale system

### Subscription Program

- Membership system with customer benefits
- Implementation details to be determined

## Business Rules

### Seat Reservations

- Seats are temporarily reserved for 10 minutes when selected
- Unconfirmed reservations automatically expire after 10 minutes
- Standard cancellation/refund policies (to be confirmed with cinema)

### Access Control

- Role-based access control (RBAC)
- Admin: Full system access
- Employee: Limited to sales operations, no financial data

### Theater Management

- Single screening space (no multiple theaters)
- One movie/showtime at a time
- Theater availability validation for showtime scheduling

## Future Considerations

- Subscription program benefits and structure
- Detailed concessions/combo management
- Cancellation and refund policies
- Gift card system implementation
- Event screening capabilities
