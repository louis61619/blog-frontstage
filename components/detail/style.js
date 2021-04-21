import styled from "styled-components";

export const DetailWrapper = styled.div`
  .recommend {
    margin-top: 80px;
  }

  .list-item {
    padding-right: 1rem;
    padding-left: 1rem;
    margin-bottom: 10px;
    min-height: 150px;

    .ant-list-item-main {
      width: 90px;
    }

    .img-center {
      width: 270px;
      object-fit: cover;
      max-height: 100%;

      @media (max-width: 576px) {
        width: 100%;
        max-height: 175px;
      }
    }

    .left-item {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;

      h2 {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }


      @media (max-width: 767px) {
        h4 {
          font-size: 1rem;
        }
      }

      & > * {
        margin-bottom: 5px;

        & :last-child {
          padding-top: 10px;
          width: 100%;
          display: flex;

          span {
            display: inline-flex;
            align-items: center;

            .anticon {
              margin-right: 5px;
            }
          }
        }
      }

      h4 {
        color: rgba(117, 117, 117, 1);
        font-weight: 400;
      }
    }
  }
`;
