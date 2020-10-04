CREATE TABLE IF NOT EXISTS notes
(
    id serial PRIMARY KEY NOT NULL,
    user_id integer NOT NULL,
    title varchar(255) NOT NULL,
    description text,
    due_date timestamp with time zone,
    done boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp,
    updated_at timestamp with time zone NOT NULL DEFAULT current_timestamp
)