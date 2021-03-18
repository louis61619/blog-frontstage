import React, { memo } from "react";

import marked from '~/utils/markdown-formate'

import { DetailMarkdownWrapper } from "./style";

export default memo(function DetailMarkdown(props) {

  let html = marked(props.markdown);

  return (
    <DetailMarkdownWrapper
      dangerouslySetInnerHTML={{ __html: html }}
    ></DetailMarkdownWrapper>
  );
});
