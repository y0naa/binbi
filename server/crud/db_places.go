package crud

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// query parameter
func GetPlaces(c *gin.Context) {
	nama, lokasi, idTempat := "", "", ""

	nama = c.Query("nama")
	lokasi = c.Query("lokasi")
	idTempat = c.Query("idTempat")

	var places []Tempat
	var place Tempat

	if idTempat != "" && idTempat != "undefined" {
		DB.Table("tempat").Where("id_tempat = ?", idTempat).First(&place)
		c.JSON(http.StatusOK, gin.H{"data": place})
	} else {
		if nama != "undefined" && lokasi != "undefined" || nama == "" && lokasi == "" {
			DB.Table("tempat").Where("nama_tempat LIKE '%" + nama + "%'" + "OR lokasi_tempat LIKE '%" + lokasi + "%'").Find(&places)
			c.JSON(http.StatusOK, gin.H{"data": places})
		} else {
			DB.Table("tempat").Find(&places)
			c.JSON(http.StatusOK, gin.H{"data": places})
		}
	}

}

func AddPlace(c *gin.Context) {
	var newPlace Tempat

	err := c.BindJSON(&newPlace)
	if err != nil {
		panic(err.Error())
	}
	newPlace.IdTempat = "T" + newPlace.IdTempat
	err = DB.Table("tempat").Create(&newPlace).Error
	if err != nil {
		panic(err.Error())
	}
	c.JSON(http.StatusOK, gin.H{"success": newPlace})
}

func UpdatePlace(c *gin.Context) {
	var place Tempat
	var updatedPlace Tempat
	err := c.BindJSON(&updatedPlace)
	if err != nil {
		panic(err.Error())
	}
	err = DB.Table("tempat").Where("id_tempat = ?", c.Param("id")).First(&place).Error
	if err != nil {
		panic(err.Error())
	}
	DB.Table("tempat").Model(&place).Updates(updatedPlace)
	if err == nil {
		c.JSON(http.StatusOK, gin.H{"success": place})
	}

}

func DeletePlace(c *gin.Context) {
	var place Tempat
	err := DB.Table("tempat").Where("id_tempat = ?", c.Param("id")).First(&place).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	err = DB.Table("tempat").Delete(&place).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true})
}
