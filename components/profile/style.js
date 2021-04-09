import styled from 'styled-components'


export const ProfileWrapper = styled.div`
  .comm-main{
    margin-top: .5rem;
    .comm-left{
      .user {
        display: flex;
        align-items: center;
        margin: 20px 0;
        padding: 0 12px;

        .user-info {
          
          .user-name {
            display: flex;
            align-items: center;
            & > span {
              white-space: nowrap;
              margin-right: 8px;
            }

            .anticon {
              cursor: pointer;
            }

            .name-input {
              padding: 0 5px;
              margin-right: 8px;
            }
          }
        }

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
            position: relative;
            cursor: pointer;

            .image-upload {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            &>div {
              display: block!important;
            }
          }

            &:hover>.img-hover {
              display: flex;
            }
            

            .img-hover {
              display: none;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background-color: #0000005e;
              /* display: flex; */
              align-items: center;
              justify-content: center;
              font-size: 2.5rem;
              color: #cacaca;
            }

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