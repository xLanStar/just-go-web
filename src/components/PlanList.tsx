import { PlusOutlined, RollbackOutlined, StarOutlined } from "@ant-design/icons"
import { Button, Layout, List } from "antd"
import { useState } from "react"

const colorList = ["#EA0000", "#00E3E3", "#FFD306", "#7373B9", "#FF8000", "#8CEA00", "#B766AD", "#AD5A5A", "#8600FF"]
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
        colorStyle: colorList[3],
        icon: <PlusOutlined/>
    },
];
export const PlanList = () => {
    const [Plans, setPlans] = useState<number>(0)
    return (
        <Layout className="planning-planList" id="planList">
            <RollbackOutlined className="planning-planList-back" />
            <List
                split={false}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Button
                            icon = {item.icon}
                            className="planning-planList-item"
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