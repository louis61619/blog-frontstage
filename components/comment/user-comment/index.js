import React, {
  memo,
  Fragment,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  forwardRef,
  useCallback,
  useContext
} from "react";

import moment from "moment";
import { writeCommentReply, modifyComment, deleteComment } from "~/services/comment";
import { CommentContext } from '..'

import { EllipsisOutlined, MessageOutlined } from "@ant-design/icons";
import { Drawer, Button, Input, Avatar, Menu, Dropdown, message } from "antd";
import { UserCommentWrapper, ReplyWrapper } from "./style";

const { TextArea } = Input;


function ReplyArea(props) {

  const { 
    placeholder="你想要說什麼？", 
    reply, 
    value, 
    setValue, 
    showTextarea, 
    setShowTextArea 
  } = props

  return (
    <ReplyWrapper>
      <TextArea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        className="reply-text"
        autoSize={{ minRows: 3, maxRows: 5 }}
        bordered={false}
        showCount
        maxLength={100}
      />
      <div className="area-bottom">
        <Button onClick={(e) => setShowTextArea(false)} type="link">
          取消
        </Button>
        <Button type="primary" onClick={reply}>
          留言
        </Button>
      </div>
    </ReplyWrapper>
  );
}

const Comment = forwardRef((props, ref) => {

  const {
    userInfo,
    articleId,
    commentList,
    setCommentList
  } = useContext(CommentContext)
  const { id, user, content, commentId, createTime, updateTime } = props.item;

  const [modify, isModify] = useState(false);
  const [value, setValue] = useState(null);
  const [showTextarea, setShowTextArea] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      showTextarea,
    }),
    [showTextarea]
  );
  
  // 修改留言
  const reply = async () => {
    const res = await modifyComment(value, id);
    
    const newCommentList = commentList.map(item => {
      if(item.id === id) {
        const obj = {...item}
        obj.content = value;
        obj.updateTime = res.updateTime
        return obj
      } else {
        return item
      }
    })
    setCommentList(newCommentList)
    setValue(null);
    setShowTextArea(false);
  };

  const deleteAction = async () => {
    const res = await deleteComment(id);
    const newCommentList = [...commentList].filter(item => item.id !== id)
    setCommentList(newCommentList)
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={(e) => setShowTextArea(true)}>
        修改評論
      </Menu.Item>
      <Menu.Item key="1" onClick={(e) => deleteAction()}>刪除評論</Menu.Item>
    </Menu>
  );

  return (
    <div className="comment-item">
      {!showTextarea ? (
        <>
          <div className="top-user">
            <div className="user-avatar">
              <Avatar size={32} src={user.avatarUrl} />
            </div>
            <div className="user-info">
              <span>{user.name}</span>
              <span>{moment(updateTime).fromNow()}</span>
            </div>
            <div className="user-select">
              {props.item.user.id === userInfo?.id && (
                <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
                  <EllipsisOutlined />
                </Dropdown>
              )}
            </div>
          </div>
          <div className="content">{content}</div>
        </>
      ) : (
        <ReplyArea  placeholder={`修改留言`} 
                    reply={reply} 
                    value={value}
                    setValue={setValue}
                    setShowTextArea={setShowTextArea}/>
      )}
    </div>
  );
});

export default memo(function UserComment(props) {

  const {
    userInfo,
    articleId,
    commentList,
    setCommentList
  } = useContext(CommentContext)
  const { id, user, content, commentId, createTime } = props.item;

  const [value, setValue] = useState(null);
  const [showTextarea, setShowTextArea] = useState(false);
  const [showReply, setShowReply] = useState(true);
  const [bottomShow, setBottomShow] = useState(true)
  // const CommentRef = useRef();

  const CommentRef = useCallback(node => {
    if (node !== null) {
      setBottomShow(node.showTextarea)
    }
  }, []);

  // 第二層是有回覆評論這個屬性的留言
  const replyCommentList = commentList.filter((item) => {
    return item.commentId === id;
  });

  // 回覆留言
  const reply = async () => {
    const res = await writeCommentReply(articleId, value, id);
    const message = {
      commentId: id,
      content: value,
      createTime: res.createTime,
      id: res.insertId,
      user: {
        avatarUrl: userInfo.avatarUrl,
        id: userInfo.id,
        name: userInfo.name,
      },
    };
    console.log(message);
    setCommentList([message, ...commentList]);
    setValue(null);
    setShowTextArea(false);
    setShowReply(true);
  };

  return (
    <UserCommentWrapper>
      <Comment item={props.item} userInfo={userInfo} ref={CommentRef} />
      { !bottomShow && (
        <div className="bottom">
          <span
            onClick={(e) =>
              replyCommentList?.length && setShowReply(!showReply)
            }
          >
            <MessageOutlined className="icon" />{" "}
            {!showReply ? `${replyCommentList?.length}則回覆` : "收起"}
          </span>
          <div onClick={(e) => Object.keys(userInfo).length? setShowTextArea(true): message.warn('請先登錄')}>回覆</div>
        </div>
      )}
      {/* 第二層 */}
      <div className="second-floor">
        {showTextarea && (
          <ReplyArea  placeholder={`回覆${user.name}`} 
                      reply={reply} 
                      value={value}
                      setValue={setValue}
                      setShowTextArea={setShowTextArea}/>
        )}
        {showReply && (
          <div className="second-floor-comment">
            {replyCommentList.map((item) => {
              return <Comment key={item.id} item={item} userInfo={userInfo} />;
            })}
          </div>
        )}
      </div>
    </UserCommentWrapper>
  );
});
