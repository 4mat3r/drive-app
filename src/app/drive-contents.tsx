"use client";
import { useMemo, useState } from "react";
import { FileRow, FolderRow } from "./file-row";
import { files, folders } from "@/server/db/schema.js";

export default function DriveContents(props: {
    files: typeof files.$inferSelect[];
    folders: typeof folders.$inferSelect[];
}) {
    const [currentFolder, setCurrentFolder] = useState<number>(1);

    const handleFolderClick = (folderId: number) => {
        setCurrentFolder(folderId);
    };

    const handleFileClick = (fileName: string) => {
        alert(`File clicked: ${fileName}`);
    };

    const handleBackClick = () => {
        const parentFolder = props.folders.find(
            (folder) => folder.id === currentFolder
        )?.parent;
        if (parentFolder) {
            setCurrentFolder(parentFolder);
        }
    };

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
                    <span
                        style={{ cursor: "pointer", color: "#007bff" }}
                        onClick={() => setCurrentFolder(1)}
                    >
                        Home
                    </span>
                    {getBreadcrumbs.map((folder, index) => (
                        <span key={folder.id}>
                            {" / "}
                            <span
                                style={{
                                    cursor: "pointer",
                                    color:
                                        index === getBreadcrumbs.length - 1
                                            ? "#333"
                                            : "#007bff",
                                }}
                                onClick={() => setCurrentFolder(folder.id)}
                            >
                                {folder.name}
                            </span>
                        </span>
                    ))}
                </div>
                {currentFolder !== 1 && (
                    <button
                        onClick={handleBackClick}
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
                    </button>
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
                            handleFolderClick={() =>
                                handleFolderClick(folder.id)
                            }
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
                            handleFileClick={() => handleFileClick(file.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
