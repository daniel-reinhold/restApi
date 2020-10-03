INSERT INTO notes (user_id, title, description, due_date) VALUES
(
 ${userId},
 ${title},
 ${description},
 ${dueDate}
)

RETURNING *