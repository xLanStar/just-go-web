import { LeftOutlined } from "@ant-design/icons";
import { ConfigProvider, Tabs } from "antd";
import { useState } from "react";
import "../assets/scss/planDetail.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AttractionData, DayData } from "../types/PlanUIInterface";
import DayAttracionList from "./DayAttractionList";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export const PlanDetail = () => {
    const colorStyle = useSelector((state: RootState) => state.currentPlan.value.colorStyle);
    const [items, setItems] = useState(TestDays().map((day, i) => {
        return {
            label: "第"+ (i+1) +"天",
            key: String(i+1),
            children: <DayAttracionList attractions={day.attractions} />
        };
    }));

    const [activeKey, setActiveKey] = useState(items[0].key);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = String(items.length + 1);
        const newPanes = [...items];
        newPanes.push({ label: "第"+ newActiveKey +"天", children: <DayAttracionList attractions={[]} />, key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes.map((pane, i) => {
            return {
                label: "第"+ (i + 1) +"天",
                key: String(i + 1),
                children: pane.children
            };
        }));
        setActiveKey(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <div className="planDetail" id="planDetail">
            <div className="planDetail-header">
                <h3 style={{ color: colorStyle }}>方案一</h3>
                <LeftOutlined
                    className="planDetail-header-back"
                    style={{ color: colorStyle }}
                    onClick={() => {
                        document.getElementById("planList")!.style.display = 'flex';
                        document.getElementById("planDetail")!.style.display = 'none';
                    }}
                />
            </div>
            <div className="planDetail-content">
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                inkBarColor: colorStyle,
                                itemSelectedColor: colorStyle,
                                itemHoverColor: colorStyle
                            },
                        },
                    }}
                >
                    <Tabs
                        type="editable-card"
                        onChange={onChange}
                        activeKey={activeKey}
                        onEdit={onEdit}
                        items={items}
                    />
                </ConfigProvider>
            </div>
        </div>

    )
}

function TestDays(): DayData[] {
    let result: DayData[] = []
    const dayNumber: number = Math.floor(1 + Math.random() * 5)

    for (let i = 0; i < dayNumber; i++) {
        const attractionNumber: number = Math.floor(1 + Math.random() * 5)
        const attractions: AttractionData[] = []
        for (let j = 0; j < attractionNumber; j++) {
            attractions.push({
                name: "測試Attraction" + (j + 1),
                address: "address" + (j + 1),
                start_time: null,
                end_time: null,
                phone: "phone" + (j + 1),
                rating: Math.floor(1 + Math.random() * 5),
                remark: ""
            })
        };
        result.push({ attractions })
    }
    return result
}