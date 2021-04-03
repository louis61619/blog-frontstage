import React, { memo, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import Image from 'next/image'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import throttle from 'lodash/throttle'
import { changeRecommendScrollTop } from "~/store/detail/actionCreaters";

import { List, Card } from "antd";
import { DetailRecommendWrapper } from "./style";


const { Meta } = Card;


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
    // 或許可以想辦法做節流
    const dom = ReactDOM.findDOMNode(recommendRef.current);
    dispatch(changeRecommendScrollTop(dom.getBoundingClientRect().top))
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll );
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <DetailRecommendWrapper ref={recommendRef}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={recommend}
        renderItem={(item) => (
          <Link href={{ pathname: "/detail", query: { id: item.id } }}>
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
