import React, { memo, forwardRef, useImperativeHandle, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

import { Modal, Button } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { LoginWrapper } from "./style";

export default memo(
  forwardRef(function Login(props, ref) {
    const router = useRouter()
    const { providers } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [ session, loading ] = useSession()

    useImperativeHandle(ref, () => ({
      showModal: (value) => {
        setIsModalVisible(value);
      },
    }));

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginWrapper>
          <div className="title">
            <h2>歡迎回來</h2>
          </div>
          <div className="login-area">
            {providers && Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button onClick={() => signIn(provider.id)}>
                  {
                    {
                      Facebook: <FacebookOutlined />,
                      Google: <GoogleOutlined />
                    }[provider.name]
                  }
                  使用{provider.name}進行登錄
                </Button>
              </div>
            ))}
          </div>
        </LoginWrapper>
      </Modal>
    );
  })
);
