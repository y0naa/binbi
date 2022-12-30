package crud

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetReservations(c *gin.Context) {
	var reservations []DetailReservasi

	userId, err := GetValidatedToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot get current user"})
		return
	}
	err = DB.Table("detail_reservasi").Where("id_penyewa = ?", userId).Find(&reservations).Error
	if err != nil {
		panic("Someting when wrong")
	}
	c.JSON(http.StatusOK, gin.H{"data": reservations})
}

func GetOwnerReservations(c *gin.Context) {
	var reservations []DetailReservasi

	userId, err := GetValidatedToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot get current user"})
		return
	}
	err = DB.Table("detail_reservasi").Where("id_pemilik = ?", userId).Find(&reservations).Error
	if err != nil {
		panic("Someting when wrong")
	}
	c.JSON(http.StatusOK, gin.H{"data": reservations})
}

// Awalan R{UserId}
func AddReservation(c *gin.Context) {
	var reservation DetailReservasi
	userId, err := GetValidatedToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot get current user"})
		return
	}
	err = c.BindJSON(&reservation)
	if err != nil {
		panic(err.Error())
	}
	reservation.IdReservasi = "R" + userId + reservation.IdReservasi
	err = DB.Table("detail_reservasi").Create(&reservation).Error
	if err != nil {
		panic(err.Error())
	}
	c.JSON(http.StatusOK, gin.H{"success": reservation})
}
