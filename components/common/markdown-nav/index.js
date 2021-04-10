import React, { memo, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";

import { MarkdownNavWrapper } from "./style";

export default memo(function MarkdownNav(props) {
  const markNavRef = useRef();
  const [isShow, setIsShow] = useState(true)

  const {
    recommendScrollTop
  } = useSelector(state => ({
    recommendScrollTop: state.getIn(["detail", "recommendScrollTop"])
  }), shallowEqual)

  const handleScroll = () => {
    const dom = ReactDOM.findDOMNode(markNavRef.current);
    // console.log("NAV" + dom.getBoundingClientRect().height);
    // console.log(recommendScrollTop)

    if(dom.getBoundingClientRect().height <= recommendScrollTop) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  };

  useEffect(() => {
    handleScroll()
  }, [recommendScrollTop]);

  return (
    <MarkdownNavWrapper isShow={isShow} color={"blue"}>
      <MarkNav
        ref={markNavRef}
        className="article-menu"
        updateHashAuto={false}
        source={"#title\n" + props.markdown}
        ordered={false}
      />
    </MarkdownNavWrapper>
  );
});
