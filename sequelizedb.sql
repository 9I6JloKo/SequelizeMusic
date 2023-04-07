-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 07 2023 г., 22:21
-- Версия сервера: 10.4.22-MariaDB
-- Версия PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sequelizedb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `classicmusics`
--

CREATE TABLE `classicmusics` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `period_id` int(11) DEFAULT NULL,
  `publishedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `classicmusics`
--

INSERT INTO `classicmusics` (`id`, `title`, `period_id`, `publishedAt`) VALUES
(1, 'Mozart song', 1, '2019-05-17 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `compositors`
--

CREATE TABLE `compositors` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `descCompositor` varchar(1000) NOT NULL,
  `dateOfBirth` datetime DEFAULT NULL,
  `dateOfDeath` datetime DEFAULT NULL,
  `countryOfBirth` varchar(100) DEFAULT NULL,
  `photoCompositor` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `compositors`
--

INSERT INTO `compositors` (`id`, `firstName`, `lastName`, `descCompositor`, `dateOfBirth`, `dateOfDeath`, `countryOfBirth`, `photoCompositor`) VALUES
(1, 'Aleksander', 'Puwkin', 'Important info', '2019-05-17 00:00:00', '2020-05-17 00:00:00', 'Toila', '/src/jpg.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `genre_name` varchar(100) NOT NULL,
  `descGenre` varchar(1000) NOT NULL,
  `publishedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `genres`
--

INSERT INTO `genres` (`id`, `genre_name`, `descGenre`, `publishedAt`) VALUES
(1, 'classic', 'Important Info', '2019-05-17 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `instruments`
--

CREATE TABLE `instruments` (
  `id` int(11) NOT NULL,
  `instrumentName` varchar(100) NOT NULL,
  `pictureInstrument` varchar(1000) DEFAULT NULL,
  `typeOfInstrument` int(11) NOT NULL,
  `publishedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `instruments`
--

INSERT INTO `instruments` (`id`, `instrumentName`, `pictureInstrument`, `typeOfInstrument`, `publishedAt`) VALUES
(2, 'Piano', 'Piano', 1, '2019-05-17 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `instrumenttypes`
--

CREATE TABLE `instrumenttypes` (
  `id` int(11) NOT NULL,
  `typeName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `instrumenttypes`
--

INSERT INTO `instrumenttypes` (`id`, `typeName`) VALUES
(1, 'CupperBlow');

-- --------------------------------------------------------

--
-- Структура таблицы `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `music_id` int(11) NOT NULL,
  `link_string` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `links`
--

INSERT INTO `links` (`id`, `music_id`, `link_string`) VALUES
(2, 1, 'https://bb.com');

-- --------------------------------------------------------

--
-- Структура таблицы `musiccompositors`
--

CREATE TABLE `musiccompositors` (
  `id` int(11) NOT NULL,
  `compositorId` int(11) NOT NULL,
  `musicId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `musiccompositors`
--

INSERT INTO `musiccompositors` (`id`, `compositorId`, `musicId`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `musicgenres`
--

CREATE TABLE `musicgenres` (
  `id` int(11) NOT NULL,
  `genreId` int(11) NOT NULL,
  `musicId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `musicgenres`
--

INSERT INTO `musicgenres` (`id`, `genreId`, `musicId`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `musicinstruments`
--

CREATE TABLE `musicinstruments` (
  `id` int(11) NOT NULL,
  `instrumentId` int(11) NOT NULL,
  `musicId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `musicinstruments`
--

INSERT INTO `musicinstruments` (`id`, `instrumentId`, `musicId`) VALUES
(2, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `periods`
--

CREATE TABLE `periods` (
  `id` int(11) NOT NULL,
  `period_name` varchar(100) NOT NULL,
  `desc` varchar(1000) NOT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `periods`
--

INSERT INTO `periods` (`id`, `period_name`, `desc`, `startDate`, `endDate`) VALUES
(1, 'MidAges', 'MidAges', '2019-05-17 00:00:00', '2020-05-17 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'moderator', '2023-04-07 19:49:18', '2023-04-07 19:49:18'),
(2, 'user', '2023-04-07 19:49:18', '2023-04-07 19:49:18'),
(3, 'admin', '2023-04-07 19:49:18', '2023-04-07 19:49:18');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Max', 'max@gmail.com', '$2a$08$sJ3Q3CFSIBRFnegAh6FDResYOuykh.qO35RBxVFcfba7krAbS.md6', '2023-04-07 19:49:38', '2023-04-07 19:49:38');

-- --------------------------------------------------------

--
-- Структура таблицы `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2023-04-07 19:49:38', '2023-04-07 19:49:38', 1, 1),
('2023-04-07 19:49:38', '2023-04-07 19:49:38', 3, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `classicmusics`
--
ALTER TABLE `classicmusics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `period_id` (`period_id`);

--
-- Индексы таблицы `compositors`
--
ALTER TABLE `compositors`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typeOfInstrument` (`typeOfInstrument`);

--
-- Индексы таблицы `instrumenttypes`
--
ALTER TABLE `instrumenttypes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `music_id` (`music_id`);

--
-- Индексы таблицы `musiccompositors`
--
ALTER TABLE `musiccompositors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compositorId` (`compositorId`),
  ADD KEY `musicId` (`musicId`);

--
-- Индексы таблицы `musicgenres`
--
ALTER TABLE `musicgenres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genreId` (`genreId`),
  ADD KEY `musicId` (`musicId`);

--
-- Индексы таблицы `musicinstruments`
--
ALTER TABLE `musicinstruments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instrumentId` (`instrumentId`),
  ADD KEY `musicId` (`musicId`);

--
-- Индексы таблицы `periods`
--
ALTER TABLE `periods`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `classicmusics`
--
ALTER TABLE `classicmusics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `compositors`
--
ALTER TABLE `compositors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `instrumenttypes`
--
ALTER TABLE `instrumenttypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `musiccompositors`
--
ALTER TABLE `musiccompositors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `musicgenres`
--
ALTER TABLE `musicgenres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `musicinstruments`
--
ALTER TABLE `musicinstruments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `periods`
--
ALTER TABLE `periods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `classicmusics`
--
ALTER TABLE `classicmusics`
  ADD CONSTRAINT `classicmusics_ibfk_1` FOREIGN KEY (`period_id`) REFERENCES `periods` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `instruments`
--
ALTER TABLE `instruments`
  ADD CONSTRAINT `instruments_ibfk_1` FOREIGN KEY (`typeOfInstrument`) REFERENCES `instrumenttypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `instruments_ibfk_2` FOREIGN KEY (`typeOfInstrument`) REFERENCES `instrumenttypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `instruments_ibfk_3` FOREIGN KEY (`typeOfInstrument`) REFERENCES `instrumenttypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `instruments_ibfk_4` FOREIGN KEY (`typeOfInstrument`) REFERENCES `instrumenttypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `instruments_ibfk_5` FOREIGN KEY (`typeOfInstrument`) REFERENCES `instrumenttypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `classicmusics` (`id`),
  ADD CONSTRAINT `links_ibfk_2` FOREIGN KEY (`music_id`) REFERENCES `classicmusics` (`id`),
  ADD CONSTRAINT `links_ibfk_3` FOREIGN KEY (`music_id`) REFERENCES `classicmusics` (`id`),
  ADD CONSTRAINT `links_ibfk_4` FOREIGN KEY (`music_id`) REFERENCES `classicmusics` (`id`),
  ADD CONSTRAINT `links_ibfk_5` FOREIGN KEY (`music_id`) REFERENCES `classicmusics` (`id`);

--
-- Ограничения внешнего ключа таблицы `musiccompositors`
--
ALTER TABLE `musiccompositors`
  ADD CONSTRAINT `musiccompositors_ibfk_10` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musiccompositors_ibfk_2` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musiccompositors_ibfk_4` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musiccompositors_ibfk_6` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musiccompositors_ibfk_8` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musiccompositors_ibfk_9` FOREIGN KEY (`compositorId`) REFERENCES `compositors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `musicgenres`
--
ALTER TABLE `musicgenres`
  ADD CONSTRAINT `musicgenres_ibfk_10` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicgenres_ibfk_2` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicgenres_ibfk_4` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicgenres_ibfk_6` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicgenres_ibfk_8` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicgenres_ibfk_9` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `musicinstruments`
--
ALTER TABLE `musicinstruments`
  ADD CONSTRAINT `musicinstruments_ibfk_10` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicinstruments_ibfk_2` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicinstruments_ibfk_4` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicinstruments_ibfk_6` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicinstruments_ibfk_8` FOREIGN KEY (`musicId`) REFERENCES `classicmusics` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `musicinstruments_ibfk_9` FOREIGN KEY (`instrumentId`) REFERENCES `instruments` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
