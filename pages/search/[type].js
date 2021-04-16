import React, { memo, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

import { Row, Col, Affix, Menu } from "antd";

import { SearchWrapper } from "~/components/search/style";

export default memo(function Search() {

  
  const [current, setCurrent] = useState('title')
  const [isFocus, setIsFocus] = useState(false)

  const router = useRouter()
  const { query } = router
  
  useEffect(() => {
    const {type} = query
    console.log(type)
    setCurrent(type)
  }, [router])

  const menuClick = (e) => {
    router.push({
      pathname: "/search/" + e.key,
    });
  }

  const enterKeyword = event => {
    const { keyCode } = event;
    if ( isFocus && keyCode === 13 ) {
      console.log('----')
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", enterKeyword);
    return () => {
      document.removeEventListener("keydown", enterKeyword);
    };
  }, [enterKeyword]);

  return (
    <SearchWrapper>
      <Head>
        <title>Search</title>
      </Head>
      <Row className="comm-main" type="flex" justify="center">
        <Col xs={23} sm={23} md={23} lg={23} xl={18}>
          <div className="search-form" onFocus={e => setIsFocus(true)} onBlur={e => setIsFocus(false)}>
            <input type="search" placeholder="Search Blog" />
          </div>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          <div className="comm-menu">
          <Menu mode="horizontal" onClick={menuClick} selectedKeys={[current]}>
            <Menu.Item key="title">title</Menu.Item>
            <Menu.Item key="tags">tags</Menu.Item>
          </Menu>
          </div>
          
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={6}>
          <Affix offsetTop={5}>
            <div>111</div>
          </Affix>
        </Col>
      </Row>
    </SearchWrapper>
  );
});

export const getStaticPaths = () => {
  
  return {
    paths: [{ params: { type: 'title' } }, { params: { type: 'tags' } }],
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const { type } = params

  return {
    props: {
      type,
    },
  };
};