/*schema 

code: 10 character alphanumeric hash PK
expired: boolean true or false
email: user email that is tied to the code

How do we assure that we never get the same hashes ? 
--> check with database ? 

*/

CREATE TABLE regcode(
    code char(10) not null primary key, 
    expired boolean not null, 
    user_email varchar(200) not null,
    username VARCHAR(255),
    FOREIGN KEY (username) references user(username)
    )

/* 
In this scheme every code must be unique. A user can be invited multiple times using the same email address. After registration 
is complete, we set the code as expired and then update the username field to the new user's username, which is unique. 
*?