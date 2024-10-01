import { ConfigProvider, Layout } from "antd"
import { transportationInfo } from "../types/PlanInterface"
import { ArrowDownOutlined, LineOutlined } from "@ant-design/icons"

import "../assets/scss/transportationCard.scss"
import Sider from "antd/es/layout/Sider"

interface Props {
    ThisTransportation: transportationInfo
    colorStyle: string
}

export const TransportationCard = ({ ThisTransportation, colorStyle }: Props) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultHoverBorderColor: colorStyle,
                        defaultHoverColor: colorStyle,
                    },
                },
            }}
        >
            <Layout className="TransportationCard">
                <Sider width={30} style={{ backgroundColor: "#ffffff" }}>
                    <LineOutlined rotate={90} style={{ fontSize: '30px' }}/>
                    <LineOutlined rotate={90} style={{ fontSize: '30px' }}/>
                    <ArrowDownOutlined style={{ fontSize: '30px', margin:"0px"}}/>
                </Sider>
                
            </Layout>
        </ConfigProvider>
    )
}