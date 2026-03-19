# Identity Broker Demo – React Frontend

## Overview

This repository contains a **React frontend application** used to demonstrate an **Identity Broker**.  
The application allows users to authenticate using **multiple Identity Providers (IDPs)** and then submit feedback once authenticated.

Authentication is handled using **session cookies**, with the frontend interacting with the backend authentication service to establish and maintain the session.

The application is intended as a **demonstration and testing interface** for the identity broker rather than a full production application.

---

## Features

- Sign in using **multiple identity providers**
- Authentication handled through **session cookies**
- Automatic **session validation and refresh**
- Authenticated users can **submit feedback**
- Simple UI designed to demonstrate authentication flows

---

## Architecture

User
│
▼
React Frontend
│
▼
Identity Broker Backend
│
├── Identity Provider 1
├── Identity Provider 2
└── Identity Provider N


The React frontend:

1. Redirects the user to the identity broker for authentication.
2. Receives a session via **secure session cookies** after successful authentication.
3. Uses the session to access authenticated endpoints.
4. Allows the user to submit feedback.

---

## Authentication Flow

1. User accesses the application.
2. The frontend checks for an existing session.
3. If no session exists, the user is presented with a list of **available IDPs**.
4. The user selects an IDP and is redirected to authenticate.
5. After successful authentication, the identity broker sets a **session cookie**.
6. The frontend retrieves the session and grants access to the feedback page.

---

## Technologies Used

- **React**
- **JavaScript / JSX**
- **Session Cookie Authentication**
- **REST APIs**

---

## Running the Application

### Prerequisites

- Node.js
- npm or yarn
- Identity Broker backend running

### Install dependencies

```bash
npm install