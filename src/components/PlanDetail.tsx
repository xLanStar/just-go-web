import { LeftOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { useState } from "react";
import { attraction, Day, transportationInfo } from "../types/PlanInterface";
import { AttracionCard } from "./AttractionCard";
import "../assets/scss/planDetail.scss";
import { TransportationCard } from "./TransportationCard";

const testAttraction:attraction = {
    id: "1",
    day_id: "1",
    start_at: new Date(),
    end_at: new Date(),
    note: "note",
    google_place_id: "1",
    next_attraction_id: "1"
}

const testTransportation:transportationInfo = {
    id: "id",
    day_id: "day_id",
    place_id_from: "place_id_from",
    place_id_to: "place_id_to",
    way: "way",
    spend_time: new Date()
}



export const PlanDetail = () => {
    const [days, setDays] = useState<Day[]>(TestDays)
    return (
        <div className="planDetail" id="planDetail">
            <div className="planDetail-header">
                <h3 className="planDetail-header-displayName">方案一</h3>
                <LeftOutlined
                    className="planDetail-header-back"
                    onClick={() => {
                        document.getElementById("planList")!.style.display = 'flex';
                        document.getElementById("planDetail")!.style.display = 'none';
                    }}
                />
            </div>
            {/* <Row className="planning-planDetail-dayList">
                <Col span={2}>
                    <Button className="planning-planDetail-dayList-left" icon={<LeftOutlined />}/>
                </Col>
                <Col span={20}>
                    <List
                        grid={{ gutter: 0, column: 4 }}
                        dataSource={days}
                        renderItem={(item) => (
                            <List.Item>
                                <h3>{item.id}</h3>
                            </List.Item>
                        )}>
                    </List>
                </Col>
                <Col span={2}>
                    <Button className="planning-planDetail-dayList-right" icon={<RightOutlined />}></Button>
                </Col>
            </Row> */}
            <div className="planDetail-content">
                <Tabs className="planDetail-tabs"
                    defaultActiveKey="1"
                    color="#12D198"
                    items={
                        days.map((_, i) => {
                        const id = String(i + 1);
                        return {
                            label: `第${id}天`,
                            key: id,
                            children:
                            <div>
                                <AttracionCard ThisAttraction = {testAttraction} colorStyle={"#12D198"}/>
                                <TransportationCard ThisTransportation = {testTransportation} colorStyle={"#12D198"}/>
                            </div>,
                        };
                    })}
                />
            </div>
        </div>
    )
}
function TestDays(): Day[] {
    let result: Day[] = []
    const count: number = Math.floor(1 + Math.random() * 5)
    for (let i = 0; i < count; i++) {
        result.push({
            id: String(i),
            plan_id: "plan1",
            start_attraction_id: "attraction" + i,
            next_day_id: String(i + 1)
        })
    }
    return result
}