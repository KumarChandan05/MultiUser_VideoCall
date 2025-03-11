import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, Input } from "antd";
import React, { useState } from "react";




function Message() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([])


    const onTxtSend = () => {
        if (!inputValue.trim())
            return;
        setMessages(m => [...m, {
            text: inputValue,
            user: 'Me',
            self: true,
            timestamp: new Date()
        }]);
        setInputValue('')
    }

    const renderMessage = (msgItem) => {

        return (
            <Flex gap={5} style={{ width: '100%', padding: 10,
                flexDirection:(msgItem.self?'row':'row-reverse')
             }}>
               <Flex 
               vertical
                style={{ width: '95%', alignItems:(msgItem.self?'flex-end':'flex-start'),}}>
                <Card
                    bodyStyle={{
                        padding: 5,
                    }}
                >
                    {msgItem.text}
                </Card>
                <small style={{ zoom:0.8}}>{msgItem.timestamp.toLocaleString()}</small>
               </Flex>
                <Avatar
                >{msgItem.user}</Avatar>
            </Flex>
        )
    }

    return (
        <Flex vertical>
            <div style={{
                height: 'calc(100vh - 140px)',
                overflowY: 'auto',
                overflowX: 'hidden'
            }}>
                {messages.map(m => {
                    return renderMessage(m)
                })}
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                flex: "vertical",
                gap: "10px"
            }}>
                <Input type="text" style={{ width: "80%" }}
                    value={inputValue}
                    onChange={e => {
                        setInputValue(e.target.value);
                    }}
                    onKeyUp={e => {
                        if (e.code === "Enter") {
                            onTxtSend();
                        }
                    }}
                />
                <Button type="primary" icon={<SendOutlined />} onClick={onTxtSend} />
            </div>
        </Flex>
    )
}

export default Message