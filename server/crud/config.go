package crud

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB

func OpenConnection() {

	db, err := gorm.Open("mysql", "root:incorrect123@tcp(127.0.0.1:3306)/rental_tempat")
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("Koneksi ke database berhasil")
	DB = db
}
