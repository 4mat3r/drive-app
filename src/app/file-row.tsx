import type { Folder, File } from "@/lib/mock-data";
import Image from "next/image";

export function FileRow(props: { file: File; handleFileClick: () => void }) {
    const { file, handleFileClick } = props;

    return (
        <div
            onClick={handleFileClick}
            style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: "1px solid #e0e0e0",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "background-color 0.2s",
                backgroundColor: "#fff",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                marginBottom: "8px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
        >
            <Image
                src="/file-icon.png"
                alt="File Icon"
                width={32}
                height={32}
                style={{ marginRight: "12px" }}
            />
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600", fontSize: "16px", color: "#333" }}>
                    {file.name}
                </div>
                <div style={{ fontSize: "14px", color: "#777" }}>
                    {file.size} KB •{" "}
                    {file.modified ? file.modified.toLocaleString() : "Unknown"}
                </div>
            </div>
        </div>
    );
}

export function FolderRow(props: {
    folder: Folder;
    handleFolderClick: () => void;
}) {
    const { folder, handleFolderClick } = props;

    return (
        <div
            onClick={handleFolderClick}
            style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: "1px solid #e0e0e0",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "background-color 0.2s",
                backgroundColor: "#fff",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                marginBottom: "8px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
        >
            <Image
                src="/folder-icon.png"
                alt="Folder Icon"
                width={32}
                height={32}
                style={{ marginRight: "12px" }}
            />
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600", fontSize: "16px", color: "#333" }}>
                    {folder.name}
                </div>
                <div style={{ fontSize: "14px", color: "#777" }}>
                    {folder.modified
                        ? folder.modified.toLocaleString()
                        : "Unknown"}
                </div>
            </div>
        </div>
    );
}
