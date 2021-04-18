import styled from "styled-components";

export const ArticleLabelWrapper = styled.div`
  margin-bottom: 20px;
  max-width: 680px;

  @media (max-width: 767px) {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  
  .labels-area {
    display: flex;
    flex-wrap: wrap;
    .ant-tag {
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 13px;
      margin-bottom: 10px;
    }
  }

  .unfold {
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* width: 55px; */
    padding: 5px 10px;
    margin-bottom: 10px;
    font-size: 13px;
    color: rgba(117,117,117,1);
    cursor: pointer;
  }
`;
