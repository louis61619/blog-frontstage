import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Head from "next/head";
import { useRouter } from 'next/router'
import Link from 'next/link'

import { getArticleById, getStaticList } from "~/services/home";
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
      loading={!list && true}
      itemLayout="vertical"
      dataSource={list || []}
      renderItem={(item) => (
        <Link href={`/detail/${item.id}`}>
          <a>
            <List.Item
              className="list-item"
              extra={
                <img
                  className="img-center"
                  alt="logo"
                  src={
                    item.images
                      ? JSON.parse(item.images)[0]
                      : "/coding.jpeg"
                  }
                />
              }
            >
              <div className="left-item">
                <p>{moment(item.releaseTime).format("YYYY-MM-DD")}</p>
                <h2>{item.title}</h2>
                <h4>{item.introduce}</h4>
              </div>
            </List.Item>
          </a>
        </Link>
      )}
    />
  );
};


const Detail = memo((props) => {
  const { article } = props;
  const commentRef = useRef()
  const [container, setContainer] = useState(null);
  const [recommend, setRecommend] = useState(null)
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

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

  useEffect(async () => {
    const res = await getDetailRecommend()
    setRecommend(res.data)
  }, [article.id])

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

      <Row className="comm-main recommend" type="flex" justify="center">
        <Col xs={0} sm={0} md={23} lg={23} xl={18}>
          <DetailRecommend recommend={recommend} />
        </Col>
        <Col xs={23} sm={23} md={0} lg={0} xl={0}>
          {recommendList(recommend)}
        </Col>
      </Row>

      <Comment ref={commentRef} comments={JSON.parse(article.comments)} articleId={article.id} />
      

    </DetailWrapper>
  );
});

// export const getServerSideProps = async ({ params }) => {
//   const { id } = params;
//   const res = await getArticleById(id);
  
//   return {
//     props: {
//       article: res.data,
//     },
//   };
// };

export const getStaticPaths = async () => {
  const res = await getStaticList()

  const paths = res.data.map(item => ({
    params: { id: `${item.id}` },
  }))

  return { paths, fallback: true }
}

export const getStaticProps = async ({params}) => {

  const res = await getArticleById(params.id);

  return {
    props: {
      article: res.data,
    },
    revalidate: 1,
  }
}

export default Detail;
