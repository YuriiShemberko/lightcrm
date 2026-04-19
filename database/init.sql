CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `login` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `status` ENUM('new', 'called', 'failed', 'callback') DEFAULT 'new',
  `callback_at` DATETIME NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `call_log` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `contact_id` INT NOT NULL,
  `called_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `duration_sec` INT DEFAULT 0,
  `result` ENUM('answered', 'no_answer', 'busy') NOT NULL,
  INDEX `idx_contact_id` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed data
-- Admin user
INSERT INTO `users` (`login`, `password`) 
VALUES ('admin', '$2y$10$i70PMQs.Dxpg8bTqw01NKOJsf6yy79Gl6VMOGr44J.CJ56XDlZw96');

-- Seed contacts
INSERT INTO `contacts` (`name`, `phone`, `status`, `callback_at`) VALUES 
('Олександр Коваленко', '+380671112233', 'new', NULL),
('Марія Петренко', '+380504445566', 'callback', DATE_ADD(NOW(), INTERVAL 1 MINUTE)),
('Дмитро Сидоренко', '+380937778899', 'called', NULL),
('Олена Бондаренко', '+380689990011', 'failed', NULL);

-- Seed call logs
-- Для Дмитра (id: 3)
INSERT INTO `call_log` (`contact_id`, `duration_sec`, `result`) VALUES 
(3, 45, 'answered'),
(3, 0, 'busy');

-- Для Олени (id: 4)
INSERT INTO `call_log` (`contact_id`, `duration_sec`, `result`) VALUES 
(4, 0, 'no_answer');
