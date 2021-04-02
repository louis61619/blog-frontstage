import styled from "styled-components";

export const NoticeWrapper = styled.div`
  .list-item {
    padding: 1rem 1rem;

    .main-content {
      width: 100%;
      border: 1px solid rgba(230, 230, 230, 1);
      box-shadow: 0 1px 4px rgb(230 230 230);
      padding: 16px 16px;

      .title {
        margin-bottom:8px;
      }
    }

    .child-content {
      margin: 10px 0;
      .icon {
        margin-right: 8px;
      }
    }

    .button {
      cursor: pointer;
      font-size: 14px;
      color: #999;
      margin-left: 20px;
    }

    h2 {
      margin-bottom: 10px;
    }
    
  }
`