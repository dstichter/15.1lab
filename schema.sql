CREATE TABLE users (
  id int AUTO_INCREMENT,
  email varchar(255),
  password varchar(255),
  PRIMARY KEY(id)
);
INSERT INTO users (email,password) VALUES ('ds@gmail.com','password');
