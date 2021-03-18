import React, { Fragment, memo, useState } from "react";

import Link from "next/link";
import moment from "moment";
import marked from "~/utils/markdown-formate";

import {
  FolderOutlined,
  LikeOutlined,
  StarOutlined,
  TagsOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { List, Space, Tag, Row, Col } from "antd";

import { HomeRecommendWrapper } from "./style";

const HomeRecommend = memo((props) => {
  const { list } = props;

  const [firstItem, setFirstItem] = useState(
    list.filter((item, index) => {
      return index === 0;
    })[0]
  );

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
                    className="img-right"
                    // className={list.length !== 4 ? "img-center" : "img-right"}
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
                  <h3>{item.title}</h3>
                  <h4 className="introduce">{item.introduce}</h4>
                  {/* {list.length !== 4 && <h4>{item.introduce}</h4>} */}
                  {/* <div>
                    <span>
                      <TagsOutlined />
                      {item.labels &&
                        JSON.parse(item.labels).map((item) => {
                          return <Tag key={item.id}>{item.name}</Tag>;
                        })}
                    </span>
                    <span>
                      <FolderAddOutlined />
                      <LikeOutlined />
                    </span>
                  </div> */}
                </div>
              </List.Item>
            </a>
          </Link>
        )}
      />
    );
  };

  return (
    <HomeRecommendWrapper>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={13} lg={14} xl={10}>
          <Link href={{ pathname: "/detail", query: { id: firstItem.id } }}>
            <a>
              <div className="first-item">
                <div>
                  <img src={JSON.parse(firstItem.images)[0]}></img>
                </div>
                <div className="left-item">
                  <p>{moment(firstItem.releaseTime).format("YYYY-MM-DD")}</p>
                  <h2>{firstItem.title}</h2>
                  <h4>{firstItem.introduce}</h4>
                  {/* <div>
                    <span>
                      <TagsOutlined />
                      {firstItem.labels &&
                        JSON.parse(firstItem.labels).map((item) => {
                          return <Tag key={item.id}>{item.name}</Tag>;
                        })}
                    </span>
                    <span>
                      <FolderAddOutlined />
                      <LikeOutlined />
                    </span>
                  </div> */}
                </div>
              </div>
            </a>
          </Link>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={10} lg={9} xl={8}>
          {recommendList(
            list.filter((item, index) => {
              return index !== 0;
            })
          )}
        </Col>

        <Col className="comm-right" xs={23} sm={23} md={0} lg={0} xl={0}>
          {recommendList(list)}
        </Col>
      </Row>
    </HomeRecommendWrapper>
  );
});
export default HomeRecommend;
