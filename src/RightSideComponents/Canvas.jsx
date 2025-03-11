import React, { useRef, useState, useEffect } from "react";
import { Button, Space } from "antd";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Update with your backend URL

const DrawingApp = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const remUsr = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('PEN')
    const [isErasing, setIsErasing] = useState(false);
    const [user, setUser] = useState(Date.now().toString(16))

    useEffect(() => {
        socket.emit("joinRoom", 'appna');

        const canvas = canvasRef.current;
        canvas.width = 380;
        canvas.height = 500;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctxRef.current = ctx;

        socket.on("drawing-start", (data) => {
            drawStartOnCanvas(data);
        });

        socket.on("drawing", (data) => {
            drawOnCanvas(data);
        });
        socket.on("drawing-stop", (data) => {
            drawStopOnCanvas(data);
        });
        socket.on("drawing-clear", (data) => {
            clearOnCanvas(data)
        })

        return () => {
            socket.off("drawing-start");
            socket.off("drawing");
            socket.off("drawing-stop");
            socket.off("drawing-clear");
        }
    }, []);

    const clearOnCanvas = (data) => {
        if (data.user === user) {
            return;
        }
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.fillStyle = "white";
        ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    const drawStartOnCanvas = (data) => {
        if (data.user === user) {
            return;
        }
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(data.x, data.y);
    }

    const drawOnCanvas = (data) => {
        if (data.user === user) {
            return;
        }
        const tool = data.type;
        if (tool === 'ERS') {
            ctxRef.current.strokeStyle = "white";
            ctxRef.current.lineWidth = 20;
        } else if (tool === 'PEN') {
            ctxRef.current.strokeStyle = "black";
            ctxRef.current.lineWidth = 1
        }
        ctxRef.current.lineTo(data.x, data.y);
        ctxRef.current.stroke();

        remUsr.current.innerHTML = data.user;
        remUsr.current.style.left = canvasRef.current.offsetLeft + data.x + 'px';
        remUsr.current.style.top = canvasRef.current.offsetTop + data.y + 'px';
        remUsr.current.style.position = 'absolute'

    }

    const drawStopOnCanvas = (data) => {
        if (data.user === user) {
            return;
        }
        ctxRef.current.closePath();
        remUsr.current.style.left = '20000px';
        remUsr.current.style.top = '20000px';
    }

    const startDrawing = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        if (tool === 'ERS') {
            ctxRef.current.strokeStyle = "white";
            ctxRef.current.lineWidth = 20;
        } else if (tool === 'PEN') {
            ctxRef.current.strokeStyle = "black";
            ctxRef.current.lineWidth = 1
        }

        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        socket.emit('drawing-start', {
            room: 'appna',
            data: {
                user,
                x: offsetX,
                y: offsetY,
                type: tool
            }
        });
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        socket.emit('drawing', {
            room: 'appna',
            data: {
                user,
                x: offsetX,
                y: offsetY,
                type: tool
            }
        });
    };

    const stopDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
        socket.emit('drawing-stop', {
            room: 'appna',
            data: {
                user,
                type: tool
            }
        });
    };


    const clearCanvas = () => {

        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.fillStyle = "white";
        ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        socket.emit('drawing-clear', {
            room: 'appna',
            data: {
                user
            }
        })
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{
                    border: "1px solid black",
                    borderRadius: "10px",
                    cursor: isErasing ? "cell" : "crosshair"
                }}
            />
            <div style={{ marginTop: "10px" }}>
                <Space>
                    <Button primary onClick={e => setTool('PEN')}>✏️</Button>
                    <Button default onClick={e => setTool('ERS')}>🧼 </Button>
                    <Button default onClick={clearCanvas}>🗑️ Clear All</Button>
                </Space>
            </div>
            <span
                ref={remUsr}
                style={{
                    position: 'absolute',
                    border: '1px solid red',
                    width: 40,
                    height: 40,
                    zIndex: 9999
                }}>
            </span>
        </div>
    );
};

export default DrawingApp;