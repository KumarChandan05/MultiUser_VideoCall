import React, { useState } from "react";
import { Upload, Button, Row, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Download } from "../Icons/Download";
import { Delete } from "../Icons/Delete";
import { PdfIcon } from "../Icons/PdfIcon";
import { DocIcon } from "../Icons/DocIcon";
import { DocXIcon } from "../Icons/DocXIcon";
import { TextIcon } from "../Icons/TextIcon";
import { ExcelIcon } from "../Icons/ExcelIcon";
import { ExcelXIcon } from "../Icons/ExcelXIcon";
import { JpgIcon } from "../Icons/JpgIcon";
import { JpegIcon } from "../Icons/JpegIcon";
import { PNGIcon } from "../Icons/PngIcon";
import { GifIcon } from "../Icons/GifIcon";

function DocumentUploader() {
    const [files, setFiles] = useState([]);

    const handleChange = (info) => {
        const newFiles = info.fileList
            .filter((file) => file.originFileObj) // Ensure valid files
            .map((file) => ({
                name: file.name,
                size: file.originFileObj.size,
                url: URL.createObjectURL(file.originFileObj),
                uid: file.uid, // Unique ID to track files
            }));

        setFiles(newFiles); // Ensure old deleted files do not persist
    };

    const formatFileSize = (size) => {
        return size < 1024
            ? `${size} B`
            : size < 1024 * 1024
                ? `${(size / 1024).toFixed(2)} KB`
                : `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const removeFile = (fileToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.uid !== fileToRemove.uid));
    };

    const getFileIcon = (extension) => {
        switch (extension.toLowerCase()) {
            case "pdf":
                return <PdfIcon style={{ fontSize: "40px" }} />;
            case "doc":
                return <DocIcon style={{ fontSize: "40px" }} />;
            case "docx":
                return <DocXIcon style={{ fontSize: "40px" }} />;
            case "txt":
                return <TextIcon style={{ fontSize: "40px" }} />;
            case "xls":
                return <ExcelIcon style={{ fontSize: "40px" }} />;
            case "xlsx":
                return <ExcelXIcon style={{ fontSize: "40px" }} />;
            case "jpg":
                return <JpgIcon style={{ fontSize: "40px" }} />;
            case "jpeg":
                return <JpegIcon style={{ fontSize: "40px" }} />;
            case "png":
                return <PNGIcon style={{ fontSize: "40px" }} />;
            case "gif":
                return <GifIcon style={{ fontSize: "40px" }} />;
            default:
                return <DocIcon style={{ fontSize: "40px" }} />;
        }
    };

    const trimFileName = (sname) => {
        return sname.length > 10 ? sname.slice(0, 12) + "..." : sname;
    }


    return (
        <Flex wrap>
            {files.map((file, index) => {
                const fileParts = file.name.split(".");
                const fileExtension = fileParts.length > 1 ? fileParts[fileParts.length - 1] : "Unknown";

                return (
                    <div
                        key={file.uid}
                        style={{
                            backgroundColor: "white",
                            width: "110px",
                            height: "110px",
                            margin: "10px",
                            borderRadius: "5px",
                            position: "relative",
                            padding:"2px"
                        }}
                    >
                        <Flex justify="center">{getFileIcon(fileExtension)}</Flex>

                        <p style={{ fontSize: "12px", marginBottom: "5px", marginLeft:"5px" }}>
                            {trimFileName(file.name)} <br />
                        </p>

                        <Flex justify="end">
                            <p style={{ fontSize: "11px", marginTop:"2px", marginRight:"4px"}}>{formatFileSize(file.size)}</p>
                            <Button
                                icon={<Download />}
                                size="small"
                                style={{ marginRight: "2px" }}
                                onClick={() => window.open(file.url, "_blank")} />
                            <Button
                                danger
                                icon={<Delete />}
                                size="small"
                                style={{ marginRight: "3px" }}
                                onClick={() => removeFile(file)}></Button>
                        </Flex>
                    </div>
                );
            })}

            <Row justify="end">
                <Upload
                    beforeUpload={() => false}
                    onChange={handleChange}
                    showUploadList={false}
                    multiple
                >
                    <Button
                        icon={<PlusOutlined style={{ fontSize: "28px" }} />}
                        style={{ height: "110px", width: "110px", margin: "10px" }}
                    />
                </Upload>
            </Row>
        </Flex>
    );
}

export default DocumentUploader;
