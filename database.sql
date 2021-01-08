-- CREATE DATABASE fit_ally;

CREATE TABLE users (
    id serial PRIMARY KEY, 
    name varchar(100) NOT NULL, 
    email text UNIQUE NOT NULL, 
    date timestamp NOT NULL
    );

CREATE TABLE login (
    id serial PRIMARY KEY, 
    hash varchar(100) NOT NULL, 
    user_id integer REFERENCES users(id)
);

CREATE TABLE profiles (
    id serial PRIMARY KEY,
    current_weight integer NOT NULL,
    height integer NOT NULL,
    bmi decimal NOT NULL,
    goal_weight integer,
    goal_calories integer,
    goal_days integer,
    calories_consumed_today integer,
    calories_remaining_today integer,
    user_id integer REFERENCES users(id)
);

CREATE TABLE activities (
    id serial PRIMARY KEY,
    date timestamp NOT NULL,
    duration integer NOT NULL,
    category varchar(100) NOT NULL,
    calories integer NOT NULL,
    user_id integer REFERENCES users(id)
);

CREATE TABLE weights (
    id serial PRIMARY KEY,
    weight integer NOT NULL,
    date timestamp NOT NULL,
    user_id integer REFERENCES users(id)
);