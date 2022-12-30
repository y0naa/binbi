package crud

// gorm.Model definition
type Pengguna struct {
	IdUser       string `json:"id_user" gorm:"primary_key"`
	Username     string `json:"username"`
	Password     string `json:"password"`
	NamaDepan    string `json:"nama_depan"`
	NamaBelakang string `json:"nama_belakang"`
	NoTelp       string `json:"no_telp" `
}

type Tempat struct {
	IdTempat         string  `json:"id_tempat" gorm:"primary_key"`
	IdPemilik        string  `json:"id_pemilik"`
	NamaTempat       string  `json:"nama_tempat"`
	LokasiTempat     string  `json:"lokasi_tempat"`
	HargaPermalam    float64 `json:"harga_permalam,string"`
	JumlahKamar      int32   `json:"jumlah_kamar,string"`
	JumlahKamarMandi int32   `json:"jumlah_kamar_mandi,string"`
	AirPanas         bool    `json:"air_panas,string"`
	FasilitasLain    string  `json:"fasilitas_lain"`
}

type DetailReservasi struct {
	IdReservasi    string `json:"id_reservasi" gorm:"primary_key"`
	IdTempat       string `json:"id_tempat"`
	IdPemilik      string `json:"id_pemilik"`
	TanggalMulai   string `json:"tanggal_mulai"`
	TanggalSelesai string `json:"tanggal_selesai"`
	IdPenyewa      string `json:"id_penyewa"`
}

type Transaksi struct {
	IdTransaksi string  `json:"id_transaksi" gorm:"primary_key"`
	IdReservasi string  `json:"id_reservasi"`
	Total       float64 `json:"total"`
	MetodeBayar string  `json:"metode_bayar"`
}
