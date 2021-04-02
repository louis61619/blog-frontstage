import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Head from "next/head";
import Link from 'next/link'

import { getArticleById, getArticleList } from "~/services/home";
import { getDetailRecommend } from '~/services/article'
import marked from "~/utils/markdown-formate";
import moment from 'moment'

import { Row, Col, Affix, Card, List, Drawer } from "antd";

import Author from "~/components/common/author";
import Advert from "~/components/common/advert";
import Comment from '~/components/comment'
import MarkdownNav from "~/components/common/markdown-nav";

import DetailArticle from "~/components/detail/detail-article";
import DetailMarkdown from "~/components/detail//detail-markdown";
import DetailLabels from "~/components/detail/detail-labels";
import DetailRecommend from '~/components/detail/detail-recommend'

import { DetailWrapper } from '~/components/detail/style'
import { changeCheckDetail } from "~/store/detail/actionCreaters";

const recommendList = (list) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item) => (
        <Link href={{ pathname: "/detail", query: { id: item.id } }}>
          <a>
            <List.Item
              className="list-item"
              extra={
                <img
                  className={list.length !== 4 ? "img-center" : "img-right"}
                  alt="logo"
                  src={
                    item.images
                      ? JSON.parse(item.images)[0]
                      : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  }
                />
              }
            >
              <div className="left-item">
                <p>{moment(item.releaseTime).format("YYYY-MM-DD")}</p>
                <h2>{item.title}</h2>
                {list.length !== 4 && <h4>{item.introduce}</h4>}
              </div>
            </List.Item>
          </a>
        </Link>
      )}
    />
  );
};


const Detail = memo((props) => {
  const { article, recommend } = props;
  const commentRef = useRef()
  const [container, setContainer] = useState(null);

  const {
    checkDetail
  } = useSelector(state => ({
    checkDetail: state.getIn(["detail", "checkDetail"])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    if(Object.keys(checkDetail).length !== 0) {
      commentRef.current.showDrawer()
      dispatch(changeCheckDetail({}))
    }
  }, [checkDetail])

  return (
    <DetailWrapper>
      <Head>
        <title>{article.title}</title>
      </Head>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={16} lg={18} xl={14}>
          <DetailArticle article={article}>
            <DetailMarkdown markdown={article.context} />
            <DetailLabels labels={JSON.parse(article.labels)} commentRef={commentRef} />
          </DetailArticle>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <MarkdownNav markdown={article.context} />
          </Affix>
        </Col>
      </Row>

      <Row className="comm-main" type="flex" justify="center">
        <Col xs={0} sm={0} md={23} lg={23} xl={18}>
          <DetailRecommend recommend={recommend} />
        </Col>
        <Col className="comm-right" xs={23} sm={23} md={0} lg={0} xl={0}>
          {recommendList(recommend)}
        </Col>
      </Row>

      <Comment ref={commentRef} comments={JSON.parse(article.comments)} articleId={article.id} />
      

    </DetailWrapper>
  );
});

export const getServerSideProps = async ({ query }) => {
  const { id } = query;
  const res = await getArticleById(id);
  const recommend = await getDetailRecommend()
  return {
    props: {
      article: res.data,
      recommend: recommend.data
    },
  };
};

export default Detail;
