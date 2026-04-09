CREATE TABLE IF NOT EXISTS Category (
    category_number INTEGER NOT NULL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Customer_Card (
    card_number VARCHAR(13) NOT NULL PRIMARY KEY,
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
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Employee (
    id_employee VARCHAR(10) NOT NULL PRIMARY KEY,
    empl_surname VARCHAR(50) NOT NULL,
    empl_name VARCHAR(50) NOT NULL,
    empl_patronymic VARCHAR(50),
    role_name VARCHAR(50) NOT NULL,
    salary DECIMAL(13, 4) NOT NULL,
    date_of_birth DATE NOT NULL,
    date_of_start DATE NOT NULL,
    phone_number VARCHAR(13) NOT NULL,
    city VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL,
    zip_code VARCHAR(9) NOT NULL,
    FOREIGN KEY (role_name) REFERENCES Role (role_name) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS Product (
    id_product INTEGER NOT NULL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    characteristics VARCHAR(100) NOT NULL,
    category_number INT NOT NULL,
    FOREIGN KEY (category_number) REFERENCES Category (category_number) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Store_Product(
    UPC VARCHAR(12) NOT NULL PRIMARY KEY,
    selling_price DECIMAL(13, 4) NOT NULL,
    products_number INT NOT NULL,
    promotional_product BIT NOT NULL,
    id_product INT NOT NULL, 
    FOREIGN KEY(id_product) REFERENCES Product(id_product) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS Receipt (
    check_number VARCHAR(10) NOT NULL PRIMARY KEY,
    print_date DATETIME NOT NULL,
    sum_total DECIMAL(13, 4) NOT NULL,
    vat DECIMAL(13, 4) NOT NULL,
    id_employee VARCHAR(10) NOT NULL,
    card_number VARCHAR(13),
    FOREIGN KEY (id_employee) REFERENCES Employee (id_employee) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (card_number) REFERENCES Customer_Card (card_number) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS Sale(
    UPC VARCHAR(12) NOT NULL,
    check_number VARCHAR(10) NOT NULL,
    product_number INT NOT NULL,
    selling_price DECIMAL(13, 4) NOT NULL,
    PRIMARY KEY (UPC, check_number),
    FOREIGN KEY (UPC) REFERENCES Store_Product (UPC) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (check_number) REFERENCES Receipt (check_number) ON UPDATE CASCADE ON DELETE CASCADE
);