import React, { memo, useState } from "react";

import { getArticleList, getTopRecommned } from '~/services/home'

import Head from "next/head";
import { Row, Col, Affix } from "antd";

import List from '~/components/common/list'
import Author from '~/components/common/author'
import Advert from '~/components/common/advert'
import HomeRecommend from '~/components/home/home-recommend'

import { HomeWrapper } from '../../components/home/style'

const Home = memo((props) => {
  const { recommendList, list } = props

  return (
    <HomeWrapper>
      <Head>
        <title>Home</title>
      </Head>
      <HomeRecommend list={recommendList}/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          <List list={list}/>
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

export const getServerSideProps = async () => {
  const recommendList = await getTopRecommned()
  const res = await getArticleList();
  return {
    props: {
      recommendList: recommendList.data,
      list: res.data,
    },
  };
};

export default Home;
