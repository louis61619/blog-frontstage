import React, { memo } from "react";

import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
import DetailLabels from '~/components/detail/detail-labels'
import { DetailArticleWrapper } from "./style";

const DetailArticle = (props) => {

  const { article } = props

  return (
    <DetailArticleWrapper>
      <div className="detailed-title">
        { article.title }
      </div>
      <div className="detail-introduce">
        { article.introduce }
      </div>
      <div className="list-icon center">
        <span>
          <CalendarOutlined />
          2019-06-28
        </span>
      </div>

      {props.children}
    </DetailArticleWrapper>
  );
}

export default DetailArticle;