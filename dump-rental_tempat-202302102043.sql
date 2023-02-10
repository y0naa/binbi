-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: rental_tempat
-- ------------------------------------------------------
-- Server version	5.5.5-10.9.2-MariaDB-1:10.9.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detail_reservasi`
--

DROP TABLE IF EXISTS `detail_reservasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_reservasi` (
  `id_reservasi` varchar(100) NOT NULL,
  `id_tempat` varchar(100) NOT NULL,
  `id_pemilik` varchar(100) DEFAULT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `id_penyewa` varchar(100) NOT NULL,
  PRIMARY KEY (`id_reservasi`),
  KEY `detail_reservasi_FK` (`id_tempat`),
  KEY `detail_reservasi_FK_1` (`id_pemilik`),
  KEY `detail_reservasi_FK_2` (`id_penyewa`),
  CONSTRAINT `detail_reservasi_FK` FOREIGN KEY (`id_tempat`) REFERENCES `tempat` (`id_tempat`),
  CONSTRAINT `detail_reservasi_FK_1` FOREIGN KEY (`id_pemilik`) REFERENCES `pengguna` (`id_user`),
  CONSTRAINT `detail_reservasi_FK_2` FOREIGN KEY (`id_penyewa`) REFERENCES `pengguna` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_reservasi`
--

LOCK TABLES `detail_reservasi` WRITE;
/*!40000 ALTER TABLE `detail_reservasi` DISABLE KEYS */;
INSERT INTO `detail_reservasi` VALUES ('R105659','TT9833','3768','2023-02-01','2023-02-10','10'),('R37681034','TT3718','10','2023-02-02','2023-02-11','3768'),('R37681385','TT3718','10','2023-02-09','2023-02-17','3768'),('R37682861','TT5131','10','2023-02-01','2023-02-09','3768'),('R37683079','TT3718','10','2023-02-02','2023-02-18','3768');
/*!40000 ALTER TABLE `detail_reservasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengguna`
--

DROP TABLE IF EXISTS `pengguna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengguna` (
  `id_user` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nama_depan` varchar(100) NOT NULL,
  `nama_belakang` varchar(100) NOT NULL,
  `no_telp` varchar(100) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `pengguna_UN` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengguna`
--

LOCK TABLES `pengguna` WRITE;
/*!40000 ALTER TABLE `pengguna` DISABLE KEYS */;
INSERT INTO `pengguna` VALUES ('01','jowna','admin123','Jowna','Alynsah','081232321'),('10','barakobama','barakobama','barak','obama','08987657281'),('3768','donal','donal','donal','trump','08765478219'),('5679','kucingmabok','meong','kucing','mabok','089782312903');
/*!40000 ALTER TABLE `pengguna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tempat`
--

DROP TABLE IF EXISTS `tempat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempat` (
  `id_tempat` varchar(100) NOT NULL,
  `id_pemilik` varchar(100) NOT NULL,
  `nama_tempat` varchar(100) NOT NULL,
  `lokasi_tempat` varchar(100) NOT NULL,
  `harga_permalam` varchar(100) NOT NULL,
  `jumlah_kamar` varchar(100) NOT NULL,
  `jumlah_kamar_mandi` varchar(100) NOT NULL,
  `air_panas` tinyint(1) NOT NULL,
  `fasilitas_lain` varchar(250) NOT NULL,
  `url_gambar` varchar(255) NOT NULL DEFAULT 'https://res.cloudinary.com/binbi/image/upload/v1674476489/tsqeulkkz0a9oyu90epe.png',
  PRIMARY KEY (`id_tempat`),
  KEY `tempat_FK` (`id_pemilik`),
  CONSTRAINT `tempat_FK` FOREIGN KEY (`id_pemilik`) REFERENCES `pengguna` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempat`
--

LOCK TABLES `tempat` WRITE;
/*!40000 ALTER TABLE `tempat` DISABLE KEYS */;
INSERT INTO `tempat` VALUES ('TT3718','10','White House','1600 Pennsylvania Avenue NW Washington, Pennsylvania, Washington, D.C., 20500','10000000','10','10',1,'Security, Swimming Pools, Helpers','https://res.cloudinary.com/binbi/image/upload/v1675841569/rnsge2cdsmcupoxbmp1s.jpg'),('TT5131','10','Former Presidents House','5046 S. Greenwood Ave., Chicago IL 60615, Chicago, Illinois, 60615','5000000','5','5',1,'Garage, Parks','https://res.cloudinary.com/binbi/image/upload/v1675842165/qg9uyp5zofuqnkednzmw.jpg'),('TT8786','3768','Himalayas','India, Nepal, China, Bhutan, Khardung, Rohtang LA , 12312','4999999','2','2',0,'Mountains','https://res.cloudinary.com/binbi/image/upload/v1674477298/orm32ri3gydpfnwohatz.jpg'),('TT9052','5679','Villa Bogor','Jl. Warga Mulya I No.17, Pasirmulya, Kec. Bogor Bar., Bogor, Jawa Barat, 16117','2500000','5','5',0,'Kolam Renang','https://res.cloudinary.com/binbi/image/upload/v1675845038/g0isag1kjct6wmpkz5bo.png'),('TT9833','3768','Gumaya','Gumaya Tower Hotel, Jl. Gajahmada No.59-61, Jawa Tengah, Semarang, 15572','800000','4','3',0,'Kolam Renang','https://res.cloudinary.com/binbi/image/upload/v1674476489/tsqeulkkz0a9oyu90epe.png');
/*!40000 ALTER TABLE `tempat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi`
--

DROP TABLE IF EXISTS `transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksi` (
  `id_transaksi` varchar(100) NOT NULL,
  `id_reservasi` varchar(100) NOT NULL,
  `total` double NOT NULL,
  `metode_bayar` enum('Transfer','OVO','ShopeePay') NOT NULL,
  PRIMARY KEY (`id_transaksi`),
  KEY `transaksi_FK` (`id_reservasi`),
  CONSTRAINT `transaksi_FK` FOREIGN KEY (`id_reservasi`) REFERENCES `detail_reservasi` (`id_reservasi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi`
--

LOCK TABLES `transaksi` WRITE;
/*!40000 ALTER TABLE `transaksi` DISABLE KEYS */;
INSERT INTO `transaksi` VALUES ('TR10758','R105659',7200000,'Transfer'),('TR37683987','R37681385',80000000,'ShopeePay'),('TR37685048','R37681034',90000000,'Transfer'),('TR37686818','R37683079',160000000,'OVO'),('TR37688874','R37682861',40000000,'Transfer');
/*!40000 ALTER TABLE `transaksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'rental_tempat'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-10 20:43:26
