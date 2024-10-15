import { Button, Flex, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../apis/auth";
import { Color } from "../../data/color";

const Verify: React.FunctionComponent = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  if (!token) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Result
          status="error"
          title="驗證失敗"
          subTitle="請重新驗證"
          extra={[
            <Button
              type="primary"
              key="signin"
              onClick={() => {
                navigate("/signin");
              }}
            >
              返回登入
            </Button>,
          ]}
        />
      </Flex>
    );
  }

  useEffect(() => {
    const verify = async () => {
      const response = await verifyEmail(token);
      if (response.status === "success") {
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    };
    verify();
  }, []);

  return (
    <>
      {loading ? (
        <Flex
          className="explore"
          vertical
          justify="center"
          align="center"
          style={{
            width: "100%",
            height: "calc(100vh - 64px)",
          }}
        >
          <Spin
            tip="Loading..."
            style={{
              backgroundColor: Color.bodyGrey,
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
              }}
            ></div>
          </Spin>
        </Flex>
      ) : (
        <>
          {error ? (
            <Flex
              justify="center"
              align="center"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Result
                status="error"
                title="驗證失敗"
                subTitle="請重新驗證"
                extra={[
                  <Button
                    type="primary"
                    key="signin"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    返回登入
                  </Button>,
                ]}
              />
            </Flex>
          ) : (
            <Flex
              justify="center"
              align="center"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Result
                status="success"
                title="驗證成功"
                subTitle="請重新登入"
                extra={[
                  <Button
                    type="primary"
                    key="signin"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    返回登入
                  </Button>,
                ]}
              />
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default Verify;
