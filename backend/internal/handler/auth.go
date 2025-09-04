package handler

import (
	"backend/internal/database"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type authedHandler func(http.ResponseWriter, *http.Request, database.User)

func (apiCfg *ApiConfig) MiddlewareAuth(handler authedHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			respondWithError(w,http.StatusUnauthorized,"Missing authorization header")
			return
		}

		tokenString = tokenString[len("Bearer "):]

		username, err := verifyToken(tokenString)
  		if err != nil {
    		respondWithError(w,http.StatusUnauthorized,"Invalid token")
    		return
  		}

		user, err := apiCfg.DB.GetUserByUsername(r.Context(), username)
		if err != nil {
			respondWithError(w, http.StatusUnauthorized, "User not found")
			return
		}

		handler(w, r, user)
	}
}

var secretKey = []byte("secret-key")




func createToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}




func verifyToken(tokenString string) (string,error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil || !token.Valid {
		return "", fmt.Errorf("invalid token")
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", fmt.Errorf("invalid token claims")
	}

	username, ok := claims["username"].(string)
	if !ok {
		return "", fmt.Errorf("username not found in token claims")
	}

	return username, nil
}
