import styled from "styled-components";

export const SearchWrapper = styled.div`
  .search-form {
    margin: 0 1rem;
    /* border: 1px solid blue; */

    input {
      width: 100%;
      height: 80px;
      letter-spacing: 0;
      font-size: 52px;
      letter-spacing: 0;
      font-weight: 300;
      font-style: normal;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      background: #fff;

      @media (max-width: 767px) {
        font-size: 34px;
        height: 50px;
      }
    }
  }
`;
