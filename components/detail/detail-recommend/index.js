import React, { memo, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { throttle } from 'lodash';
import { changeRecommendScrollTop } from "~/store/detail/actionCreaters";

import { List, Card } from "antd";
import { DetailRecommendWrapper } from "./style";


const { Meta } = Card;

function useThrottle(cb, delay) {
  const options = { leading: true, trailing: false }; // pass custom lodash options
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  );
}


export default memo(function DetailRecommend(props) {
  const { recommend } = props;
  const recommendRef = useRef();
  const {
    recommendScrollTop
  } = useSelector(state => ({
    recommendScrollTop: state.getIn(["detail", "recommendScrollTop"])
  }), shallowEqual)

  const dispatch = useDispatch()

  const handleScroll = () => {
    
    const dom = ReactDOM.findDOMNode(recommendRef.current);
    dispatch(changeRecommendScrollTop(dom.getBoundingClientRect().top))
  };

  // 或許可以想辦法做節流
  const invokeDebounced = useThrottle(
    handleScroll,
    100
  );

  useEffect(() => {
    window.addEventListener("scroll", invokeDebounced);
    return () => {
      window.removeEventListener("scroll", invokeDebounced);
    };
  }, []);

  return (
    <DetailRecommendWrapper ref={recommendRef}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={recommend || []}
        renderItem={(item) => (
          <Link href={`/detail/${item.id}`}>
            <a>
              <List.Item>
                <Card
                  cover={<img className="card-image" alt="card" src={item.images && JSON.parse(item.images)[0] || "/coding.jpeg"} />}
                >
                  <Meta title={item.title} description={item.introduce} />
                </Card>
              </List.Item>
            </a>
          </Link>
        )}
      />
    </DetailRecommendWrapper>
  );
});
