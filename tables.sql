
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Час створення: Лис 02 2016 р., 10:53
-- Версія сервера: 10.0.20-MariaDB
-- Версія PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- БД: `u611117270_igor`
--

-- --------------------------------------------------------

--
-- Структура таблиці `leads`
--

CREATE TABLE IF NOT EXISTS `leads` (
  `name` text NOT NULL,
  `phone` text NOT NULL,
  `mail` text NOT NULL,
  `date_visited` date NOT NULL,
  `time_visited` time NOT NULL,
  `page_url` text NOT NULL,
  `utm_source` text NOT NULL,
  `utm_campaign` text NOT NULL,
  `utm_medium` text NOT NULL,
  `utm_term` text NOT NULL,
  `utm_content` text NOT NULL,
  `ref` text NOT NULL,
  `lead_name` text NOT NULL,
  `lead_price` text NOT NULL,
  `ip_address` text NOT NULL,
  `city` text NOT NULL,
  `client_id` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблиці `visits`
--

CREATE TABLE IF NOT EXISTS `visits` (
  `date_visited` date NOT NULL,
  `time_visited` time NOT NULL,
  `page_url` text NOT NULL,
  `utm_source` text NOT NULL,
  `utm_campaign` text NOT NULL,
  `utm_medium` text NOT NULL,
  `utm_term` text NOT NULL,
  `utm_content` text NOT NULL,
  `ref` text NOT NULL,
  `ip_address` text NOT NULL,
  `city` text NOT NULL,
  `client_id` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;