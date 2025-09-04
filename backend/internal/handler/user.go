package handler

import (
	"backend/internal/database"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func (apiCfg *ApiConfig) SignupHandler(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Username string `json:"username"`
		Email string `json:"email"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error parsing JSON: %v", err))
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

	user,err := apiCfg.DB.CreatUser(r.Context(), database.CreatUserParams{
		ID: uuid.New(),
		Username: params.Username,
		Email: params.Email,
		Password: string(hashedPassword),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	})

		if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Couldn't create user: %v", err))
		return
	}

	respondWithJSON(w, 201, user)
	
}



func (apiCfg *ApiConfig) LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	type parameters struct {
		Email string `json:"email"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error parsing JSON: %v", err))
		return
	}

	
	user,err := apiCfg.DB.GetUserByEmail(r.Context(), params.Email)
	
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Couldn't find user: %v", err))
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(params.Password))
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Wrong password: %v", err))
		return
	}


	tokenString, err := createToken(user.Username)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Some error occured: %v", err))
		return
	}

	respondWithJSON(w, 201,tokenString)
	
}