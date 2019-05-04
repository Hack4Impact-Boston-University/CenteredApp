CREATE TABLE friends(
    requested varchar(255) not null, 
    requestee varchar(255) not null, 
    established date,
    status char(1) not null,
    FOREIGN KEY (requested) references user(username),
    FOREIGN KEY (requestee) references user(username),
    PRIMARY KEY (requested,requestee)
    )

/*
Statuses:
0 - Pending
1 - Declined
2 - Approved


When user1 requests to be friends with user2, 
create a tuple in the table where user2 is the requestee, user1 is the requested,
status is 0, and date is current date.

To get all friends of a user, do a union of select queries that
get all requestees where requested is user
get all requested where requestee is user

This way we save space and eliminate duplicate entries for mutual friendships.
*/