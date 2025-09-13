package handler

import (
	"backend/internal/database"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

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

	respondWithJSON(w, 201, user)

}

func (apiCfg *ApiConfig) LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	godotenv.Load("../../.env")
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

	tokenString, err := createToken(user.Username)
	if err != nil {
		respondWithError(w, 400, "Some error occured")
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  time.Now().Add(30 * time.Minute),
		HttpOnly: true,
		Secure:   os.Getenv("ENV") == "production",
		SameSite: http.SameSiteStrictMode,
		Path:     "/",
	})
	respondWithJSON(w, 200, "Login Successful")
}

func (apiCfg *ApiConfig) LogoutHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	tokenString, err := r.Cookie("token")
	if err != nil {
		respondWithError(w, http.StatusUnauthorized, "Missing Auth Token")
		return
	}
	token := tokenString.Value

	_, err = verifyToken(token)
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

func (apiCfg *ApiConfig) GetUserDetailsHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	userData, err := apiCfg.DB.GetUserById(r.Context(), user.ID)

	if err != nil {
		respondWithError(w, 400, "Couldn't find user")
		return
	}
	respondWithJSON(w, 200, userData)
}
