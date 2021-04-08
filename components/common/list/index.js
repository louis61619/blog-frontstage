import React, { Fragment, memo, useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import store from '~/store'

import { addFavorite } from '~/services/user'
import { useFavoriteList } from '~/utils/custom-hook'
import {
  getsUserInfoAction,
  addFavoriteAction,
  cancelFavoriteAction
} from '~/store/user/actionCreators'

import Link from "next/link";
import moment from "moment";
import marked from "~/utils/markdown-formate";

import {
  LikeOutlined,
  StarOutlined,
  TagsOutlined,
  BookFilled,
  BookOutlined,
} from "@ant-design/icons";
import { List, Space, Tag, message } from "antd";

import { ListWrapper } from "./style";


const ListItem = (props) => {
  const { item, userInfo } = props
  const [ isFavorite, clickFavorite ] = useFavoriteList(userInfo, item)

  return (
    <List.Item className="list-item">
    <Link href={{ pathname: "/detail", query: { id: item.id } }}>
      <a target="_blank">
        <div className="item-top">
          <p>{moment(item.releaseTime).format("YYYY-MM-DD")}</p>
          <h2 className="title">{item.title}</h2>
          <h4 className="introduce">{item.introduce}</h4>
          <div
            className="markdown-html"
            dangerouslySetInnerHTML={{
              __html: marked(item.context),
            }}
          />
        </div>
      </a>
    </Link>

    <div className="item-bottom">
      <span className="label">
        <TagsOutlined />
        {item.labels &&
          JSON.parse(item.labels).map((item) => {
            return (
              <Tag className="tag" key={item.id}>
                {item.name}
              </Tag>
            );
          })}
      </span>
      <span className="favorite" onClick={e => clickFavorite()}>
        {isFavorite ? <BookFilled /> : <BookOutlined /> }
        {/* <LikeOutlined /> */}
      </span>
    </div>
  </List.Item>
  )
}

const ArticleList = memo((props) => {
  const { list } = props;

  const {
    userSession,
    userInfo,
    test
  } = useSelector(state => ({
    userSession: state.getIn(["user", "userSession"]),
    userInfo: state.getIn(["user", "userInfo"]),
    test: state.getIn(["user", "test"])
  }), shallowEqual)
  // dispatch(getsUserInfoAction())

  return (
    <ListWrapper>
      <List
        itemLayout="vertical"
        dataSource={list}
        renderItem={(item) => (
          <ListItem item={item} userInfo={userInfo} />
        )}
      />
    </ListWrapper>
  );
});
export default ArticleList;
