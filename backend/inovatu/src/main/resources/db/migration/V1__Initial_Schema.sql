CREATE TABLE `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `post_type` ENUM('NOTICIA', 'EVENTO') NOT NULL,
  `local` VARCHAR(255),
  `admin_id` INT NOT NULL,
  `published_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE CASCADE
);

CREATE TABLE `partners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `logo_url` TEXT,
  `website_url` VARCHAR(255),
  `is_active` BOOLEAN DEFAULT FALSE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(255) NOT NULL UNIQUE,
  `setting_value` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `proposals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `whatsapp` VARCHAR(20) NOT NULL,
  `description` TEXT NOT NULL,
  `proposer_type` ENUM('STARTUP', 'EMPRESA', 'INVESTIDOR', 'CONTRIBUINTE') NOT NULL,
  `status` ENUM('NOVO', 'LIDO', 'CONTATADO') NOT NULL DEFAULT 'NOVO',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `url` TEXT NOT NULL,
  `alt_text` VARCHAR(255),
  `imageable_id` INT NOT NULL,
  `imageable_type` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `contact_submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  -- ATENÇÃO AQUI: MAIÚSCULAS
  `status` ENUM('NOVO', 'LIDO') NOT NULL DEFAULT 'NOVO',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `rooms` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `capacity` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `room_id` INT NOT NULL,
  `start_time` TIMESTAMP NOT NULL,
  `end_time` TIMESTAMP NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  `user_institution` VARCHAR(255),
  `purpose` TEXT COMMENT 'Objetivo do agendamento',
  `status` ENUM('PENDENTE', 'APROVADO', 'REJEITADO') NOT NULL DEFAULT 'PENDENTE',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`)
);

CREATE TABLE `gallery_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `instagram_id` VARCHAR(255) NOT NULL UNIQUE, 
  `media_url` TEXT NOT NULL, 
  `permalink` VARCHAR(255) NOT NULL, 
  `caption` TEXT, 
  `media_type` VARCHAR(50), 
  `status` ENUM('PENDENTE', 'APROVADO', 'REJEITADO') NOT NULL DEFAULT 'PENDENTE',
  `posted_at` TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `operating_hours` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `day_of_week` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL UNIQUE,
  `is_closed` BOOLEAN DEFAULT FALSE,
  `morning_start` TIME,
  `morning_end` TIME,
  `afternoon_start` TIME,
  `afternoon_end` TIME,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `blocked_slots` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `start_date_time` TIMESTAMP NOT NULL,
  `end_date_time` TIMESTAMP NOT NULL,
  `reason` VARCHAR(255),
  `is_all_day` BOOLEAN DEFAULT FALSE,
  `room_id` INT, 
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) -- ADICIONE ESTA LINHA
);

INSERT INTO `operating_hours` (`day_of_week`, `is_closed`, `morning_start`, `morning_end`, `afternoon_start`, `afternoon_end`) VALUES 
('MONDAY',    FALSE, '08:00:00', '13:00:00', '13:00:00', '18:00:00'),
('TUESDAY',   FALSE, '08:00:00', '13:00:00', '13:00:00', '18:00:00'),
('WEDNESDAY', FALSE, '08:00:00', '13:00:00', '13:00:00', '18:00:00'),
('THURSDAY',  FALSE, '08:00:00', '13:00:00', '13:00:00', '18:00:00'),
('FRIDAY',    FALSE, '08:00:00', '13:00:00', '13:00:00', '18:00:00'),
('SATURDAY',  TRUE,  NULL, NULL, NULL, NULL),
('SUNDAY',    TRUE,  NULL, NULL, NULL, NULL);
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('homepage_logo_url', 'url_logo.png'),
('homepage_description', 'Descrição inicial.');

CREATE INDEX `idx_imageable` ON `images` (`imageable_id`, `imageable_type`);