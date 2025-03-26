"use client";
import { useMemo, useState } from "react";
import { FileRow, FolderRow } from "./file-row";
import { files, folders } from "@/server/db/schema.js";
import Link from "next/link";

export default function DriveContents(props: {
    files: typeof files.$inferSelect[];
    folders: typeof folders.$inferSelect[];
}) {
    const [currentFolder, setCurrentFolder] = useState<number>(1);

    const getBreadcrumbs = useMemo(() => {
        const breadcrumbs = [];
        let current = props.folders.find((folder) => folder.id === currentFolder);
        while (current) {
            breadcrumbs.unshift(current);
            current = props.folders.find(
                (folder) => folder.id === current?.parent
            );
        }
        return breadcrumbs;
    }, [currentFolder, props.folders]);


    return (
        <div
            style={{
                padding: "24px",
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
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
                    {getBreadcrumbs.map((folder, index) => (
                        <span key={folder.id}>
                            {" / "}
                            <Link
                                href={`/f/${folder.id}`}
                                style={{
                                    cursor: "pointer",
                                    color:
                                        index === getBreadcrumbs.length - 1
                                            ? "#333"
                                            : "#007bff",
                                }}
                            >
                                {folder.name}
                            </Link>
                        </span>
                    ))}
                </div>
                {currentFolder !== 1 && (
                    <Link 
                        href={`/f/${currentFolder}`}
                        style={{
                            marginBottom: "16px",
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#0056b3")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#007bff")
                        }
                    >
                        Back
                    </Link>
                )}
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
