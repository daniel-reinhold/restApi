INSERT INTO users (username, email, password, admin) values
(
 ${username},
 ${email},
 ${password},
 ${admin}
)
RETURNING *