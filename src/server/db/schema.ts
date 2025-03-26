import "server-only"

import {int, text, singlestoreTable, date, index, bigint } from "drizzle-orm/singlestore-core"

// export const users = singlestoreTable('users', {
//     id: int().primaryKey().autoincrement(),
//     name: text("name"),
//     age: int("age"),
//     email: text(),
//     password: text(),
//     created_at: text(),
//     updated_at: text(),
//     deleted_at: text(),
//     // Add more columns here
// })

export const files = singlestoreTable('files', {
    id: bigint("id",{mode: "number", unsigned: true}).primaryKey().autoincrement(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    size: int("size").notNull(),
    modified: date("modified"),
    created: date("created").notNull(),
    parent: bigint("parent", {mode: "number", unsigned: true}).notNull(),
},
(t) => {
    return [index("parent_index").on(t.parent)]
})

export const folders = singlestoreTable('folders', {
    id: bigint("id",{mode: "number", unsigned: true}).primaryKey().autoincrement(),
    name: text("name"),
    parent: bigint("parent", {mode: "number", unsigned: true}).notNull(),
    created: date("created").notNull(),
    modified: date("modified"),
},
(t) => {    
    return [index("parent_index").on(t.parent)]
})

