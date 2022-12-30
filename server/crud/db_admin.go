package crud

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// admin functions that uses userID in token (if userID is 01 then its admin)

func CurrentUser(c *gin.Context) {
	var pengguna Pengguna
	userId, err := GetValidatedToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot get current user"})
		return
	}
	user := DB.Table("pengguna").Where("id_user = ?", userId).First(&pengguna)
	c.JSON(http.StatusOK, gin.H{"message": "success", "user": user})

}

func AdminGetUsers(c *gin.Context) {
	var pengguna Pengguna
	userId, err := GetValidatedToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot get current user"})
		return
	}
	DB.Table("pengguna").Where("id_user = ?", userId).First(&pengguna)
	if userId == "01" {
		GetUsers(c)
	}

}

func AdminGetUser(c *gin.Context) {
	var pengguna Pengguna
	userId, err := GetValidatedToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot get current user"})
		return
	}
	DB.Table("pengguna").Where("id_user = ?", userId).First(&pengguna)
	if userId == "01" {
		GetOneUser(c)
	}
}
