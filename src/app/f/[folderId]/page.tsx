import { stackServerApp } from "@/stack";
import DriveContents from "../../drive-contents";
import { QUERIES } from "@/server/db/queries";

export default async function GoogleDriveClone(props: {
    params: Promise<{ folderId: string }>;
}) {
    await stackServerApp.getUser({ or: "redirect" });

    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        throw new Error("Invalid folder ID");
    }

    const [files, folders, parents] = await Promise.all([
        QUERIES.getFiles(parsedFolderId),
        QUERIES.getFolders(parsedFolderId),
        QUERIES.getAllParentsForFolder(parsedFolderId),
    ]);

    return <DriveContents files={files} folders={folders} parents={parents} />;
}
