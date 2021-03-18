import React, { memo, Fragment, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import Link from "next/link";
import moment from "moment";
import marked from "~/utils/markdown-formate";

import { DeleteOutlined } from "@ant-design/icons";
import { List, Space, Tag, Row, Col } from "antd";
import { FavoriteWrapper } from "./style";
import { cancelFavoriteAction, getFavoriteListAction } from "~/store/user/actionCreators";

export default memo(function Favorite(props) {
  const {
    userInfo,
    favoriteList,
  } = useSelector(state => ({
    userInfo: state.getIn(["user", "userInfo"]),
    favoriteList: state.getIn(["user", "favoriteList"])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    if(Object.keys(userInfo).length !== 0) {
      dispatch(getFavoriteListAction())
    }
  }, [userInfo])

  const cancelFavorite = (id) => {
    console.log("刪除"+ id)
    dispatch(cancelFavoriteAction(id, true))
  };

  return (
    <FavoriteWrapper>
      <List
        itemLayout="vertical"
        dataSource={favoriteList}
        renderItem={(item) => (
          <List.Item
            className="list-item"
            extra={
              <img
                className="img-right"
                alt="logo"
                src={
                  item.images
                    ? JSON.parse(item.images)[0]
                    : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                }
              />
            }
          >
            <Link href={{ pathname: "/detail", query: { id: item.id } }}>
              <a>
                <div className="left-item">
                  <p>{moment(item.releaseTime).format("YYYY-MM-DD")}</p>
                  <h3 className="title">{item.title}</h3>
                  <h4 className="introduce">{item.introduce}</h4>
                </div>
              </a>
            </Link>
            <div className="delete" onClick={ e => cancelFavorite(item.id)}>
              <DeleteOutlined />
              刪除
            </div>
          </List.Item>
        )}
      />
    </FavoriteWrapper>
  );
});
