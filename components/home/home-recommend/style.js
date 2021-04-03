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
    padding-right: 1rem;
    padding-left: 1rem;
    margin-bottom: 10px;
    display: flex;

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
        object-fit: cover;
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

      .introduce {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
`;
