# CodeSnipVault

CodeSnipVault is a web application for managing and sharing code snippets.
Users can log in, create and organize their snippets by language and type, and optionally share them through unique public links.

---

## Features (Planned)

* User authentication with JWT
* Create, edit, and delete code snippets
* Organize snippets by language and type
* Share snippets via unique URLs (public/private toggle)
* Syntax highlighting for code snippets
* Dashboard with search and filter options

---

## Tech Stack

**Frontend**

* Next.js
* Tailwind CSS
* Syntax highlighting (Prism.js or Shiki)

**Backend**

* Go (Gin/Fiber)
* PostgreSQL
* JWT Authentication

**Other**

* Docker & Docker Compose
* Deployment: Vercel (frontend), Railway/GCP (backend)

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

* Go 1.22+
* Node.js 18+
* PostgreSQL
* Docker (optional, for containerized setup)

### Clone the Repository

```bash
git clone https://github.com/yourusername/codesnipvault.git
cd codesnipvault
```

### Backend Setup

```bash
cd backend
go mod tidy
# Run migrations (to be added later)
# Start the server
go run cmd/server/main.go
```

### Frontend Setup

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

* [ ] Backend project setup
* [ ] User authentication (JWT)
* [ ] Snippet CRUD APIs
* [ ] Frontend authentication pages
* [ ] Snippet dashboard and editor
* [ ] Public snippet sharing
* [ ] Deployment with CI/CD

