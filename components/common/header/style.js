import styled from 'styled-components'
import { Menu } from "antd";

export const HeaderWrapper = styled.div`
  background-color: #fff;
  overflow: hidden;
  height: 65px;
  border-bottom:1px solid #ccc;

  .header-title {
    display: flex;
    align-items: center;
    white-space:nowrap;
  }

  .header-logo {
    /* color:#1e90ff;
    font-size: 2rem;
    text-align: left;
    height: 100%;
    font-weight: bold;
    font-family: Arial Black; */
    position: relative;
    cursor: pointer;
    width: 125px;
    height: 60px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .header-text {
    font-size: .8rem;
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
  .menu-icon {
      font-size: 1.5rem;
    }
  
  
`

export const MenuWrapper = styled(Menu)`
  border-right: none;
  font-size: 18px;
    @media (max-width: 767px) {
      flex-direction: column;
    }
  
`