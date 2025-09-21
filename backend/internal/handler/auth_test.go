package handler

import (
	"os"
	"testing"
)

func TestGetSecret(t *testing.T) {
	os.Setenv("JWT_SECRET", "test-secret")
	for i := 0; i < 3; i++ {
		secret, err := getSecret()
		if err != nil {
			t.Fatalf("Run %d: expected no error, got: %v", i, err)
		}
		if string(secret) != "test-secret" {
			t.Errorf("Run %d: expected 'test-secret', got '%s'", i, secret)
		}
	}
}

func TestCreateToken(t *testing.T) {

}
