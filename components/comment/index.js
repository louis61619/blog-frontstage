import React, { memo, useState, forwardRef, useImperativeHandle, useEffect, createContext } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { Drawer, Button, Input, Avatar, Menu, Dropdown } from "antd";

import CommentArea from "./comment-area";
import UserComment from "./user-comment";

import { CommentWrapper } from "./style";

export const CommentContext = createContext();

export default memo(
  forwardRef(function Comment(props, ref) {
    const { comments, articleId } = props;
    const [visible, setVisible] = useState(false);
    const [commentList, setCommentList] = useState([])
    const { userInfo, adminInfo } = useSelector(
      (state) => ({
        userInfo: state.getIn(["user", "userInfo"]),
        adminInfo: state.getIn(["admin", "adminInfo"])
      }),
      shallowEqual
    );

    useEffect(() => {
      const arr = comments && [...comments].sort(function (a, b) {
        return a.updateTime < b.updateTime ? 1 : -1;
       })
       setCommentList(arr || [])
    }, [comments, setCommentList])

    useImperativeHandle(ref, () => ({
      showDrawer,
    }));

    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };

    return (
      <Drawer
        title="留言"
        placement="right"
        className="comment-drawer"
        onClose={onClose}
        visible={visible}
      >
        <CommentWrapper>
          <CommentContext.Provider value={{userInfo, adminInfo, articleId, commentList, setCommentList}}>
          <CommentArea />
          {/* 第一層就是沒有回覆評論這個屬性的留言 */}
          {commentList &&
            commentList.filter(item => item.commentId === null).map((item) => {
              return <UserComment key={item.id} 
                                  item={item} 
                                  />;
            })}
          </CommentContext.Provider>
          
        </CommentWrapper>
      </Drawer>
    );
  })
);
