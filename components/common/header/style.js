import styled from "styled-components";
import { Menu } from "antd";

export const HeaderWrapper = styled.div`
  background-color: #fff;
  overflow: hidden;
  height: 65px;
  /* border-bottom: 1px solid #ccc; */

  .header-title {
    display: flex;
    align-items: center;
    white-space: nowrap;
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
    width: 180px;

    @media (max-width: 767px) {
      margin-left: .5rem;
    }

    @media (max-width: 512px) {
      width: 150px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .header-text {
    font-size: .9rem;
    color: #999;
    align-self: flex-end;
    padding-left: 1rem;
    margin-bottom: 2px;

    @media (max-width: 576px) {
      display: none;
    }
  }

  .right-tools {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    & > div {
      width: 287px;

      @media (max-width: 767px) {
        width: 40px;
      }

      .ant-menu {
        border-bottom: none;
      }
    }
  }

`;

export const MenuWrapper = styled(Menu)`
  border-right: none;

  .ant-menu-item {
    margin-top: 8px;
  }
  
  @media (max-width: 767px) {  
    .menu-text {
      display: none;
    }
    .ant-menu-submenu-selected {
      color: rgba(0, 0, 0, 0.85)!important;
    }
    .ant-menu-submenu {
      font-size: 1.5rem;
      margin: 0!important;
      border-bottom: none!important;
      .anticon {
        font-size: 1.4rem;
      }
    }
    
  }
  .anticon {
    font-size: 1.1rem;
  }
`;
