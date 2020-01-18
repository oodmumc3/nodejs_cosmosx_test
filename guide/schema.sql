-- 자유 게시판
CREATE TABLE `tl_free_board` (
  `id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `contents` TEXT NOT NULL,
  `username` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

