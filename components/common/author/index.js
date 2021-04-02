import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Avatar, Divider, message } from 'antd'
import {
  GithubOutlined,
  MediumOutlined,
  GooglePlusOutlined,
  MailOutlined
} from '@ant-design/icons'
import {
  AuthorWrapper
} from './style'

export default memo(function Author() {

  const {
    adminInfo
  } = useSelector(state => ({
    adminInfo: state.getIn(["admin", "adminInfo"])
  }), shallowEqual)

  const clickItem = () => {
    var dummy = document.createElement('input')
    document.body.appendChild(dummy);
    dummy.value = adminInfo.email;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    message.success('複製email地址成功')
  }

  return (
    <AuthorWrapper>
      <div>
        {" "}
        <Avatar
          size={100}
          src={adminInfo?.avatarUrl}
        />
      </div>
      <div className="author-introduction">
        { adminInfo?.slogan }
        <Divider>社交帳號</Divider>
        { adminInfo?.github && 
          <a href={adminInfo?.github} target="_blank">
            <Avatar size={28} icon={<GithubOutlined />} className="account" />
          </a>
        }
        { adminInfo?.medium && 
          <a href={adminInfo?.medium} target="_blank">
            <Avatar size={28} icon={<MediumOutlined />} className="account" />
          </a>
        }
        { adminInfo?.email && 
          <Avatar size={28} icon={<MailOutlined />} onClick={clickItem} className="account" />
        }
      </div>
    </AuthorWrapper>
  );
});
