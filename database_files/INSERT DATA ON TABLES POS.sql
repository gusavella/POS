
/*INSERT CATEGORIES*/
INSERT INTO `pos`.`category`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(1,'Cuaderno','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`category`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(2,'Esfero','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`category`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(3,'Geometria','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`category`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(4,'Carpeta','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`category`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(5,'Colores','2023-04-22 08:00:00',null,null);

/*INSERT MARK*/
INSERT INTO `pos`.`mark`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(1,'Norma','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`mark`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(2,'Faber castell','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`mark`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(3,'Scribe','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`mark`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(4,'Bic','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`mark`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(5,'Sharpie','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`mark`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(6,'Otro','2023-04-22 08:00:00',null,null);

/*INSERT STATES*/
INSERT INTO `pos`.`state`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(1,'Activo','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`state`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(2,'Inctivo','2023-04-22 08:00:00',null,null);

/*INSERT PROBE PRODUCTS*/
INSERT INTO `pos`.`product`(`id`,`code`,`short_description`,`description`,`cost`,`price`,`stock`,`image`,`id_category`,`id_mark`,`id_state`,`create_time`,`update_time`,`delete_time`)
VALUES(1,'7702111488496','Cuaderno','Cuaderno cosido',2000,3500,10,'/images/default.png',1,1,1,'2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`product`(`id`,`code`,`short_description`,`description`,`cost`,`price`,`stock`,`image`,`id_category`,`id_mark`,`id_state`,`create_time`,`update_time`,`delete_time`)
VALUES(2,'7702184331699','Colores x 12','Colores x 12',8000,10000,10,'/images/default.png',5,2,1,'2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`product`(`id`,`code`,`short_description`,`description`,`cost`,`price`,`stock`,`image`,`id_category`,`id_mark`,`id_state`,`create_time`,`update_time`,`delete_time`)
VALUES(3,'7707019328660','Esfero x unidad','Esfero por unidad',2000,3000,20,'/images/default.png',2,4,1,'2023-04-22 08:00:00',null,null);

/*INSERT ROLE*/
INSERT INTO `pos`.`role`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(1,'ADMIN','2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`role`(`id`,`name`,`create_time`,`update_time`,`delete_time`)
VALUES(2,'USER','2023-04-22 08:00:00',null,null);

/*INSERT USER*/
INSERT INTO `pos`.`user`(`id`,`username`,`password`,`id_role`,`create_time`,`update_time`,`delete_time`)
VALUES(1,'administrador','teca',1,'2023-04-22 08:00:00',null,null);
INSERT INTO `pos`.`user`(`id`,`username`,`password`,`id_role`,`create_time`,`update_time`,`delete_time`)
VALUES(2,'usuario','usuario',2,'2023-04-22 08:00:00',null,null);

