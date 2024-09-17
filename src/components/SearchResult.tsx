import { DownOutlined, LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, DatePicker, Dropdown, Input, Layout, MenuProps, Slider, Space, Col, Flex, Row } from "antd"
import { useState } from "react";
import { TripInfo } from "../types/tripInterface";
import TripList from "./TripList";
import { TripInfoMode } from "../types/modeInterface";
import testImg from "../assets/image/taipei101.jpg"

export const SearchResult = () => {
    const PopularCity = ["台北", "台南", "東京", "宜蘭", "大阪", "墾丁"]
    const [cityIndex, setCityIndex] = useState<number>(0)
    const [likeCount, setLikeCount] = useState<string>("請選擇")
    const [sortMethod, setSortMethod] = useState<string>("請選擇")
    const [testTrips, setTestTrips] = useState<TripInfo[]>(randomCreate())
    const likeMenuClick: MenuProps['onClick'] = (e) => {
        setLikeCount(e.key + " 以上")
    };
    const sortMenuClick: MenuProps['onClick'] = (e) => {
        setSortMethod(e.key)
    };
    const likeMenu = {
        items: [
            {
                label: '100 以上',
                key: 100,
            },
            {
                label: '500 以上',
                key: 500,
            },
            {
                label: '1000 以上',
                key: 1000,
            },
            {
                label: '5000 以上',
                key: 5000,
            },
            {
                label: '10000 以上',
                key: 10000,
            },
        ],
        onClick: likeMenuClick,
    };

    const sortMenu = {
        items: [
            {
                label: '天數：由多到少',
                key: '天數：由多到少',
            },
            {
                label: '天數：由少到多',
                key: '天數：由少到多',
            },
            {
                label: '發布時間：由新到舊',
                key: '發布時間：由新到舊',
            },
            {
                label: '讚數：由高到低',
                key: '讚數：由高到低',
            },
        ],
        onClick: sortMenuClick,
    };

    return (
        <Layout className="Result-content">
            <Space.Compact>
                <Input style={{ width: "500px" }} />
                <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    onClick={() => {}}
                />
            </Space.Compact>
            <Space size={"small"} >
                <Space>
                    <h3>天數:</h3>
                    <Slider range defaultValue={[1, 30]} min={1} max={30} tooltip={{ open: true }} style={{ width: "150px" }} />
                    <h3></h3>
                </Space>
                <Space>
                    <h3>發布時間:</h3>
                    <DatePicker picker="month" />
                </Space>
                <Space>
                    <h3>點讚數:</h3>
                    <Dropdown menu={likeMenu}>
                        <Button style={{ width: "120px" }}>
                            <Space>
                                {likeCount}
                                <DownOutlined style={{ position: "absolute", right: "5px", top: "9px" }} />
                            </Space>
                        </Button>
                    </Dropdown>
                </Space>
                <Space>
                    <h3>排序方式:</h3>
                    <Dropdown menu={sortMenu}>
                        <Button style={{ width: "180px" }}>
                            <Space>
                                {sortMethod}
                                <DownOutlined style={{ position: "absolute", right: "5px", top: "9px" }} />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Button type="primary">套用</Button>
                </Space>
            </Space >
            <h2>熱門城市</h2>
            <Space>
                <Button icon = {<LeftOutlined/>}  onClick={() => {if(cityIndex > 0){setCityIndex(cityIndex-1)}}}/>
                <Flex gap="large">
                    <Button style={{backgroundColor:"#0080FF", color:"#FFFFFF", width:"100px", height:"50px", fontSize:"18px"}}>{PopularCity[cityIndex]}</Button>
                    <Button style={{backgroundColor:"#46A3FF", color:"#FFFFFF", width:"100px", height:"50px", fontSize:"18px"}}>{PopularCity[cityIndex + 1]}</Button>
                    <Button style={{backgroundColor:"#84C1FF", color:"#000000", width:"100px", height:"50px", fontSize:"18px"}}>{PopularCity[cityIndex + 2]}</Button>
                    <Button style={{backgroundColor:"#ACD6FF", color:"#000000", width:"100px", height:"50px", fontSize:"18px"}}>{PopularCity[cityIndex + 3]}</Button>
                </Flex>
                <Button icon = {<RightOutlined/>} onClick={() => {if(cityIndex < PopularCity.length - 4){setCityIndex(cityIndex+1)}}}/>
            </Space>
            <TripList
                trips={testTrips}
                mode={TripInfoMode.Public}
                isPublic={true}
                isDelete={false}
            />
        </Layout>
    )
}
function randomCreate(): TripInfo[] {
    let result: TripInfo[] = []
    const hashtagList = ["台北","台中","台南"]
    const count: number = Math.floor(10 + Math.random() * 10)
    console.log(count)
    for (let i = 0; i < count; i++) {
        const index: number = Math.floor(Math.random() * 3)
        const day:number = Math.floor(1 + Math.random() * 7)
        const month:number = Math.floor(1 + Math.random() * 12)
        result.push({ id: "1", user: "user", userId: "userId", title: hashtagList[index] + day +"日遊", image: testImg, day, publishDay: "2023/"+month+"/01", labels: [hashtagList[index]], like: Math.floor(1 + Math.random() * 100), isLike: true, isPublic: true })
    }
    return result
}