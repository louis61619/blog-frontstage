import styled from 'styled-components'

export const DetailArticleWrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  
  .detailed-title{
    font-size: 2.25rem;
    text-align: center;
    font-weight: bold;
    @media (max-width: 576px) {
      font-size: 1.7rem
    }

  }

  .detail-introduce {
    font-size: 1.4rem;
    text-align: center;
    color: rgba(117, 117, 117, 1);

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