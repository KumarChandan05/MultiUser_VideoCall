import React, { useState } from "react";
import { Upload, Button, Card, Row, Col, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Download } from "../Icons/Download";
import { PdfIcon } from "../Icons/Pdf";
import { Delete } from "../Icons/Delete";

function DocumentUploader() {
    const [files, setFiles] = useState([]);
    const handleChange = (info) => {
        const newFiles = info.fileList.map((file) => ({
            name: file.name,
            size: file.originFileObj.size,
            url: URL.createObjectURL(file.originFileObj),
        }));

        setFiles(newFiles);
    };

  

    const formatFileSize = (size) => {
        return size < 1024
            ? `${size} B`
            : size < 1024 * 1024
            ? `${(size / 1024).toFixed(2)} KB`
            : `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }

    const removeFile = (fileToRemove) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    return (
        <Flex wrap >
            {files.map((file, index) => (


                <div key={index} style={{
                    backgroundColor: "white",
                    width: "150px",
                    height: "150px",
                    margin: "10px",
                    borderRadius: "5px",
                    position: "relative"
                }}>
                    <Flex justify="center">
                        <PdfIcon style={{ fontSize: "60px" }} />
                    </Flex>
                    <p style={{
                        marginBottom: "5px",
                        position: "absolute",
                        bottom: "3px",
                        left: "4px"
                    }}>
                        {file.name} <br />{formatFileSize(file.size)}</p>

                    <Flex vertical style={{ position: "absolute", top: "3px", right: "3px", gap: "5px" }}>
                        <Button icon={<Download />} size="small" onClick={() => window.open(file.url, "_blank")}></Button>
                        <Button danger icon={<Delete />} size="small" onClick={() => removeFile(file)}></Button>
                    </Flex>
                </div>

            ))}

            <Row justify="end">
                <Upload
                    beforeUpload={() => false}
                    onChange={handleChange}
                    showUploadList={false}
                    multiple
                >
                    <Button icon={<PlusOutlined style={{ fontSize: "28px" }} />} style={{ height: "150px", width: "150px", margin: "10px" }} />
                </Upload>

            </Row>
        </Flex>
    );
}

export default DocumentUploader;
