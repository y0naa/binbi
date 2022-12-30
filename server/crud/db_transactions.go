package crud

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTransactions(c *gin.Context) {
	var transactions []Transaksi
	userId, err := GetValidatedToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot get current user"})
		return
	}
	err = DB.Table("transaksi").Where("id_reservasi LIKE '%" + userId + "%'").Find(&transactions).Error
	if err != nil {
		panic(err.Error)
	}
	c.JSON(http.StatusOK, gin.H{"data": transactions})
}

func AddTransaction(c *gin.Context) {
	var transaction Transaksi

	err := c.BindJSON(&transaction)
	if err != nil {
		panic(err.Error())
	}

	transaction.IdTransaksi = "TR" + transaction.IdTransaksi
	err = DB.Table("transaksi").Create(&transaction).Error
	if err != nil {
		panic(err.Error())
	}
	c.JSON(http.StatusOK, gin.H{"success": transaction})
}
