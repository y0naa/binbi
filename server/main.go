package main

import (
	"server/crud"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin" // Framework untuk REST API
)

func main() {
	crud.OpenConnection()
	defer crud.DB.Close() // Dipanggil Paling Akhir

	router := initRouter()
	router.Run("localhost:3030")

}

func initRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"},
		AllowCredentials: true,
	}))

	router.POST("/register", crud.Register)
	router.POST("/login", crud.Login)

	protectedUser := router.Group("/user")
	protectedUser.Use(crud.JWTMiddleware()) // harus ada access token
	{
		protectedUser.GET("/", crud.CurrentUser)     // liat profile sendiri
		protectedUser.GET("/places", crud.GetPlaces) // Liat tempat2 yang disewa
		protectedUser.POST("/places", crud.AddPlace) // menambahkan tempat yang disewa

		// menggunakan id user tertentu (pake token agar tidak disalah gunakan)
		protectedUser.GET("/reservations", crud.GetReservations) // get daftar detail reservasi
		protectedUser.GET("/orders", crud.GetOwnerReservations)  // get daftar detail reservasi by ID untuk notif pemilik
		protectedUser.POST("/reservations", crud.AddReservation) // menambahkan reservasi
		protectedUser.GET("/transactions", crud.GetTransactions) // get daftar transaksi
		protectedUser.POST("/transactions", crud.AddTransaction) // menambahkan transaksi
	}

	protectedAdmin := router.Group("/admin")
	protectedAdmin.Use(crud.JWTMiddleware())
	{
		protectedAdmin.GET("/users", crud.AdminGetUsers)       // lihat semua user
		protectedAdmin.GET("/users/:id", crud.AdminGetUser)    // search user by ID
		protectedAdmin.PATCH("/places/:id", crud.UpdatePlace)  // update tempat
		protectedAdmin.DELETE("/places/:id", crud.DeletePlace) // delete tempat
	}

	return router

}
