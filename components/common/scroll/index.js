import React, { memo, useState, useReducer, useEffect, forwardRef, useCallback, useImperativeHandle } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { 
  ScrollWrapper,
  LoaderWrapper
} from './style'
import { useDispatch } from "react-redux";
import { useCheckLogin } from "~/utils/custom-hook";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default memo(forwardRef(function Scroll({ children, list, setList, changeFun, checkLogin }, ref) {
  // const [firstLoad, setFirstLoad] = useState(false)
  const [firstLogin, setFirstLogin] = useState(false)
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch()

  const [isLogin, userInfo] = useCheckLogin()

  useImperativeHandle(ref, () => ({
    reset: () => {
      // console.log('重置')
      setPage(0)
      setList([])
      setFirstLogin(true)
      setLoading(true)
      setHasMore(true)
    } 
  }))

  useEffect(() => {
    // 初次加載鑑定權限 如果未傳入checkLogin就直接繼續 有的話則要等待isLogin為true
    if(!checkLogin) {
      return setFirstLogin(true)
    }
    isLogin && setFirstLogin(true)
  }, [isLogin])


  const handleInfiniteOnLoad = async () => {
    // if(!changeFun) return
    setLoading(false)
    // setTimeout(() => {
    changeFun && changeFun(page * 1, 1).then(res => {
      if(res.data.length === 0) {
        setHasMore(false)
      }
      setList && setList([...list, ...res.data])
      setPage(page + 1)
      setLoading(true)
    })
    // }, 300)
  };

  // if(!changeFun) return null

  return (
    <ScrollWrapper>
      <InfiniteScroll
        pageStart={0}
        initialLoad={true}
        loadMore={handleInfiniteOnLoad}
        hasMore={ firstLogin && loading && hasMore }
        // useWindow={false}
        // loader={<LoaderWrapper key={0} className="loader"><Spin indicator={antIcon} /></LoaderWrapper>}
      >
        { page? children: null}
        <LoaderWrapper key={0} className="loader">
          { !loading ? 
            <Spin indicator={antIcon} />:
            <span></span>
          }
        </LoaderWrapper>
      </InfiniteScroll>
    </ScrollWrapper>
  );
}));
