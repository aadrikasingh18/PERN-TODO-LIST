CREATE DATABASE todo;

CREATE TABLE todoDetails(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR (1000)
);