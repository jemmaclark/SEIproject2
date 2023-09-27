CREATE DATABASE goodfoodhunting;

-- remember to connect to the database before creating tables
-- \c goodfoodhunting

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    user_id INTEGER NOT NULL
);

ALTER TABLE dishes ADD user_id INTEGER NOT NULL;

--check that the tabes have been created
-- \dt

INSERT INTO dishes (title, image_url, user_id)
VALUES ('cake', 'https://dulwichbakery.com.au/wp-content/uploads/2021/09/dulwich-chocolate-cake-w-hearts.jpg', '1');

INSERT INTO dishes (title, image_url, user_id)
VALUES ('pasta', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxxhAv-HTf1AUxd9C7gK4PATRYLkl2dNGh-w&usqp=CAU', '1');


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

-- seeding one dummy user


