import {int, text, singlestoreTable } from "drizzle-orm/singlestore-core"

export const users = singlestoreTable('users', {
    id: int().primaryKey().autoincrement(),
    name: text("name"),
    age: int("age"),
    email: text(),
    password: text(),
    created_at: text(),
    updated_at: text(),
    deleted_at: text(),
    // Add more columns here
})