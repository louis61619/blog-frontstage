import React, { memo, useCallback, useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getUserInfoAction,
  getFavoriteListAction,
  resetUser,
} from "~/store/user/actionCreators";

import { Row, Col, Affix, List, Upload, Button, Menu } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";

import Notice from "~/components/profile/notice";
import Favorite from "~/components/profile/favorite";
import Author from "~/components/common/author";
import { ProfileWrapper } from "~/components/profile/style";

function getUid(id) {
  const uid = 1000 + id;
  return `coder_${uid}`;
}

// const { TabPane } = Tabs;

export default memo(function Profile(props) {
  const router = useRouter();
  const { info } = router.query;

  const { userInfo, favoriteList } = useSelector(
    (state) => ({
      userInfo: state.getIn(["user", "userInfo"]),
      favoriteList: state.getIn(["user", "favoriteList"]),
    }),
    shallowEqual
  );
  const [current, setCurrent] = useState(...info);

  useEffect(() => {
    setCurrent(...info);
  }, [info]);

  const dispatch = useDispatch();

  const menuClick = useCallback((e) => {
    router.push({
      pathname: "/profile/" + e.key,
    });
  }, []);

  const clickSignOut = useCallback(() => {
    signOut({ callbackUrl: "/" })
  }, [signOut])

  return (
    <ProfileWrapper>
      <Head>
        <title>Profile</title>
      </Head>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          <div className="user">
            <div className="user-image">
              <div className="image-show">
                <img src={userInfo?.avatarUrl}></img>
              </div>
              {/* <Upload {...props}>
                <UploadOutlined />
              </Upload> */}
            </div>
            <div className="user-info">
              <div>
                暱稱: {userInfo.name} <EditOutlined style={{ color: "blue" }} />
              </div>
              <div>email: {userInfo.email}</div>
              <Button
                onClick={(e) => clickSignOut()}
                size="small"
              >
                登出
              </Button>
              {/* <Button size="small">修改個人資料</Button> */}
              {/* <Button size="small">上傳頭像</Button> */}
            </div>
          </div>
          <div className="menu">
            <Menu
              mode="horizontal"
              onClick={menuClick}
              selectedKeys={[current]}
            >
              <Menu.Item key="favorite">收藏</Menu.Item>
              <Menu.Item key="notice">通知</Menu.Item>
            </Menu>
          </div>
          <div>
            {
              {
                favorite: <Favorite />,
                notice: <Notice />,
              }[current]
            }
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={6} />
      </Row>
    </ProfileWrapper>
  );
});

export const getServerSideProps = async ({ params }) => {
  const { info } = params;

  if (!info) {
    return {
      redirect: {
        source: "/profile",
        destination: "/profile/favorite",
        permanent: false,
      },
    };
  }

  return {
    props: {
      info,
    },
  };
};
