import styled from 'styled-components'

export const FavoriteWrapper = styled.div`
  
  a {
    color: rgba(0,0,0,0.85);
  }

  .list-item {
    padding: 2rem 1rem;
    display: flex;

    h4 {
        font-size: 1rem;
        color: rgba(117, 117, 117, 1);
        font-weight: 400;
      }

    & > :nth-child(1) {
      width: calc(100% - 140px);
      overflow: hidden;
    }

    .img-right {
      width: 100px;
      height: 100px;
      object-fit: contain;

      @media (max-width: 576px) {
        width: 100%;
        height: 100%;
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

      .title {
        margin-bottom: 6px;
      }

      .introduce {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .delete {
    margin-top: 20px;
    color: rgba(117, 117, 117, 1);
    cursor: pointer;
    & > span {
      margin-right: 10px;
    }
  }
`