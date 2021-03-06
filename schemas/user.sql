/* SQL query to create the user relation */
CREATE TABLE user(
    username VARCHAR(255) not null primary key, 
    password BINARY(60) not null, 
    email VARCHAR(200) not null, 
    first_name VARCHAR(100) not null, 
    last_name VARCHAR(100) not null,
    dob CHAR(10) not null,
    gender CHAR(1),
    opt_in CHAR(1),
    bio VARCHAR(320)
)
/*
In this scheme the username must be unique. However, you can have one email address linked to multiple accounts in this schema 
*/

/* SQL query to create new record in the user relation */
INSERT INTO user 
(username, password, email, first_name, last_name, dob, gender, opt_in) 
VALUES("mdesilva", "$2b$10$3euPcmQFCiblsZeEu5s7p.9OVHgeHWFDk9nhMqZ0m/3pd/lhwZgES", 
"mdesilva@bu.edu", "Manuja", "DeSilva", "01/03/1998", "M", "N");

/* SQL query to delete record */
DELETE FROM user WHERE id=?
/* TODO: May need to make the email the primary key */