import React, { memo, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import { getArticleList } from '~/services/home'
import { getLabels, getArticleByLabelId } from '~/services/article'


import { Row, Col, Affix } from "antd";

import List from '~/components/common/list'
import Author from '~/components/common/author'
import Advert from '~/components/common/advert'
import ArticleLabel from '~/components/article/article-label'
import Scroll from '~/components/common/scroll'

import { ArticleWrapper } from '../../components/article/style'

const Home = memo((props) => {
  const {list: propsList, labels} = props
  const router = useRouter()
  const { id } = router.query

  const [list, setList] = useState()
  const [changeFun, setChangeFun] = useState()

  useEffect(() => {
    setList(propsList)
    if(id?.length) {
      setChangeFun(() => {
        return async (offset, size) => await getArticleByLabelId(id[0], offset, size)
      })
    } else {
      setChangeFun(() => {
        return getArticleList
      });
    }
  }, [propsList])

  return (
    <ArticleWrapper>
      <Head>
        <title>Coder Land - List</title>
      </Head>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          <ArticleLabel labels={labels} />
          <Scroll list={list} setList={setList} changeFun={changeFun}>
            <List list={list}/>
          </Scroll>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={6}>
          <Affix offsetTop={5}>
            <Author />
          </Affix>
        </Col>
      </Row>
    </ArticleWrapper>
  );
});


export const getServerSideProps = async ({query}) => {
  const {id} = query
  let list
  if(id) {
    list = await getArticleByLabelId(id)
  } else {
    list = await getArticleList();
  }
  const labels = await getLabels()
  return {
    props: {
      list: list.data,
      labels: labels.data,
    },
  };
};

export default Home;
