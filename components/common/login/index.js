import React, { memo, forwardRef, useImperativeHandle, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";
import NProgress from "nprogress";

import { changeLoginModelStatus } from '~/store/user/actionCreators'

import { Modal, Button } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { LoginWrapper } from "./style";

export default memo(
  forwardRef(function Login(props, ref) {
    const router = useRouter()
    const { providers } = props;
    const {
      loginModelStatus: isModalVisible
    } = useSelector((state) => ({
      loginModelStatus: state.getIn(['user', 'loginModelStatus'])
    }), shallowEqual)

    const dispatch = useDispatch()

    useImperativeHandle(ref, () => ({
      showModal: (value) => {
        dispatch(changeLoginModelStatus(value));
      },
    }));

    const handleOk = () => {
      dispatch(changeLoginModelStatus(false))
    };

    const handleCancel = () => {
      dispatch(changeLoginModelStatus(false))
    };

    const clickSignIn = (id) => {
      NProgress.start();
      signIn(id)
    }

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
                <Button onClick={() => clickSignIn(provider.id)}>
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
          <div className="privacy" onClick={e => setIsModalVisible(false)}>
            <Link href="/privacy">
              <a>
                <span>隱私權</span>
              </a>
            </Link>
          </div>
        </LoginWrapper>
      </Modal>
    );
  })
);
