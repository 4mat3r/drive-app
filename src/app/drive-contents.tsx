"use client";
import { FileRow, FolderRow } from "./file-row";
import { files_table, folders_table } from "@/server/db/schema";
import Link from "next/link";
import { UserButton } from '@stackframe/stack';

export default function DriveContents(props: {
    files: typeof files_table.$inferSelect[];
    folders: typeof folders_table.$inferSelect[];
    parents: typeof folders_table.$inferSelect[];
}) {
    return (
        <div
            style={{
                padding: "24px",
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
             <UserButton
                showUserInfo={true}
                colorModeToggle={() => { console.log("color mode toggle clicked") }}
                extraItems={[{
                text: 'Custom Action',
                icon: <span>🔧</span>,
                onClick: () => console.log('Custom action clicked')
                }]}
            />
            <div
                style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "16px",
                }}
            >
                <h1
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "16px",
                        color: "#333",
                    }}
                >
                    Google Drive Clone
                </h1>
                <div
                    style={{
                        marginBottom: "16px",
                        fontSize: "14px",
                        color: "#555",
                    }}
                >
                    <Link
                        href="/f/1" 
                        style={{ cursor: "pointer", color: "#007bff" }}
                    >
                        Home
                    </Link>
                    {props.parents.map((folder, index) => (
                        <span key={folder.id}>
                            {" / "}
                            <Link
                                href={`/f/${folder.id}`}
                                style={{
                                    cursor: "pointer",
                                    color:
                                        index === props.parents.length - 1
                                            ? "#333"
                                            : "#007bff",
                                }}
                            >
                                {folder.name}
                            </Link>
                        </span>
                    ))}
                </div>
                <div style={{ marginBottom: "24px" }}>
                    <h2
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "12px",
                            color: "#555",
                        }}
                    >
                        Folders
                    </h2>
                    {props.folders.map((folder) => (
                        <FolderRow
                            key={folder.id}
                            folder={folder}
                        />
                    ))}
                </div>
                <div>
                    <h2
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "12px",
                            color: "#555",
                        }}
                    >
                        Files
                    </h2>
                    {props.files.map((file) => (
                        <FileRow
                            key={file.id}
                            file={file}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
