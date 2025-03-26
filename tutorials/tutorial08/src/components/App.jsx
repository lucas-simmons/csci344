
import React, {useState} from "react";
import NavBar from "./NavBar";
import { ColorPicker, Image, Calendar, Input, QRCode, Space, Spin } from "antd";


// custom components:
export default function App() {
    const [text, setText] = React.useState('https://ant.design/');

    return (
        <>
            <NavBar />

            <main className="min-h-screen max-w-[1000px] mt-24 mx-auto">
                <p>Put your design system components in the space below...</p>
                <ColorPicker defaultValue="#1677ff" />
                <Image
                    src="https://picsum.photos/200/200?id=1"
                    width={200}
                />
                <Space direction="vertical" align="center">
                <QRCode value={text || '-'} />
                <Input placeholder="-" maxLength={60} value={text} onChange={e => setText(e.target.value)} />
                </Space>
                <Spin />
                
                <Calendar  />

            </main>
            <footer className="p-5 bg-white">footer goes here</footer>
        </>
    );
}
