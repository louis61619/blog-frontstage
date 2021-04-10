import React, { memo } from "react";
import Link from "next/link";

import { Tag } from "antd";
import { ArticleLabelWrapper } from "./style";

export default memo(function ArticleLabel(props) {
  return (
    <ArticleLabelWrapper>
      <Link href="/article">
        <a>
          <Tag>全部</Tag>
        </a>
      </Link>
      {props.labels.map((item) => {
        return (
          <Link key={item.id} href={{
            pathname: '/article',
            query: { id: item.id },
          }}>
            <a>
              <Tag>
                {item.name} ({item.articles})
              </Tag>
            </a>
          </Link>
        );
      })}
    </ArticleLabelWrapper>
  );
});
