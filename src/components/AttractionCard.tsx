import { Button, ConfigProvider, Layout, TimePicker } from "antd"
import { attraction } from "../types/PlanInterface"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { CloseOutlined, DoubleLeftOutlined } from "@ant-design/icons"
import { useState } from "react"
import Sider from "antd/es/layout/Sider"
import testImg from "../assets/image/taipei101.jpg"
import TextArea from "antd/es/input/TextArea"

interface Props {
    ThisAttraction: attraction
    colorStyle: string
}

export const AttracionCard = ({ ThisAttraction, colorStyle }: Props) => {
    const rot: number[] = [-90, 90]
    const footerLabel: string[] = ["顯示詳細地點資訊", "隱藏詳細地點資訊"]
    const [index, setIndex] = useState<number>(0);
    return (
        // <Card title= "PlaceName" className="planning-planDetail-content-attractionCard">
        // </Card>
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultHoverBorderColor: colorStyle,
                        defaultHoverColor: colorStyle
                    },
                },
            }}
        >
            <Layout style={{
                display: "flex",
                width: "100%",
                height: "240px",
                borderRadius: "10px",
                borderWidth: "1px",
                borderColor: "#D6D6D6",
                borderStyle: "solid",
            }} id="AttractionCard">
                <Header style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px 10px 0 0",
                }}>
                    <h3>PlaceName</h3>
                    <Button icon={<CloseOutlined />} style={{
                        position: "absolute",
                        right: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} />
                </Header>

                <Layout>
                    <Layout style={{
                        widows: "100%",
                        height: "140px",
                    }}>
                        <Sider width="150px" style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#ffffff"
                        }}>
                            <img src={testImg} alt="" style={{ width: "120px", height: "120px", minWidth: "120px", minHeight: "120px" }} />
                        </Sider>

                        <Content style={{
                            width: "100%",
                            height: "100%",
                            padding: "10px",
                            backgroundColor: "#ffffff",
                        }}>
                            <h3>地址:</h3>
                            <h3>Address</h3>
                            <h3>停留時間:</h3>
                            <TimePicker.RangePicker />
                        </Content>
                    </Layout>

                    <Layout style={{
                        widows: "100%",
                        height: "200px",
                    }} id="moreInfo">
                        <Sider width="150px" style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#ffffff"
                        }}>
                            {/* <h4>營業時間:</h4>
                            <h4>週一:start_time ~ end_time</h4>
                            <h4>週二:start_time ~ end_time</h4>
                            <h4>週三:start_time ~ end_time</h4>
                            <h4>週四:start_time ~ end_time</h4>
                            <h4>週五:start_time ~ end_time</h4>
                            <h4>週六:start_time ~ end_time</h4>
                            <h4>週日:start_time ~ end_time</h4> */}
                        </Sider>

                        <Content style={{
                            width: "100%",
                            height: "100%",
                            padding: "10px",
                            backgroundColor: "#ffffff",
                        }}>
                            <h3>電話:PhoneName</h3>
                            <h3>評分:Score</h3>
                            <h3>備註:</h3>
                            <TextArea style={{
                                width: "100%",
                                height: "100px",
                                backgroundColor: "#D6D6D6",
                            }} />
                        </Content>
                    </Layout>
                </Layout>

                <Footer style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%", height: "50px",
                    borderRadius: "0 0 10px 10px",
                    backgroundColor: colorStyle,
                    gap: "10px",
                    color: "#ffffff"
                }}
                    onClick={() => {
                        setIndex((index + 1) % 2)
                        if (index === 1) {
                            document.getElementById("AttractionCard")!.style.height = '240px'
                            document.getElementById("moreInfo")!.style.display = 'none'
                        }

                        else {
                            document.getElementById("AttractionCard")!.style.height = '450px'
                            document.getElementById("moreInfo")!.style.display = 'flex'
                        }
                    }}>
                    <DoubleLeftOutlined rotate={rot[index]} />
                    <h3 style={{ alignItems: "center" }}> {footerLabel[index]} </h3>
                    <DoubleLeftOutlined rotate={rot[index]} />
                </Footer>
            </Layout>
        </ConfigProvider>
    )
}