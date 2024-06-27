
SHOW DATABASES;

CREATE DATABASE bookstore_sys;
USE bookstore_sys;

CREATE TABLE IF NOT EXISTS Book(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    publisher_id INT NOT NULL,
    stock_id INT NOT NULL,
   FOREIGN KEY(author_id) REFERENCES Author(id),
   FOREIGN KEY(publisher_id) REFERENCES Publisher(id),
   FOREIGN KEY(stock_id) REFERENCES Stock(id)
);

CREATE TABLE IF NOT EXISTS Author (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Publisher (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS Stock (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity INT NOT NULL,
    price DECIMAL(7,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS Sale (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity_sold INT NOT NULL,
    total_profit INT NOT NULL,
    id_book INT NOT NULL,
    FOREIGN KEY(id_book) REFERENCES Book(id)
);
ALTER TABLE Sale MODIFY COLUMN total_profit DECIMAL(10,2) NOT NULL;

CREATE TABLE IF NOT EXISTS Register (
   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(250) NOT NULL
);

ALTER TABLE Register MODIFY COLUMN username VARCHAR(250) NOT NULL UNIQUE;


INSERT INTO Author (name) VALUES ("Viswa Sharma"),("Manoj Dash");
INSERT INTO Publisher (name) VALUES ("Sahitya Prakashan"),("Konark Publication");
INSERT INTO Stock (quantity,price) VALUES (10,100),(20,200);
INSERT INTO Book (title,author_id,publisher_id,stock_id) VALUES ("Pancha Tantra",1,1,1) , ("Kanaka Upatyaka Ra Kahani",2,2,2);
INSERT INTO Register (username,password) VALUES ("admin","1234"),("user","1234");
INSERT INTO Sale (quantity_sold,total_profit,id_book) VALUES (3,300,1),(5,1000,2);

CREATE VIEW ConsultBook AS  SELECT 
Book.id,
Book.title AS Title,
Author.name AS Author,
Publisher.name AS Publisher,
Stock.quantity AS Stock,
Stock.price AS Price
 FROM Book
 INNER JOIN Author ON Book.author_id = Author.id
 INNER JOIN Publisher ON Book.publisher_id = Publisher.id
 INNER JOIN Stock ON Book.stock_id = Stock.id;