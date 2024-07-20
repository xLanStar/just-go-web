// src\components\CustomGoogleLogin.tsx
// 客製化的google登入按鈕

import { GoogleCircleFilled } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "antd";
import { authRequest } from "../utils/request";
import { setJwtToken, saveUser } from "../apis/auth";
import { User } from "../types/userInterface";

export const CustomGoogleLogin = () => {
    const CustomLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            try {
                const response = await authRequest.post("/customlogin", { code });

                const user: User = response.data;
                setJwtToken(code);
                saveUser(user);

                console.log(response.data.email, response.data.username); // 在此後端返回的資料是 userInfo
            } catch (error) {
                console.error('Error during login:', error);
            }
        },
        flow: 'auth-code',
    });

    return (
        <Button
            icon={<GoogleCircleFilled />}
            size="large"
            style={{ width: "100%" }}
            onClick={() => CustomLogin()}
        >
            Google
        </Button>
    );
};