-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 25, 2024 at 02:07 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `career`
--

-- --------------------------------------------------------

--
-- Table structure for table `admissions`
--

DROP TABLE IF EXISTS `admissions`;
CREATE TABLE IF NOT EXISTS `admissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `institution_id` int DEFAULT NULL,
  `faculty_id` int DEFAULT NULL,
  `status` enum('admitted','pending') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `course_id` (`course_id`),
  KEY `institution_id` (`institution_id`),
  KEY `faculty_id` (`faculty_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `student_id` varchar(50) NOT NULL,
  `university` varchar(255) DEFAULT NULL,
  `course_id` int NOT NULL,
  `faculty` varchar(255) DEFAULT NULL,
  `major_subject` varchar(255) DEFAULT NULL,
  `subject1` varchar(255) DEFAULT NULL,
  `grade1` varchar(10) DEFAULT NULL,
  `subject2` varchar(255) DEFAULT NULL,
  `grade2` varchar(10) DEFAULT NULL,
  `subject3` varchar(255) DEFAULT NULL,
  `grade3` varchar(10) DEFAULT NULL,
  `subject4` varchar(255) DEFAULT NULL,
  `grade4` varchar(10) DEFAULT NULL,
  `subject5` varchar(255) DEFAULT NULL,
  `grade5` varchar(10) DEFAULT NULL,
  `subject6` varchar(255) DEFAULT NULL,
  `grade6` varchar(10) DEFAULT NULL,
  `subject7` varchar(255) DEFAULT NULL,
  `grade7` varchar(10) DEFAULT NULL,
  `subject8` varchar(255) DEFAULT NULL,
  `grade8` varchar(10) DEFAULT NULL,
  `application_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `faculty_id` int DEFAULT NULL,
  `institution_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `faculty_id` (`faculty_id`),
  KEY `institution_id` (`institution_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `faculty_id`, `institution_id`, `created_at`, `updated_at`) VALUES
(1, 'Bachelor of Arts in Graphic Design', 1, 5, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(2, 'Bachelor of Science in Information Technology', 1, 5, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(3, 'Bachelor of Business Administration', 1, 5, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(4, 'Bachelor of Science in Information Technology', 2, 1, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(5, 'Bachelor of Commerce in Accounting', 2, 1, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(6, 'Bachelor of Education in Primary Education', 2, 1, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(7, 'Bachelor of Science in Agriculture', 3, 4, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(8, 'Bachelor of Arts in Sociology', 3, 4, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(9, 'Bachelor of Science in Computer Systems Engineering', 3, 4, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(10, 'Bachelor of Laws', 3, 4, '2024-10-25 13:14:28', '2024-10-25 13:14:28'),
(11, 'Intro to Information Systems', 3, 3, '2024-10-25 13:52:09', '2024-10-25 13:52:09');

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

DROP TABLE IF EXISTS `faculties`;
CREATE TABLE IF NOT EXISTS `faculties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `institution_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institution_id` (`institution_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `faculties`
--

INSERT INTO `faculties` (`id`, `name`, `institution_id`, `created_at`, `updated_at`) VALUES
(1, 'FICT', 0, '2024-10-22 12:49:12', '2024-10-22 12:49:12'),
(2, 'FDI', 0, '2024-10-23 16:25:02', '2024-10-23 16:25:02'),
(3, 'FFDI', 1, '2024-10-25 13:42:10', '2024-10-25 13:42:10');

-- --------------------------------------------------------

--
-- Table structure for table `institutions`
--

DROP TABLE IF EXISTS `institutions`;
CREATE TABLE IF NOT EXISTS `institutions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `number_of_students` int NOT NULL,
  `number_of_departments` int NOT NULL,
  `number_of_courses` int NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `institutions`
--

INSERT INTO `institutions` (`id`, `name`, `number_of_students`, `number_of_departments`, `number_of_courses`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'Botho University Lesotho', 5000, 7, 28, 'uploads\\1729599000226_1729334865955_Botho-Uni.jpg', '2024-10-22 12:10:00', '2024-10-22 12:10:00'),
(4, 'National University of Lesotho', 8000, 23, 43, 'uploads\\1729700676423_1729334628811_nulis.png', '2024-10-23 16:24:36', '2024-10-23 16:24:36'),
(5, 'Limkokwing University of Creative Technology Lesotho', 4500, 6, 18, 'uploads\\1729862271049_1729346095135_user.png', '2024-10-25 13:17:51', '2024-10-25 13:17:51');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('admin','institute','student') NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `user_type`, `profile_picture`, `created_at`, `updated_at`) VALUES
(1, 'Botho University', 'botho@info.org.ls', '$2b$10$bLU8aS3QKDpCjZyDZLQHlOvAec/tq3myKs8llYVmpSFtakw9Z7rae', 'institute', 'uploads\\1729334865955_Botho-Uni.jpg', '2024-10-19 12:47:46', '2024-10-19 12:47:46'),
(2, 'admin', 'admin@gmail.com', '$2b$10$6IuSUfMGMOhBbVWlNq61x.NXvDPnQ32/GvCXLayXkeg6oY2zY4/Ia', 'admin', 'uploads\\1729335007470_user.png', '2024-10-19 12:50:07', '2024-10-19 12:50:07'),
(3, 'Thabo Lebese', 'thabolebese@gmail.com', '$2b$10$RgkJpfZ3HNG1iqOX6jbBueu1MyOZz650SRxMIqjgasEFtS/KGalBC', 'student', 'uploads\\1729346095135_user.png', '2024-10-19 15:54:55', '2024-10-19 15:54:55'),
(4, 'Ntaote Junior', 'jntaote@gmail.com', '$2b$10$9yCGmu9Tv8n1PTbWly5BfOC8.noyQsE5Kowx02k1qqhQMqwYKylg2', 'student', 'uploads\\1729862366238_1729346095135_user.png', '2024-10-25 15:19:26', '2024-10-25 15:19:26');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
