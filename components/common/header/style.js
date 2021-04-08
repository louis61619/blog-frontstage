import styled from "styled-components";
import { Menu } from "antd";

export const HeaderWrapper = styled.div`
  background-color: #fff;
  overflow: hidden;
  height: 65px;
  border-bottom: 1px solid #ccc;

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
    width: 125px;
    height: 60px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .header-text {
    font-size: 0.8rem;
    color: #999;
    display: inline-block;
    padding-left: 1rem;

    @media (max-width: 576px) {
      display: none;
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
    /* .ant-menu-item {
      padding: 0 8px;
      
    } */
    /* .anticon {
      margin: 0 6px;
    } */
    .ant-menu-submenu {
      font-size: 1.5rem;
    }
  }
  .anticon {
    font-size: 1.2rem;
  }
  /* @media (max-width: 767px) {
    flex-direction: column;
    font-size: 1rem;
  } */
`;
