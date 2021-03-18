import React, { memo, useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { useCheckLogin } from '~/utils/custom-hook'

import { Row, Menu, Col } from "antd";
import {
  MessageOutlined,
  SnippetsOutlined,
  UserOutlined,
  LoginOutlined
} from "@ant-design/icons";
import Login from '~/components/common/login'
import { HeaderWrapper } from "./style";

export default memo(function Header(props) {

  const { providers } = props
  const loginRef = useRef()
  const router = useRouter()
  const [ isLogin, userInfo ] = useCheckLogin()

  const login = () => {
    if(isLogin) {
      router.push('/profile')
    } else {
      loginRef.current.showModal(true)
    }
  }

  return (
    <HeaderWrapper>
      <Row type="flex" justify="center" align="middle" style={{height: "100%", flexWrap: "nowrap"}}>
        <Col xs={23} sm={23} md={10} lg={17} xl={12} style={{zIndex: 1}}>
          <Link href="/home">
            <a>
              <span className="header-logo">Coder Land</span>
              <span className="header-text">welcome to my blog</span>
            </a>
          </Link>
        </Col>
        <Col xs={0} sm={0} md={13} lg={6} xl={6}>
          <Menu mode="horizontal" selectedKeys={router.asPath} style={{display: "flex", justifyContent: "flex-end", borderBottom: "none"}}>
            <Menu.Item key="/article">
              <Link href="/article">
                <a>
                  <SnippetsOutlined />
                  文章
                </a>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="message">
              <Link href="/message">
                <a>
                  <MessageOutlined />
                  留言
                </a>
              </Link>
            </Menu.Item> */}
            <Menu.Item key="/profile" onClick={login}>
              {isLogin? 
                <>
                  <UserOutlined />用戶
                </>   
                : 
                <>
                  <LoginOutlined />登錄
                </>      
              }
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <Login ref={loginRef} providers={providers} />
    </HeaderWrapper>
  );
});


