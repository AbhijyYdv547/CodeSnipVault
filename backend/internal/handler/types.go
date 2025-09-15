package handler

import (
	"github.com/google/uuid"
)

type SignupRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserResponse struct {
	ID       uuid.UUID `json:"id"`
	Username string    `json:"username"`
	Email    string    `json:"email"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Message string `json:"message"`
}

type LogoutResponse struct {
	Message string `json:"message"`
}

type UpdateUserRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}
