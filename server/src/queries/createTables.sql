CREATE TABLE IF NOT EXISTS Category (
    id_category INTEGER NOT NULL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Customer_Card (
    id_card VARCHAR(13) NOT NULL PRIMARY KEY,
    cust_surname VARCHAR(50) NOT NULL,
    cust_name VARCHAR(50) NOT NULL,
    cust_patronymic VARCHAR(50),
    phone_number VARCHAR(13) NOT NULL,
    city VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL,
    zip_code VARCHAR(9) NOT NULL,
    discount_percent INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Role (
    id_role INTEGER NOT NULL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Employee (
    id_employee VARCHAR(10) NOT NULL PRIMARY KEY,
    empl_surname VARCHAR(50) NOT NULL,
    empl_name VARCHAR(50) NOT NULL,
    empl_patronymic VARCHAR(50),
    id_role INTEGER NOT NULL,
    salary CURRENCY NOT NULL,
    date_of_birth DATE NOT NULL,
    date_of_start DATE NOT NULL,
    phone_number VARCHAR(13) NOT NULL,
    city VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL,
    zip_code VARCHAR(9) NOT NULL,
    FOREIGN KEY (id_role) REFERENCES Role (id_role) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS Product (
    id_product INTEGER NOT NULL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    characteristics VARCHAR(100) NOT NULL,
    id_category INTEGER NOT NULL,
    FOREIGN KEY (id_category) REFERENCES Category (id_category) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Store_Product(
    UPC VARCHAR(12) NOT NULL PRIMARY KEY,
    selling_price CURRENCY NOT NULL,
    products_number INTEGER NOT NULL,
    promotional_product BIT NOT NULL,
    id_product INTEGER NOT NULL, 
    FOREIGN KEY(id_product) REFERENCES Product(id_product) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS Receipt (
    id_check VARCHAR(10) NOT NULL PRIMARY KEY,
    print_date DATETIME NOT NULL,
    sum_total CURRENCY NOT NULL,
    vat CURRENCY NOT NULL,
    id_employee VARCHAR(10) NOT NULL,
    id_card VARCHAR(13),
    FOREIGN KEY (id_employee) REFERENCES Employee (id_employee) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (id_card) REFERENCES Customer_Card (id_card) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS Sale(
    UPC VARCHAR(12) NOT NULL,
    id_check VARCHAR(10) NOT NULL,
    product_number INTEGER NOT NULL,
    selling_price CURRENCY NOT NULL,
    PRIMARY KEY (UPC, id_check),
    FOREIGN KEY (UPC) REFERENCES Store_Product (UPC) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (id_check) REFERENCES Receipt (id_check) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Account (
    id_employee VARCHAR(10) NOT NULL PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_employee) REFERENCES Employee (id_employee) ON UPDATE CASCADE ON DELETE CASCADE
);