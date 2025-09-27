# CodeSnipVault

**CodeSnipVault** is a web application for managing and sharing code snippets.
Users can log in, create and organize their snippets by language and type, and optionally share them through unique public links.

---

## Features

* User authentication with JWT
* Create, edit, and delete code snippets
* Filter snippets by language, tags, or search string
* Share snippets via unique URLs (public/private toggle)
* Code editor using CodeMirror
* Dashboard with search and filter options

---

## Tech Stack

### Frontend

* Next.js
* Tailwind CSS
* ShadCN
* CodeMirror

### Backend

* Go (Chi)
* PostgreSQL
* JWT Authentication

### Other

* Docker & Docker Compose
* Deployment: Vercel (frontend), Render/AWS (backend)

---

## Project Structure

```
codesnipvault/
├── backend/          # Go backend (API + DB + Auth)
├── frontend/         # Next.js frontend
└── docker-compose.yml
```

---

## Setup

### 1. Local Development Setup

#### Prerequisites

* Go 1.24+
* Node.js 18+
* PostgreSQL
* Docker (optional, for containerized setup)

---

#### Clone the Repository

```bash
git clone https://github.com/username/CodeSnipVault.git
cd CodeSnipVault
```

---

#### Backend Setup

```bash
cd backend

mv .env.example .env

go mod tidy

cd sql/schema
goose postgres POSTGRES_CONNECTION_STRING up

cd ../..
sqlc generate

cd cmd/api
go build && ./api
```

---

#### Frontend Setup

```bash
cd frontend

mv .env.example .env

npm install

npm run dev
```

---

### 2. Docker Setup 

```bash
docker-compose up --build
```

---

---


## API Endpoints

| Method | Endpoint                        | Description                                   |
| ------ | ------------------------------- | --------------------------------------------- |
| POST   | `/v1/auth/signup`               | Register a new user                           |
| POST   | `/v1/auth/login`                | Login an existing user                        |
| POST   | `/v1/auth/logout`               | Logout the current user (requires auth)       |
| POST   | `/v1/snippets/create`           | Create a new snippet (requires auth)          |
| GET    | `/v1/snippets/`                 | Get all snippets for the user (requires auth) |
| GET    | `/v1/snippets/{id}`             | Get a specific snippet (requires auth)        |
| PUT    | `/v1/snippets/{id}`             | Update a specific snippet (requires auth)     |
| DELETE | `/v1/snippets/{id}`             | Delete a specific snippet (requires auth)     |
| GET    | `/v1/snippets/share/{share_id}` | View a public/shared snippet (no auth)        |
| GET    | `/v1/user/profile`              | Get user profile details (requires auth)      |
| PUT    | `/v1/user/update`               | Update user profile (requires auth)           |

---

## Screenshots

<details>
<summary>Landing Page</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/b196a58f-ea42-4a21-ae72-efc9195722e7" width="600"/>

</p>
</details>

<details>
<summary>Login and Signup Pages</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/1c417ff5-10d9-40fa-af42-53cc10b5eaa4" width="300"/>
  <img src="https://github.com/user-attachments/assets/8f30ba45-bbb1-42e5-8264-1bf9b01fae50" width="300"/>
</p>
</details>

<details>
<summary>Snippet Dashboard</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/7d27a918-34ca-47c9-a5e1-5422172fd7a6" width="600"/>
</p>
</details>

<details>
<summary>Snippet Generation Page</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/dfe9f277-f5f3-4f23-9702-1704797a3238" width="600"/>
</p>
</details>

<details>
<summary>Snippet Updation</summary>
<p align="center">
<img src="https://github.com/user-attachments/assets/925768e3-9aac-4a45-aac6-0ac0fa2a2490" width="600" />
</p>
</details>

<details>
<summary>User Profile Page</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/d0b74dbf-ef90-471d-b9d7-c0fe71195d1a" width="600"/>
</p>
</details>


---

## Roadmap

### Completed

* Frontend authentication pages
* Hook auth pages to endpoints
* Snippet dashboard
* Snippet Editor
* Hook dashboard and editor to endpoints
* Public snippet sharing

### Planned

* Add unit tests
* Add integration tests
* Deployment with CI/CD

---

## Contribution

Feel free to fork the repository, make improvements, or suggest features via pull requests.

