import { useState } from "react"
import { List } from "antd"
import { AttracionCard } from "./AttractionCard"
import { AttractionData } from "../types/PlanUIInterface"
import "../assets/scss/dayAttractionList.scss";

interface Props {
    attractions: AttractionData[]
}

export const DayAttracionList = ({ attractions }: Props) => {
    const [index, setIndex] = useState<number>(0);
    return (
        <List
            className="dayAttractionList"
            split={false}
            dataSource={attractions}
            renderItem={(attraction) => (
                <List.Item>
                    <AttracionCard attractionData={attraction} />
                </List.Item>
            )}
        />
    )
}

export default DayAttracionList;