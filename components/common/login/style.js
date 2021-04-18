import styled from 'styled-components'

export const LoginWrapper = styled.div`
  position: relative;
  height: 100%;
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
    flex-direction: column;
    padding: 10px 0 50px 0;

    &>div {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }

    .ant-btn {
      display: flex;
      align-items: center;
      height: 40px;
      min-width: 220px;
    }
    .anticon {
      font-size: 1.2rem;
    }
  }
  .privacy {
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
    span {
      color: rgba(117,117,117,1);
    }
  }
`