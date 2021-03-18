import React, { memo, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getNoticeListAction } from '~/store/user/actionCreators'
import { changeCheckDetail } from '~/store/detail/actionCreaters'

import { List, Button } from 'antd'
import { NoticeWrapper } from './style'


export default memo(function Notice() {

  const {
    userInfo,
    noticeList
  } = useSelector(state => ({
    userInfo: state.getIn(["user", "userInfo"]),
    noticeList: state.getIn(["user", "noticeList"])
  }), shallowEqual)

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if(Object.keys(userInfo).length !== 0) {
      dispatch(getNoticeListAction())
    }
  }, [userInfo])

  const checkDetail = useCallback((item) => {
    dispatch(changeCheckDetail(item))
    router.push({
      pathname: "/detail",
      query: {
        id: item.articleId
      }
    })
  })
  

  return (
    <NoticeWrapper>
      <List
        itemLayout="vertical"
        dataSource={noticeList}
        renderItem={(item) => (
          <List.Item
            className="list-item"
          >
            <h2>{item.content}</h2>
            <span onClick={ e => checkDetail(item)}>查看詳情</span>
          </List.Item>
        )}
      />
    </NoticeWrapper>
  )
})
