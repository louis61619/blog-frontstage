import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  background-color: #fff;
  overflow: hidden;
  height: 65px;
  border-bottom:1px solid #ccc;

  a {
    display: flex;
    align-items: center;
    white-space:nowrap;
  }

  .header-logo {
    color:#1e90ff;
    font-size: 2rem;
    text-align: left;
    height: 100%;
    font-weight: bold;
    font-family: Arial Black;
  }

  .header-text {
    font-size: 1rem;
    color: #999;
    display: inline-block;
    padding-left: 1rem;
  }

  .menu-div {
    display: flex;

    .ant-menu{
      line-height: 2.8rem;
    }

    .ant-menu-item{
      font-size:1rem !important;
      padding-left:1rem;
      padding-right:1rem;
    }
  }

  
`