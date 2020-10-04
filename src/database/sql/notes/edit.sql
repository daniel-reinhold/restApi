UPDATE notes SET
title=${title},
description=${description},
due_date=${dueDate} WHERE id = ${id}
RETURNING *