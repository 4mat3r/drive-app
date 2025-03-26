import 'server-only';
import { db } from "@/server/db";
import {
    files_table as filesSchema,
    folders_table as foldersSchema,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
    getAllParentsForFolder: async function getAllParentsForFolder(folderId: number) {
        const parents = [];
        let currentFolderId: number | null = folderId;

        while (currentFolderId !== 0) {
            console.log("currentFolderId", currentFolderId);
            const folder = await db
                .select()
                .from(foldersSchema)
                .where(eq(foldersSchema.id, currentFolderId))
                .limit(1)

            if (folder.length === 0) {
                throw new Error("Folder not found");
            }

            parents.unshift(folder[0]);
            currentFolderId = folder[0].parent;
        }
        return parents;
    },

    getFiles: function getFiles(folderId: number) {
        const parsedFolderId = parseInt(folderId as unknown as string, 10);
        if (isNaN(parsedFolderId)) {
            throw new Error("Invalid folder ID");
        }
        return db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, parsedFolderId));

    },

    getFolders: function getFolders(folderId: number) {
        const parsedFolderId = parseInt(folderId as unknown as string, 10);
        if (isNaN(parsedFolderId)) {
            throw new Error("Invalid folder ID");
        }
        return db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, parsedFolderId));
    }

}