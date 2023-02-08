package crud

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type LoginInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	var input LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	atToken, rtToken, err := LoginCheck(input.Username, input.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"accessToken": atToken, "refreshToken": rtToken})
}

func LoginCheck(username string, password string) (string, string, error) {
	u := Pengguna{}
	err := DB.Table("pengguna").Where("username = ? && password = ?", username, password).Take(&u).Error
	if err != nil {
		return err.Error(), "", nil
	}
	atToken, rtToken := GenerateToken(u.IdUser, u.Username)

	// generate and return token
	return atToken, rtToken, nil

}

func Register(c *gin.Context) {
	var input Pengguna

	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	err = DB.Table("pengguna").Create(&input).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": input})
	c.JSON(http.StatusOK, gin.H{"message": "validation succeeded"})

}
