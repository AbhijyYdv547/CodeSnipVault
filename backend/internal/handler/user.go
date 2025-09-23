package handler

import (
	"backend/internal/database"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// SignupHandler godoc
// @Summary      Register a new user
// @Description  Creates a new user account
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body SignupRequest true "Signup request body"
// @Success      201 {object} UserResponse
// @Failure      400 {object} ErrorResponse
// @Failure      409 {object} ErrorResponse
// @Router       /v1/auth/signup [post]
func (apiCfg *ApiConfig) SignupHandler(w http.ResponseWriter, r *http.Request) {

	type parameters struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, "Error parsing JSON")
		return
	}

	_, err = apiCfg.DB.GetUserByEmail(r.Context(), params.Email)
	if err == nil {
		respondWithError(w, 409, "Email already in use")
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(params.Password), 10)
	if err != nil {
		respondWithError(w, 500, "Internal server error")
		return
	}

	user, err := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Username:  params.Username,
		Email:     params.Email,
		Password:  string(hashedPassword),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	})

	if err != nil {
		respondWithError(w, 400, "Couldn't create user")
		return
	}

	respondWithJSON(w, 201, databaseUserToUser(user))

}

// LoginHandler godoc
// @Summary      User login
// @Description  Authenticate a user and set an auth cookie
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body LoginRequest true "Login credentials"
// @Success      200 {object} LoginResponse
// @Failure      400 {object} ErrorResponse
// @Router       /v1/auth/login [post]
func (apiCfg *ApiConfig) LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	type parameters struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, "Error parsing JSON")
		return
	}

	user, err := apiCfg.DB.GetUserByEmail(r.Context(), params.Email)

	if err != nil {
		respondWithError(w, 400, "Couldn't find user")
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(params.Password))
	if err != nil {
		respondWithError(w, 400, "Wrong password")
		return
	}

	tokenString, err := apiCfg.createToken(user.ID)
	if err != nil {
		respondWithError(w, 400, "Some error occured")
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  time.Now().Add(30 * time.Minute),
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
		Path:     "/",
	})
	respondWithJSON(w, 200, "Login Successful")
}

// LogoutHandler godoc
// @Summary      User logout
// @Description  Invalidate the auth token and clear the cookie
// @Tags         auth
// @Produce      json
// @Success      200 {object} LogoutResponse
// @Failure      401 {object} ErrorResponse
// @Router       /v1/auth/logout [post]
func (apiCfg *ApiConfig) LogoutHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	tokenString, err := r.Cookie("token")
	if err != nil {
		respondWithError(w, http.StatusUnauthorized, "Missing Auth Token")
		return
	}
	token := tokenString.Value

	_, err = apiCfg.verifyToken(token)
	if err != nil {
		respondWithError(w, http.StatusUnauthorized, "Wrong Auth Token")
		return
	}

	cookie := &http.Cookie{
		Name:     "token",
		Value:    "",
		MaxAge:   -1,
		Path:     "/",
		HttpOnly: true,
	}
	http.SetCookie(w, cookie)

	respondWithJSON(w, 200, "Logout successful")
}

// GetUserDetailsHandler godoc
// @Summary      Get user details
// @Description  Fetch the currently authenticated user's profile
// @Tags         user
// @Produce      json
// @Success      200 {object} UserResponse
// @Failure      400 {object} ErrorResponse
// @Failure      401 {object} ErrorResponse
// @Router       /v1/user/profile [get]
func (apiCfg *ApiConfig) GetUserDetailsHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	userData, err := apiCfg.DB.GetUserById(r.Context(), user.ID)

	if err != nil {
		respondWithError(w, 400, "Couldn't find user")
		return
	}
	respondWithJSON(w, 200, databaseUserToUser(userData))
}

// UpdateUserHandler godoc
// @Summary      Update user profile
// @Description  Update username and email for the current user
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        request body UpdateUserRequest true "Updated user info"
// @Success      200 {object} UserResponse
// @Failure      400 {object} ErrorResponse
// @Failure      401 {object} ErrorResponse
// @Router       /v1/user/update [put]
func (apiCfg *ApiConfig) UpdateUserHandler(w http.ResponseWriter, r *http.Request, user database.User) {

	type parameters struct {
		Username string `json:"username"`
		Email    string `json:"email"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error parsing JSON: %v", err))
		return
	}

	updatedUser, err := apiCfg.DB.UpdateUser(r.Context(), database.UpdateUserParams{
		Username: params.Username,
		Email:    params.Email,
		ID:       user.ID,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error updating user: %v", err))
		return
	}

	respondWithJSON(w, 200, databaseUserToUser(updatedUser))
}
