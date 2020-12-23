drop database if exists burgers_db;
create database burgers_db;

use database burgers_db;
create table burgers(
    id int primary key not null auto_increment,
    burger_name varchar(100) not null,
    devoured boolean default false;
)
