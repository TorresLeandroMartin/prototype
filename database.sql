DROP DATABASE prototype_database;
CREATE DATABASE prototype_database;

USE prototype_database; 

CREATE TABLE products (
  id_product INT AUTO_INCREMENT PRIMARY KEY,
  quantity INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP GENERATED ALWAYS AS (CURRENT_TIMESTAMP) NOT NULL
);

CREATE TABLE users (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP GENERATED ALWAYS AS (CURRENT_TIMESTAMP) NOT NULL
);

CREATE TABLE orders (
  id_order INT AUTO_INCREMENT PRIMARY KEY,
  id_product INT,
  id_user INT,
  email VARCHAR(255),
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP GENERATED ALWAYS AS (CURRENT_TIMESTAMP) NOT NULL,
  FOREIGN KEY (id_product) REFERENCES products(id_product),
  FOREIGN KEY (id_user) REFERENCES users(id_user),
  FOREIGN KEY (email) REFERENCES users(email)
);

CREATE TABLE orders_products (
	id_order INT PRIMARY KEY,
	id_product INT,
    FOREIGN KEY (id_product) REFERENCES products (id_product),
    FOREIGN KEY (id_order) REFERENCES orders (id_order)
);

-- Lo que esta comentado no lo use, ni esta creado.

-- CREATE TABLE products_users (
-- 	id_product INT PRIMARY KEY,
-- 	id_user INT,
--     FOREIGN KEY (id_product) REFERENCES products (id_product),
--     FOREIGN KEY (id_user) REFERENCES users (id_user)
-- );

-- CREATE TABLE orders_users (
-- 	id_order INT PRIMARY KEY,
-- 	id_user INT,
--     FOREIGN KEY (id_order) REFERENCES orders (id_order),
--     FOREIGN KEY (id_user) REFERENCES users (id_user)
-- );

describe products;
describe users;
describe orders;
describe orders_products;
-- describe orders_users;
-- describe products_users;