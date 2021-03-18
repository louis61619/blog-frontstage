import styled from "styled-components";

export const RecommendWrapper = styled.div`
  margin-bottom: 5vw;
  .first-item {
    width: 100%;
    height: 100%;
    padding: 12px 1rem 1rem 0;
    /* padding-right: 1rem; */
    display: flex;
    flex-direction: column;
    div {
      img {
        width: 100%;
      }
    }
    .left-item {
      padding-top: 1rem;
      
      position: relative;
      position: relative;
      flex-grow: 1;

      & > * {
        margin-bottom: 5px;

        & :last-child {
          margin-bottom: 0;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          font-size: 1rem;
          display: flex;

          span {
            display: inline-flex;
            align-items: center;

            .anticon {
              margin-right: 5px;
            }
          }

          & > span :last-child {
            flex: 1;
            justify-content: flex-end;
          }
        }
      }
    }
    h4 {
      color: rgba(117, 117, 117, 1);
      font-weight: 400;
    }
  }

  .list-item {
    padding-right: 1rem;
    padding-left: 1rem;
    margin-bottom: 10px;

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
      height: 100%;

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

          /* & > span :last-child {
            flex: 1;
            justify-content: flex-end;
          } */
        }
      }

      h4 {
        color: rgba(117, 117, 117, 1);
        font-weight: 400;
      }
    }
  }
`;
