import React, { memo, useState } from "react";
import dynamic from 'next/dynamic'
import Head from "next/head";

import { getArticleList, getTopRecommned } from '~/services/home'

import { Row, Col, Affix } from "antd";

import List from '~/components/common/list'
import Author from '~/components/common/author'
import Advert from '~/components/common/advert'
// import HomeRecommend from '~/components/home/home-recommend'
import Scroll from '~/components/common/scroll'

import { HomeWrapper } from '../../components/home/style'

const HomeRecommend = dynamic(
  () => import('~/components/home/home-recommend'),
  { loading: () => <p>00000000</p> }
)


const Home = memo((props) => {
  const { recommendList, list: propsList, listCount } = props
  const [ list, setList ] = useState(propsList)

  return (
    <HomeWrapper>
      <Head>
        <title>Coder Land - Home</title>
      </Head>
      {/* <HomeRecommend list={recommendList}/> */}
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
  const res = await getArticleList();

  return {
    props: {
      recommendList: recommendList.data,
      list: res.data,
      listCount: res.count
    },
  };
};

export default Home;
