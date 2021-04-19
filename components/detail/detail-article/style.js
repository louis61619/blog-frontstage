import styled from 'styled-components'

export const DetailArticleWrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  
  .detailed-title{
    font-size: 2.25rem;
    text-align: center;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    @media (max-width: 576px) {
      font-size: 1.7rem;
      text-align: start;
    }

  }

  .detail-introduce {
    font-size: 1.4rem;
    text-align: center;
    font-weight: 400;
    color: rgba(117, 117, 117, 1);

    @media (max-width: 576px) {
      font-size: 1.2rem;
      text-align: start;
    }
  }
  
  .center{
    text-align: center;
  }
  
  .list-icon{
    padding:.5rem 0;
    color:#AAA;
    margin-bottom: 20px;
    span{
      display: inline-block;
      padding: 0 10px;
    }
  }
`