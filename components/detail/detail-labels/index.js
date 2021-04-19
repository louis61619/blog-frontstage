import React, { memo, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { MessageOutlined, BookOutlined, MessageFilled, BookFilled } from "@ant-design/icons";
import { Tag } from "antd";
import { DetailLabelsWrapper } from "./style";

import { useCheckLogin } from "~/utils/custom-hook";
import { useFavoriteList } from '~/utils/custom-hook'

export default memo(function DetailLabels(props) {

  const router = useRouter();

  const { labels, commentRef } = props
  const { id: articleId } = router?.query

  const [isLogin, userInfo] = useCheckLogin()
  const [ isFavorite, clickFavorite ] = useFavoriteList(Number(articleId))

  return (
    <DetailLabelsWrapper>
      <div className="row">
        <div className="labels">
          {labels.map((item) => {
            return (
              <Link
                key={item.id}
                href={{
                  pathname: '/article',
                  query: {
                    id: item.id
                  }
                }}
              >
                <a>
                  <Tag>{item.name}</Tag>
                </a>
              </Link>
            );
          })}
        </div>
        <div className="tools">
          <span>
            <MessageFilled onClick={e => commentRef.current.showDrawer()} />
          </span>
          <span onClick={e => clickFavorite()}>
            { isFavorite ? <BookFilled /> : <BookOutlined /> } 
          </span>
        </div>
      </div>
    </DetailLabelsWrapper>
  );
});
