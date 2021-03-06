import React, { memo, useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getArticleList } from "~/services/home";
import { getLabels, getArticleByLabelId } from "~/services/article";

import { Row, Col, Affix } from "antd";

import List from "~/components/common/list";
import Author from "~/components/common/author";
import Advert from "~/components/common/advert";
import ArticleLabel from "~/components/article/article-label";
import Scroll from "~/components/common/scroll";

import { ArticleWrapper } from "../../components/article/style";
import { use } from "marked";

const Article = memo((props) => {

  const router = useRouter();
  const scrollRef = useRef();
  const { id } = router.query;

  const [list, setList] = useState([]);
  const [changeFun, setChangeFun] = useState(null);
  const [labels, setLabels] = useState([])
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    if(router.isReady) {
      scrollRef.current.reset()
      if (id) {
        setChangeFun(() => {
          return async (offset, size) =>
            await getArticleByLabelId(id, offset, size);
        });
      } else {
        setChangeFun(() => {
          return getArticleList;
        });
      }
    }
  }, [router])

  useEffect(() => {
    getLabels().then(res => {
      setLabels(res.data)
    })
  }, [])

  return (
    <ArticleWrapper>
      <Head>
        <title>Article</title>
      </Head>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          <ArticleLabel labels={labels} />
          <Scroll
            list={list}
            setList={setList}
            changeFun={changeFun}
            ref={scrollRef}
          >
            <List list={list} />
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


export default Article;
