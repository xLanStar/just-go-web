import { PlusOutlined, RollbackOutlined, StarOutlined } from "@ant-design/icons"
import { Button, Layout, List } from "antd"
import { useState } from "react"
import "../assets/scss/planList.scss";

const colorList = ["#12d198","#EA0000", "#7373B9", "#FF8000", "#272727", "#AD5A5A", "#8600FF", "#FFD306", "#8CEA00"]
const data = [
    {
        planName: '方案一',
        colorStyle: colorList[0],
        icon: <StarOutlined/>
    },
    {
        planName: '方案二',
        colorStyle: colorList[1]
    },
    {
        planName: '方案三',
        colorStyle: colorList[2]
    },
    {
        planName: '方案四',
        colorStyle: colorList[3]
    },
    {
        planName: '建立新方案',
        colorStyle: colorList[4],
        icon: <PlusOutlined/>
    },
];
export const PlanList = () => {
    const [Plans, setPlans] = useState<number>(0)
    return (
        <Layout className="planList" id="planList">
            <RollbackOutlined className="planList-back" />
            <List
                split={false}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Button
                            icon = {item.icon}
                            style = {{
                                width: "100%",
                                padding: "20px",
                                textAlign: "center",
                                color:item.colorStyle
                            }}
                            onClick={() => {
                                document.getElementById("planDetail")!.style.display = 'flex';
                                document.getElementById("planList")!.style.display = 'none';
                            }}
                        >{item.planName}</Button>
                    </List.Item>
                )}
            />
        </Layout>
    )
}