package crud

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

var JWT_SIGNING_METHOD = jwt.SigningMethodHS256
var JWT_SIGNATURE_KEY = []byte("harry potter dan batu bertuah") // should be outside

type JWTClaim struct {
	IdUser   string `json:"id_user"`
	Username string `json:"usename"`
	jwt.StandardClaims
}

type JWTClaim2 struct {
	jwt.StandardClaims
}

func GenerateToken(id_user string, username string) (string, string) {
	atExp := time.Now().Add(15 * time.Minute)
	rtExp := time.Now().Add(168 * time.Hour)
	atClaims := &JWTClaim{
		IdUser:   id_user,
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: atExp.Unix(),
		},
	}

	rtClaims := &JWTClaim2{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: rtExp.Unix(),
		},
	}

	atToken := jwt.NewWithClaims(JWT_SIGNING_METHOD, atClaims)
	rtToken := jwt.NewWithClaims(JWT_SIGNING_METHOD, rtClaims)

	at, err := atToken.SignedString(JWT_SIGNATURE_KEY)
	if err != nil {
		return err.Error(), "error"
	}

	rt, err := rtToken.SignedString(JWT_SIGNATURE_KEY)
	if err != nil {
		return "error", err.Error()
	}

	return at, rt
}

func ValidateToken(accessToken string, refreshToken string) (string, error) {
	rtToken, err := jwt.ParseWithClaims(
		refreshToken,
		&JWTClaim2{}, //&JWTClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(JWT_SIGNATURE_KEY), nil
		},
	)
	if err != nil {

		return err.Error(), err
	}
	rtClaims, ok := rtToken.Claims.(*JWTClaim2)

	if !ok {
		err = errors.New("couldn't parse rtClaims")
		return err.Error(), err
	}
	if rtClaims.ExpiresAt < time.Now().Local().Unix() {
		err = errors.New("token expired, please log in")
		return err.Error(), err
	}

	atToken, err := jwt.ParseWithClaims(
		accessToken,
		&JWTClaim{}, //&JWTClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(JWT_SIGNATURE_KEY), nil
		},
	)

	atClaims, ok := atToken.Claims.(*JWTClaim)

	if !ok {
		err = errors.New("couldn't parse atClaims")
		return err.Error(), err
	}
	if atClaims.ExpiresAt < time.Now().Local().Unix() {
		fmt.Println("true")
		atExp := time.Now().Add(15 * time.Minute)
		atClaims = &JWTClaim{
			IdUser:   atClaims.IdUser,
			Username: atClaims.Username,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: atExp.Unix(),
			},
		}
		atToken := jwt.NewWithClaims(JWT_SIGNING_METHOD, atClaims)
		atToken, err := jwt.ParseWithClaims(
			accessToken,
			&JWTClaim{}, //&JWTClaim{},
			func(token *jwt.Token) (interface{}, error) {
				return []byte(JWT_SIGNATURE_KEY), nil
			},
		)

		atClaims, ok := atToken.Claims.(*JWTClaim)
		if !ok {
			err = errors.New("couldn't parse atClaims")
			return err.Error(), err
		}
		return atClaims.IdUser, nil
	}

	if err != nil {
		return "error", err
	}
	return atClaims.IdUser, nil
}

func JWTMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		atString := context.GetHeader("Access-Token")
		if atString == "" {
			context.JSON(http.StatusBadRequest, gin.H{"error": "request does not contain an access token"})
			context.Abort()
			return
		}
		rtString := context.GetHeader("Refresh-Token")
		if rtString == "" {
			context.JSON(http.StatusBadRequest, gin.H{"error": "request does not contain an access token"})
			context.Abort()
			return
		}
		_, err := ValidateToken(atString, rtString)
		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			context.Abort()
			return
		}

		context.Next()
	}
}

func ExtractToken(c *gin.Context) (string, string) {
	aToken := c.Query("aToken")
	rToken := c.Query("rToken")

	if aToken != "" {
		return "", ""
	}
	aToken = c.Request.Header.Get("Access-Token")
	if len(strings.Split(aToken, " ")) == 2 {
		aToken = strings.Split(aToken, " ")[1]
	}

	if rToken != "" {
		return "", ""
	}
	rToken = c.Request.Header.Get("Refresh-Token")
	if len(strings.Split(rToken, " ")) == 2 {
		rToken = strings.Split(rToken, " ")[1]
	}
	return aToken, rToken
}

func GetValidatedToken(c *gin.Context) (string, error) {
	aToken, rToken := ExtractToken(c)
	fmt.Println("atoken = " + aToken)
	fmt.Println("rtoken = " + rToken)

	userId, err := ValidateToken(aToken, rToken)
	fmt.Println(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot get user"})
		return "Something went wrong: ", err
	}

	return userId, nil
}
