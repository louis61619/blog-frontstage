import React, { memo, useState, useReducer } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { 
  ScrollWrapper,
  LoaderWrapper
} from './style'
import { useDispatch } from "react-redux";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default memo(function Scroll({ children, list, setList, changeFun, action }) {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch()

  const handleInfiniteOnLoad = async () => {

    setLoading(false)

    setTimeout(() => {
      changeFun(page * 2, 2).then(res => {
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
        initialLoad={false}
        loadMore={handleInfiniteOnLoad}
        hasMore={loading && hasMore}
        // useWindow={false}
        // loader={<LoaderWrapper key={0} className="loader"><Spin indicator={antIcon} /></LoaderWrapper>}
      >
        {children}
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
