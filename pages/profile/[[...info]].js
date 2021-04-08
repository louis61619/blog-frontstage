import React, { memo, useCallback, useEffect, useState, Fragment, useRef } from "react";
import ReactDOM from "react-dom";

import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import ImgCrop from 'antd-img-crop';
import {
  getUserInfoAction,
  getFavoriteListAction,
  resetUser,
  changeUserNameAction
} from "~/store/user/actionCreators";

import { Row, Col, Affix, List, Upload, Button, Menu, Input, message } from "antd";
import { UploadOutlined, EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

import Notice from "~/components/profile/notice";
import Favorite from "~/components/profile/favorite";
import Author from "~/components/common/author";
import { ProfileWrapper } from "~/components/profile/style";
import { uploadAvatar } from "~/services/user";

function getUid(id) {
  const uid = 1000 + id;
  return `coder_${uid}`;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default memo(function Profile(props) {
  const router = useRouter();
  const { info } = router.query;
  const [ session, loading ] = useSession()

  const { userInfo, favoriteList } = useSelector(
    (state) => ({
      userInfo: state.getIn(["user", "userInfo"]),
      favoriteList: state.getIn(["user", "favoriteList"]),
    }),
    shallowEqual
  );
  const [current, setCurrent] = useState(...info);
  const [isEditName, setIsEditName] = useState(false)
  const [value, setValue] = useState(null)
  const [userImg, setUserImg] = useState(null)
  const [fileList, setFileList] = useState(null)

  const uploadRef = useRef()
  const buttonRef = useRef()

  useEffect(() => {
    setCurrent(...info);
  }, [info]);

  const dispatch = useDispatch();

  const menuClick = (e) => {
    router.push({
      pathname: "/profile/" + e.key,
    });
  }

  const clickSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const editClick = () => {
    setIsEditName(true)
  }

  const checkClick = () => {
    dispatch(changeUserNameAction(value))
    setIsEditName(false)
  }

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };


  const handleRequest = ({file}) => {
    const formData = new FormData();
    formData.append('files', file);
    uploadAvatar(formData).then(res => {
      if(res.isSuccess === true) {
        message.success("上傳成功")
        getBase64(file, imageUrl =>
          // console.log(imageUrl)
          setUserImg(imageUrl)
        );
        return true
      } else {
        message.error("上傳失敗")
        return false
      }
    })
  }

  return (
    <ProfileWrapper>
      <Head>
        <title>Coder Land - Profile</title>
      </Head>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          <div className="user">
            <div className="user-image">
              <div className="image-show">
                <img src={ userImg || userInfo?.avatarUrl} />
                <div className="img-hover">
                  <UploadOutlined />
                </div>
                <ImgCrop rotate>
                  <Upload
                    customRequest={handleRequest}
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onPreview={onPreview}
                    showUploadList={false}
                    className="image-upload"
                    maxCount={1}
                  />
                </ImgCrop>
              </div>
              
            </div>
            <div className="user-info">
              <div className="user-name">
                <span>暱稱:</span>
                { !isEditName? 
                  <>
                     <span>{userInfo.name}</span> <EditOutlined onClick={editClick} style={{ color: "blue" }} />
                  </>:
                  <>
                    <Input className="name-input" maxLength={10} onChange={e =>  setValue(e.target.value)} />
                    <CheckOutlined onClick={checkClick} />
                    <CloseOutlined onClick={e => setIsEditName(false)} />
                  </> 
                }
              </div>
              <div>uid: {getUid(userInfo.id)}</div>
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

export const getServerSideProps = async (props) => {
  const { info } = props?.params;
  const session = await getSession(props)

  if(!session) {
    return {
      redirect: {
        source: "/profile",
        destination: "/home",
        permanent: false,
      },
    }
  }

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
      session
    },
  };
};
