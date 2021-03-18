import styled from "styled-components";

export const ListWrapper = styled.div`
  @media (max-width: 767px) {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .ant-list-item {
    border: none;
  }

  a {
    color: rgba(0, 0, 0, 0.85);
  }

  .list-item {
    max-width: 680px;
    margin-bottom: 50px;
    border-bottom: 1px solid #cbcbcb;
    .item-top {
      & > * {
        margin-bottom: 15px;
      }
      .title {
        font-size: 2rem;
        border-left: 4px solid rgb(156, 203, 250);
        padding-left: 1rem;
      }
      .introduce {
        color: rgba(117, 117, 117, 1);
        font-weight: 400;
      }
    }
    .item-bottom {
      display: flex;
      align-items: center;
      padding-top: 10px;
      .label {
        width: 100%;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        .anticon {
          margin-right: 5px;
        }
        .ant-tag {
          padding: 2px 5px;
        }
      }
      .favorite {
        font-size: 1.2rem;
        margin-right: 10px;
        cursor: pointer;
      }
    }

    .markdown-html {
      font-size: 1rem;
      opacity: 0.4;
      max-height: 500px;
      overflow: hidden;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 1)
        );
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        position: relative;
        margin-top: 1em;
        margin-bottom: 16px;
        font-weight: bold;
        line-height: 1.4;
      }
      ul {
        margin-bottom: 16px;
      }

      h1 {
        padding-bottom: 0.3em;
        font-size: 2.25em;
        line-height: 1.2;
        border-bottom: 1px solid #cbcbcb;
      }

      h2 {
        padding-bottom: 0.3em;
        font-size: 1.75em;
        line-height: 1.225;
        border-bottom: 1px solid #cbcbcb;
      }

      h3 {
        font-size: 1.5em;
        line-height: 1.43;
      }

      h4 {
        font-size: 1.25em;
      }

      p {
        margin-bottom: 16px;
      }

      pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #283646;
        color: #ccc;
        border: 0;
        border-radius: 3px;
      }
      pre > code {
        font-size: 100%;
        white-space: pre;
        background: transparent;
      }
      code {
        display: inline;
        max-width: initial;
        padding: 0;
        margin: 0;
        overflow: initial;
        line-height: inherit;
        word-wrap: normal;
        background-color: transparent;
        border: 0;
      }
      blockquote {
        border-left: 4px solid #cbcbcb;
        padding: 10px 10px 10px 30px;
        background-color: #f8f8f8;
      }

      img {
        /* max-height: 5vw; */
        max-width: 100%;
        object-fit: cover;
      }

      a {
        color: #4183c4;
        text-decoration: none;
        pointer-events: none;
      }
    }
  }
`;
