import React, { memo, Fragment, useState, useContext, useEffect } from "react";
import {
  writeComment
} from '~/services/comment'
import { changeLoginModelStatus } from '~/store/user/actionCreators'
import { useDispatch } from 'react-redux'

import { Button, Input, Avatar, message } from "antd";
import { CommentAreaWrapper } from "./style";
import { CommentContext } from "..";

const { TextArea } = Input;

export default memo(function CommentArea(props) {

  const {
    userInfo,
    articleId,
    commentList,
    setCommentList
  } = useContext(CommentContext)

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null)

  const dispatch = useDispatch()

  const focusArea = (e) => {
    e.preventDefault();
    Object.keys(userInfo).length ? setIsFocus(true) : dispatch(changeLoginModelStatus(true))
  };

  const leaveMessage = async () => {
    const res = await writeComment(articleId, value)
    if(res.isSuccess !== true) return message.warn(res.data)
    const newComment = {
      commentId: null,
      content: value,
      createTime: res.createTime,
      id: res.insertId,
      user: {
        avatarUrl: userInfo.avatarUrl,
        id: userInfo.id,
        name: userInfo.name,
      }
    }
    // console.log(commentList)
    setCommentList([newComment, ...commentList])
    setValue(null);
    setIsFocus(false);
  }

  return (
    <>
      {isFocus ? (
        <CommentAreaWrapper>
          <div className="top-user">
            <div className="user-avatar">
              <Avatar size={32} src={userInfo.avatarUrl} />
            </div>
            <div className="user-info">
              <span>{userInfo.name}</span>
            </div>
          </div>

          <TextArea
            value={value}
            onChange={e => setValue(e.target.value)}
            onPressEnter={leaveMessage}
            spellCheck="false"
            placeholder="你想要說什麼？"
            className="reply-text"
            autoSize={{ minRows: 3, maxRows: 5 }}
            bordered={false}
            showCount
            maxLength={250}
          />
          <div className="area-bottom">
            <Button onClick={leaveMessage} type="primary">留言</Button>
          </div>
        </CommentAreaWrapper>
      ) : (
        <TextArea
          className="text-area"
          placeholder="你想要說什麼？"
          onMouseDown={e => focusArea(e)}
          value={null}
          autoSize
        />
      )}
    </>
  );
});
