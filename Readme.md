# CodeSnipVault

CodeSnipVault is a web application for managing and sharing code snippets.
Users can log in, create and organize their snippets by language and type, and optionally share them through unique public links.

---

## Features

* User authentication with JWT
* Create, edit, and delete code snippets
* Filter snippets by language, tags or search string
* Share snippets via unique URLs (public/private toggle)
* Code editor using CodeMirror
* Dashboard with search and filter options

---

## Tech Stack

**Frontend**

* Next.js
* Tailwind CSS
* ShadCN
* CodeMirror

**Backend**

* Go (Chi)
* PostgreSQL
* JWT Authentication

**Other**

* Docker & Docker Compose
* Deployment: Vercel (frontend), Render/AWS (backend)

---

## Project Structure

```
codesnipvault/
  backend/          # Go backend (API + DB + Auth)
  frontend/         # Next.js frontend
  docker-compose.yml
```

---

## Development Setup

### Prerequisites

* Go 1.24+
* Node.js 18+
* PostgreSQL
* Docker (optional, for containerized setup)

### Fork the Repository then Clone your fork locally

```bash
git clone https://github.com/username/CodeSnipVault.git
cd CodeSnipVault
```

### Backend Setup

In the backend folder,
 * Change .env.example file to .env
 * Put the values in the .env file

```bash
cd backend
go mod tidy

cd sql/schema
goose postgres POSTGRES_CONNECTION_STRING up
cd ../..

sqlc generate
# Start the server
cd cmd/api
go build && ./api
```

### Frontend Setup

In the frontend folder,
 * Change .env.example file to .env
 * Put the values in the .env file

```bash
cd frontend
npm install
npm run dev
```

### Docker Setup (Planned)

```bash
docker-compose up --build
```

---

## Roadmap

* [X] Frontend authentication pages
* [X] Hook auth pages to endpoints
* [X] Snippet dashboard 
* [X] Snippet Editor
* [X] Hook Dashboard and editor to endpoints
* [X] Public snippet sharing
* [ ] Deployment with CI/CD

