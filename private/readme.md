# The Back-End

> This folder will contain all the backend infrastructure for the project.

## Routes

`POST "/api/user/create"`

Create a user in our database. POST request must have the following data items in its body.

1. username

2. password

3. email

4. first name

5. last name

6. date of birth with format "mm/dd/yyyy"

7. gender "M/F"

8. opt_in preference "Y/N"

Successful registrations will return a 200 status code.

---

`POST "api/user/login"`

Login a user. POST request must have the username and password in its body.

Successful login will return a 200 status code. Failed login attempts will return a 500 status code along with the reason why the login failed.