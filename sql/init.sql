

CREATE TABLE orders (
    order_id integer primary key generated always as identity,
    summ decimal(12,2),
    currency decimal(12,2),
    course decimal(12,2),
    email varchar(255)
);