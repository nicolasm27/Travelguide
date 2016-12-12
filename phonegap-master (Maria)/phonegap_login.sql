CREATE TABLE phonegap_login (
    reg_id int(1) NOT NULL AUTO_INCREMENT,
    reg_date varchar(20) NOT NULL,
    fullname varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY (reg_id)
) ENGINE=InnoDB;