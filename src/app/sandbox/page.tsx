import { mockFiles, mockFolders } from "@/lib/mock-data";
import { db } from "@/server/db";
import { files, folders } from "@/server/db/schema";

export default function SandboxPage() {
    return (
        <div>
            <h1>Seed function</h1>
            <form
                action={async () => {
                    "use server";
                    console.log("Seeding database...");

                    await db.insert(files).values(
                        mockFiles.map((file, index) => ({
                            id: index + 1,
                            name: file.name,
                            url: file.url,
                            size: file.size,
                            modified: null,
                            created: new Date(),
                            parent:
                                file.parent === "root"
                                    ? 0
                                    : +(file.parent ?? 0),
                        }))
                    ).execute();
                    
                    await db.insert(folders).values(
                        mockFolders.map((folder, index) => ({
                            id: index + 1,
                            name: folder.name,
                            created: new Date(),
                            modified: null,
                            parent:
                                folder.parent === "root"
                                    ? 0
                                    : +(folder.parent ?? 0),
                        }))
                    ).execute();
                }}
            >
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
