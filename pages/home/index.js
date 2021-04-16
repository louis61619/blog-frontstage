import React, { memo, useState } from "react";
import dynamic from 'next/dynamic'
import Head from "next/head";

import { getArticleList, getTopRecommned } from '~/services/home'

import { Row, Col, Affix } from "antd";

import List from '~/components/common/list'
import Author from '~/components/common/author'
import Advert from '~/components/common/advert'
import HomeRecommend from '~/components/home/home-recommend'
import Scroll from '~/components/common/scroll'

import { HomeWrapper } from '../../components/home/style'

const Home = memo((props) => {
  const { recommendList } = props
  const [ list, setList ] = useState([])

  return (
    <HomeWrapper>
      <Head>
        <title>Coder Land</title>
      </Head>
      <HomeRecommend list={recommendList} />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          <Scroll list={list} setList={setList} changeFun={getArticleList}>
            <List list={list} />
          </Scroll>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={6}>
          <Affix offsetTop={5}>
            <Author />
          </Affix>
        </Col>
      </Row>
    </HomeWrapper>
  );
});


export const getStaticProps = async () => {
  const recommendList = await getTopRecommned()
  return {
    props: {
      recommendList: recommendList.data,
    },
    revalidate: 1,
  };
};

export default Home;
