import styled from "styled-components";

export const HomeRecommendWrapper = styled.div`
  margin-bottom: 5vw;

  a {
    color: rgba(0, 0, 0, 0.85);
  }

  h4 {
    color: rgba(117, 117, 117, 1);
    font-weight: 400;
  }

  .first-item {
    width: 100%;
    height: 100%;
    padding: 12px 1rem 1rem 0;
    display: flex;
    flex-direction: column;
    .img-block {
      position: relative;
      width: 100%;
      height: 60%;
      background-color: #eee;
      img {
        object-fit: cover;
      }
    }
    .left-item {
      padding-top: 1rem;

      position: relative;
      position: relative;
      flex-grow: 1;

      & > * {
        margin-bottom: 5px;
      }
    }
  }

  .list-item {
    padding-right: 12px;
    padding-left: 12px;
    margin-bottom: 10px;
    display: flex;

    @media (max-width: 576px) {
      .ant-list-item-extra {
        margin: auto auto 8px;
      }
      .ant-list-item-main {
        min-width: 0;
        /* display: flex;
        flex-direction: column;
        align-items: center; */
      }
    }

    /* @media (max-width: 376px) {
        display: none;
      .ant-list-item-extra {
        width: 100%;
        .img-right {
          width: 100%;
          padding-bottom: 60%;
        }
      }
    } */

    h4 {
      font-size: 1rem;
    }

    & > :nth-child(1) {
      width: calc(100% - 140px);
      overflow: hidden;
    }

    .img-right {
      width: 100px;
      height: 100px;
      position: relative;

      img {
        object-fit: contain;
      }
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

      & > * {
        margin-bottom: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 10px;
      }

      .introduce {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
`;
