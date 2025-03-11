import React, { useState } from "react";
import { Upload, Button, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PdfIcon } from "../Icons/PdfIcon";
import { ExcelIcon } from "../Icons/ExcelIcon";
import { WordIcon } from "../Icons/WordIcon";

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
        <div>
            {files.map((file, index) => (

                <div key={index} style={{backgroundColor:"white"}}>

                    <p style={{marginBottom: "5px"}}>
                        {file.name} <br/>{formatFileSize(file.size)}</p>

                    <Button
                        type="primary"
                        onClick={() => window.open(file.url, "_blank")}

                    >
                        Open
                    </Button>
                    <Button danger onClick={() => removeFile(file)}>
                        Remove
                    </Button>
                </div>

            ))}


            <Row justify="end">
                <Upload
                    beforeUpload={() => false}
                    onChange={handleChange}
                    showUploadList={false}
                    multiple
                >
                    <Button icon={<PlusOutlined />} />
                </Upload>

            </Row>
        </div>
    );
}

export default DocumentUploader;
