import React, { memo, useState, useReducer, useEffect } from "react";
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

export default memo(function Scroll({ children, list, setList, changeFun, checkLogin }) {
  const [firstLoad, setFirstLoad] = useState(false)
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch()

  const [isLogin, userInfo] = useCheckLogin()

  useEffect(() => {
    // 初次加載鑑定權限
    if(!checkLogin) {
      return setFirstLoad(true)
    }
    isLogin && setFirstLoad(true)
  }, [isLogin])

  const handleInfiniteOnLoad = async () => {
    setLoading(false)

    setTimeout(() => {
      changeFun(page * 1, 1).then(res => {
        if(res.data.length === 0) {
          setHasMore(false)
        }
        setList && setList([...list, ...res.data])
        setPage(page + 1)
        setLoading(true)
      })
    }, 300)
  };

  return (
    <ScrollWrapper>
      <InfiniteScroll
        pageStart={0}
        // initialLoad={false}
        loadMore={handleInfiniteOnLoad}
        hasMore={ firstLoad && loading && hasMore }
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
});
