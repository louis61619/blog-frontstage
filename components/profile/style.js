import styled from 'styled-components'

export const ProfileWrapper = styled.div`
  .comm-main{
    margin-top: .5rem;
    .comm-left{
      .user {
        display: flex;
        align-items: center;
        margin: 20px 0;
        .user-image {
          display: flex;
          flex-direction: column;
          
          .image-show {
            width: 66px;
            height: 66px;
            border: 2px solid gray;
            margin-right: 20px;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }

    /* .comm-right{
      padding:.3rem;
      border-radius: .3rem;
      border-bottom:1px solid #eee;
    } */
  }
`