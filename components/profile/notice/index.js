import React, { memo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getNoticeListAction } from "~/store/user/actionCreators";
import { changeCheckDetail } from "~/store/detail/actionCreaters";

import { List, Button, Result } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import Scroll from "~/components/common/scroll";

import { NoticeWrapper } from "./style";

export default memo(function Notice() {
  const { userInfo, noticeList } = useSelector(
    (state) => ({
      userInfo: state.getIn(["user", "userInfo"]),
      noticeList: state.getIn(["user", "noticeList"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   if (Object.keys(userInfo).length !== 0) {
  //     dispatch(getNoticeListAction());
  //   }
  // }, [userInfo]);

  const checkDetail = useCallback((item) => {
    dispatch(changeCheckDetail(item));
    router.push({
      pathname: `/detail/${item.articleId}`,
    });
  });

  return (
    <NoticeWrapper>
      {userInfo?.block === 1 ? (
        <Result
          status="error"
          title="留言功能已被禁用"
          subTitle="可能是因為您操作不當導致部分功能停用，請聯繫博主"
        />
      ) : (
        <Scroll changeFun={async (offset, size) => await dispatch(getNoticeListAction(offset, size))} 
                checkLogin={true}>
          <List
            itemLayout="vertical"
            dataSource={noticeList}
            renderItem={(item) => (
              <List.Item className="list-item">
                <div className="main-content">
                  <div className="title">你說 : </div>
                  <div>{item.mainContent}</div>
                </div>
                <h4 className="child-content">
                  <ArrowRightOutlined className="icon" />
                  {item.content}
                </h4>
                <span className="button" onClick={(e) => checkDetail(item)}>
                  查看詳情
                </span>
              </List.Item>
            )}
          />
        </Scroll>
      )}
    </NoticeWrapper>
  );
});
