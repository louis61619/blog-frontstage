import styled from 'styled-components'

export const LoginWrapper = styled.div`
  .title {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      color: #1e90ff;
    }
  }
  .login-area {
    display: flex;
    justify-content: center;
    margin: 10px 0 50px 0;

    .ant-btn {
      display: flex;
      align-items: center;
      height: 40px;
    }
    .anticon {
      font-size: 1.2rem;
    }
  }
`