import styled from "styled-components";

export const DetailLabelsWrapper = styled.div`
  border-bottom: 1px solid #cbcbcb;
  .row {
    margin-bottom: 15px;
    display: flex;
    .labels {
      flex: 1;
    }

    .tools {
      display: flex;
      align-items: center;

      &>span {
        cursor: pointer;
      }
      .anticon {
        font-size: 2rem;
        margin-right: 1rem;
        color: rgba(117, 117, 117, 0.75);

      }
    }
  }

  .ant-tag {
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 13px;
    margin-bottom: 10px;
  }
`;
