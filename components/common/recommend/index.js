import React, { Fragment, memo, useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import moment from "moment";
import marked from "~/utils/markdown-formate";

import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  TagsOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { List, Space, Tag, Row, Col } from "antd";

import { RecommendWrapper } from "./style";


const Recommend = memo((props) => {
  const { list } = props;
  const [firstItem, setFirstItem] = useState(
    list.filter((item, index) => {
      return index === 0;
    })[0]
  );
  const [myList, setMyList] = useState(
    list.filter((item, index) => {
      return index !== 0;
    })
  );

  return (
    <RecommendWrapper>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={13} lg={14} xl={10}>
          <div className="first-item">
            <div>
              <Image layout='fill' src={JSON.parse(firstItem.images)[0]} />
            </div>
            <div className="left-item">
              <p>{moment(firstItem.releaseTime).format("YYYY-MM-DD")}</p>
              <h3>{firstItem.title}</h3>
              <h4>{firstItem.introduce}</h4>
              <div>
                <span>
                  <TagsOutlined />
                  {firstItem.labels &&
                    JSON.parse(firstItem.labels).map((item) => {
                      return <Tag key={item.id}>{item.name}</Tag>;
                    })}
                </span>
                <span>
                  {/* <FolderAddOutlined /> */}
                  {/* <LikeOutlined /> */}
                </span>
              </div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={10} lg={9} xl={8}>
          <List
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <Link href={{ pathname: "/detail", query: { id: item.id } }}>
                <a>
                  <List.Item
                    className="list-item"
                    extra={
                      <Image
                        width="100"
                        height="100"
                        style={{ objectFit: "cover" }}
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
                      <h3>{item.title}</h3>
                      {/* <h4>{item.introduce}</h4> */}
                      <div>
                        <span>
                          <TagsOutlined />
                          {item.labels &&
                            JSON.parse(item.labels).map((item) => {
                              return <Tag key={item.id}>{item.name}</Tag>;
                            })}
                        </span>
                        <span>
                          {/* <FolderAddOutlined /> */}
                          {/* <LikeOutlined /> */}
                        </span>
                      </div>
                    </div>
                  </List.Item>
                </a>
              </Link>
            )}
          />
        </Col>

        <Col className="comm-right" xs={23} sm={23} md={0} lg={0} xl={0}>
        <List
        itemLayout="vertical"
        dataSource={list}
        renderItem={(item) => (
          <Link href={{ pathname: "/detail", query: { id: item.id } }}>
            <a>
              <List.Item
              className="list-item"
                extra={
                  <Image
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
                  <div>
                    <span>
                      <TagsOutlined />
                      {item.labels &&
                        JSON.parse(item.labels).map((item) => {
                          return <Tag key={item.id}>{item.name}</Tag>;
                        })}
                    </span>
                    <span>
                      {/* <FolderAddOutlined /> */}
                      {/* <LikeOutlined /> */}
                    </span>
                  </div>
                </div>
              </List.Item>
            </a>
          </Link>
        )}
      />
        </Col>
      </Row>
    </RecommendWrapper>
  );
});
export default Recommend;
