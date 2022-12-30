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
INSERT INTO `detail_reservasi` VALUES ('R0103','T01','02','2022-12-02','2022-12-26','01'),('R0105','T01','02','2022-12-02','2022-12-26','03'),('R0301','T01','02','2022-12-02','2022-12-26','03'),('R0302','T01','02','2022-12-02','2022-12-26','03'),('R0378','T05','3768','2022-12-02','2022-12-09','03'),('R376815','T05','3768','2022-12-02','2022-12-08','3768'),('R376823','T01','02','2022-12-02','2022-12-09','3768'),('R37683','T05','3768','2022-12-02','2022-12-09','3768'),('R376842','T03','01','2022-12-02','2022-12-09','3768'),('R376850','T01','02','2022-12-02','2022-12-16','3768'),('R376855','T01','02','2022-12-08','2022-12-16','3768'),('R376857','T05','3768','2022-12-09','2022-12-16','3768'),('R376862','T01','02','2022-12-02','2022-12-08','3768'),('R376873','T03','01','2022-12-02','2022-12-09','3768'),('R376876','T01','02','2022-12-02','2022-12-09','3768'),('R376879','T01','02','2022-12-02','2022-12-03','3768'),('R376888','T11','3768','2022-12-01','2022-12-09','3768'),('R3768892','T890','3768','2022-12-02','2022-12-26','03'),('R376899','T01','02','2022-12-02','2022-12-09','3768');
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
INSERT INTO `pengguna` VALUES ('01','jowna','admin123','Jowna','Alynsah','081232321'),('02','yefta','yefta123','Johanes','Yefta','081231232'),('03','halo','tes123','halo','halob','08123123123'),('04','halo2','tes123','halo3','halo2','08123123123'),('05','tes','tes123','tes1','tes2','0129301293'),('06','halo223','tes12332','halo33','halo32','081231231233'),('10','barakobama','barakobama','barak','obama','12312312'),('2798','ujjj','weqe','qweqwe','qweqwe','312'),('3768','donal','donal','donal','trump','1231231');
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
INSERT INTO `tempat` VALUES ('T01','02','Villa23','Puncak244','5000000','4','9',1,'kolam'),('T03','02','Villae2','Puncak2','50000','6','5',1,'kolam'),('T05','3768','Tes','Tes','190000','5','5',1,'Kolam ikan'),('T11','3768','asd','asdasd','229','3123','123',1,'fsdfs'),('T890','3768','sunlake','sunter','450000','1','1',1,'kolam');
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
INSERT INTO `transaksi` VALUES ('TR01','R0301',232312312,'OVO'),('TR02','R0302',123123123,'ShopeePay'),('TR0354','R0378',1330000,'Transfer'),('TR04','R0103',232312322,'OVO'),('TR376817','R376873',350000,'Transfer'),('TR37682','R376876',35000000,'OVO'),('TR376843','R37683',1330000,'ShopeePay'),('TR376878','R376888',1832,'Transfer'),('TR376889','R376815',1140000,'Transfer'),('TR376899','R376857',1330000,'OVO'),('TR519','R0378',500000000,'OVO');
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

-- Dump completed on 2022-12-03 15:41:29
