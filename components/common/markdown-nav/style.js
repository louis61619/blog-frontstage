import styled from 'styled-components'

const test = "none"

export const MarkdownNavWrapper = styled.div`
  visibility: ${ props => {
    if(props.isShow) {
      return "visible"
    } else {
      return "hidden"
    }
  }};

  .nav-title{
    text-align: center;
    color: #888;
    border-bottom: 1px solid rgb(30, 144, 255);
  }

  .article-menu{
    font-size:14px;

    .title-anchor {
      font-size: 14px;
    }
  }

`