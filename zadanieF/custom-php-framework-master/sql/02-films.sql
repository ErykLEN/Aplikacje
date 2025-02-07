create table films
(
    id          integer not null
        constraint films_pk
            primary key autoincrement,
    title       text not null,
    description text,
    year        integer
);