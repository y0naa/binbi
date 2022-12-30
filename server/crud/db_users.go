package crud

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	var users []Pengguna
	DB.Table("pengguna").Find(&users)
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func GetOneUser(c *gin.Context) {
	var pengguna []Pengguna
	err := DB.Table("pengguna").Where("id_user = ?", c.Param("id")).First(&pengguna).Error
	if err != nil {
		panic(err.Error())
	}
	c.JSON(http.StatusOK, gin.H{"data": pengguna})
}
