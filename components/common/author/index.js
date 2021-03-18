import React, { memo } from "react";

import { Avatar, Divider } from 'antd'
import {
  GithubOutlined,
  MediumOutlined,
  GooglePlusOutlined
} from '@ant-design/icons'
import {
  AuthorWrapper
} from './style'

export default memo(function Author() {

  const clickItem = () => {
    window.open("https://louis61619.medium.com/")
  }

  return (
    <AuthorWrapper>
      <div>
        {" "}
        <Avatar
          size={100}
          src="https://uploadfile.huiyi8.com/2014/0708/20140708052136980.jpg"
        />
      </div>
      <div className="author-introduction">
        生命不息，代碼不止
        <Divider>社交帳號</Divider>
        <a href="https://github.com/louis61619" target="_blank">
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
        </a>
        <Avatar size={28} icon={<MediumOutlined />} onClick={clickItem} className="account" />
        {/* <Avatar size={28} icon={<GooglePlusOutlined />} className="account" /> */}
      </div>
    </AuthorWrapper>
  );
});
