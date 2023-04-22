-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema POS
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `POS` ;

-- -----------------------------------------------------
-- Schema POS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `POS` DEFAULT CHARACTER SET utf8 ;
USE `POS` ;

-- -----------------------------------------------------
-- Table `POS`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POS`.`category` ;

CREATE TABLE IF NOT EXISTS `POS`.`category` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `delete_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`));

CREATE UNIQUE INDEX `serial_UNIQUE` ON `POS`.`category` (`name` ASC) ;


-- -----------------------------------------------------
-- Table `POS`.`mark`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POS`.`mark` ;

CREATE TABLE IF NOT EXISTS `POS`.`mark` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `delete_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`));

CREATE UNIQUE INDEX `serial_UNIQUE` ON `POS`.`mark` (`name` ASC) ;


-- -----------------------------------------------------
-- Table `POS`.`state`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POS`.`state` ;

CREATE TABLE IF NOT EXISTS `POS`.`state` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `delete_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`));

CREATE UNIQUE INDEX `serial_UNIQUE` ON `POS`.`state` (`name` ASC) ;


-- -----------------------------------------------------
-- Table `POS`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POS`.`product` ;

CREATE TABLE IF NOT EXISTS `POS`.`product` (
  `id` INT NOT NULL,
  `code` VARCHAR(45) NOT NULL,
  `short_description` VARCHAR(45) NULL,
  `description` VARCHAR(500) NULL,
  `cost` INT NULL DEFAULT 0,
  `price` INT NOT NULL DEFAULT 0,
  `stock` INT NOT NULL DEFAULT 0,
  `image` VARCHAR(100) NOT NULL DEFAULT '/images/default.png',
  `id_category` INT NOT NULL,
  `id_mark` INT NOT NULL,
  `id_state` INT NOT NULL DEFAULT 1,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `delete_time` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`id_category`)
    REFERENCES `POS`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_mark`
    FOREIGN KEY (`id_mark`)
    REFERENCES `POS`.`mark` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_state`
    FOREIGN KEY (`id_state`)
    REFERENCES `POS`.`state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE UNIQUE INDEX `serial_UNIQUE` ON `POS`.`product` (`code` ASC) ;

CREATE INDEX `fk_product_category_idx` ON `POS`.`product` (`id_category` ASC) ;

CREATE INDEX `fk_product_mark_idx` ON `POS`.`product` (`id_mark` ASC) ;

CREATE INDEX `code` ON `POS`.`product` (`code` ASC) ;

CREATE INDEX `fk_product_state_idx` ON `POS`.`product` (`id_state` ASC) ;


-- -----------------------------------------------------
-- Table `POS`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POS`.`role` ;

CREATE TABLE IF NOT EXISTS `POS`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `delete_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`));

CREATE UNIQUE INDEX `id_UNIQUE` ON `POS`.`role` (`id` ASC) ;


-- -----------------------------------------------------
-- Table `POS`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POS`.`user` ;

CREATE TABLE IF NOT EXISTS `POS`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `id_role` INT NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `delete_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`id_role`)
    REFERENCES `POS`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE UNIQUE INDEX `id_UNIQUE` ON `POS`.`user` (`id` ASC) ;

CREATE INDEX `fk_user_role_idx` ON `POS`.`user` (`id_role` ASC) ;


-- -----------------------------------------------------
-- Table `POS`.`log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POS`.`log` ;

CREATE TABLE IF NOT EXISTS `POS`.`log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `log` VARCHAR(500) NULL DEFAULT 'registro vacio',
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

CREATE UNIQUE INDEX `id_UNIQUE` ON `POS`.`log` (`id` ASC) ;


-- -----------------------------------------------------
-- Table `POS`.`Error`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POS`.`Error` ;

CREATE TABLE IF NOT EXISTS `POS`.`Error` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT 'registro vacio',
  `description` VARCHAR(500) NULL DEFAULT 'sin descripcion',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

CREATE UNIQUE INDEX `id_UNIQUE` ON `POS`.`Error` (`id` ASC) ;

CREATE UNIQUE INDEX `name_UNIQUE` ON `POS`.`Error` (`name` ASC) ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
