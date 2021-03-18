import React, { memo, useEffect } from "react";

import Link from "next/link";

import { MessageOutlined, BookOutlined, MessageFilled } from "@ant-design/icons";
import { Tag } from "antd";
import { DetailLabelsWrapper } from "./style";

export default memo(function DetailLabels(props) {

  const { labels, commentRef } = props

  return (
    <DetailLabelsWrapper>
      <div className="row">
        <div className="labels">
          {labels.map((item) => {
            return (
              <Link
                key={item.id}
                href="/article/[id]"
                as={`/article/${item.id}`}
              >
                <a>
                  <Tag>{item.name}</Tag>
                </a>
              </Link>
            );
          })}
        </div>
        <div className="tools">
          <MessageFilled onClick={e => commentRef.current.showDrawer()} />
          {/* <MessageFilled /> */}
          <BookOutlined />
        </div>
      </div>
    </DetailLabelsWrapper>
  );
});
