import React, { useEffect, useRef } from "react";
import { Button, Col, Layout, Row, Tabs, Input } from "antd";
import { EditOutlined, MessageOutlined, SendOutlined, UploadOutlined } from "@ant-design/icons";
import DrawingApp from "./RightSideComponents/Canvas";
import DocumentUploader from "./RightSideComponents/Document";
import Message from "./RightSideComponents/Messages";
const { Header } = Layout;

function VideoCall() {
    //video cam
    const myScreen = useRef(null);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            if (myScreen.current) {
                myScreen.current.srcObject = stream;
            }
        }).catch(error => console.error("Error accessing webcam:", error));
    }, []);

    //tabs
    const { TabPane } = Tabs;

    //ChatBox
    


    return (
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
            {/* Header */}
            <Header style={{
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                background: "#001529",
                height: "66px",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
            }}>
                COLLAB NOW
            </Header>
            {/* Main Content */}
            <div style={{ backgroundColor: "white" }}>
                <Row style={{
                    height: "calc(100vh - 70px)",

                }}>

                    {/* Left Section */}
                    <Col style={{
                        width:"63%"
                        // border: "1px solid black"
                    }}>
                        <div>
                            
                        </div>
                    </Col>


                    {/* Right Section */}

                    <Col style={{
                        width:"37%"
                    }}>
                        <div style={{
                            backgroundColor: " #f5f5f5",
                            borderRadius: "10px",
                            margin: "10px",
                            height: "87vh"
                        }}>

                            <Tabs defaultActiveKey="1" tabPosition="right">

                                {/* Message */}

                                <TabPane icon={<MessageOutlined style={{ fontSize: "20px" }} />} key="1" >
                                    <Message/>
                                </TabPane>

                                {/* Canvas */}

                                <TabPane icon={<EditOutlined style={{ fontSize: "20px" }} />} key="2">
                                        <DrawingApp/>
                                </TabPane>

                                {/* Document */}

                                <TabPane icon={<UploadOutlined style={{ fontSize: "20px" }} />} key="3">
                                    <DocumentUploader/>
                                </TabPane>

                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}
export default VideoCall;