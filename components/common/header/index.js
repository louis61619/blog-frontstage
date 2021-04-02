import React, { memo, useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

import { useCheckLogin } from "~/utils/custom-hook";

import { Row, Menu, Col, Dropdown } from "antd";
import {
  MessageOutlined,
  SnippetsOutlined,
  UserOutlined,
  LoginOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";
import Login from "~/components/common/login";
import { HeaderWrapper, MenuWrapper } from "./style";

export default memo(function Header(props) {
  const { providers } = props;
  const loginRef = useRef();
  const router = useRouter();
  const [isLogin, userInfo] = useCheckLogin();

  const login = () => {
    if (isLogin) {
      router.push("/profile");
    } else {
      loginRef.current.showModal(true);
    }
  };


  const menu = (
    <MenuWrapper
      selectedKeys={router.asPath}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        borderBottom: "none",
      }}
    >
      <Menu.Item key="/article">
        <Link href="/article">
          <a>
            <SnippetsOutlined />
            文章
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/profile" onClick={login}>
        {isLogin ? (
          <>
            <UserOutlined />
            用戶
          </>
        ) : (
          <>
            <LoginOutlined />
            登錄
          </>
        )}
      </Menu.Item>
    </MenuWrapper>
  );

  return (
    <HeaderWrapper>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: "100%", flexWrap: "nowrap" }}
      >
        <Col xs={21} sm={22} md={10} lg={17} xl={12} style={{ zIndex: 1 }}>
          <Link href="/home">
            <div className="header-title">
              <span className="header-logo">
                <img src="/logo.png" />
              </span>
              <span className="header-text">welcome to my blog</span>
            </div>
          </Link>
        </Col>
        <Col xs={0} sm={0} md={13} lg={6} xl={6}>
          {menu}
        </Col>
        <Col xs={2} sm={1} md={0} lg={0} xl={0}>
          <Dropdown
            overlay={menu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <AlignRightOutlined className="menu-icon" />
          </Dropdown>
        </Col>
      </Row>
      <Login ref={loginRef} providers={providers} />
    </HeaderWrapper>
  );
});
