UPDATE users SET
username=${username},
email=${email},
password=${password},
admin=${admin} WHERE id=${userId}
RETURNING *