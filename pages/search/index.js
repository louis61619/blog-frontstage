import React, { memo } from 'react'
import Head from "next/head";

import { Row, Col, Affix } from "antd";

import { SearchWrapper } from '~/components/search/style'

export default memo(function Search() {
  return (
    <SearchWrapper>
      <Head>
        <title>Search</title>
      </Head>
      <Row className="comm-main" type="flex" justify="center">
        <Col xs={23} sm={23} md={23} lg={23} xl={18}>
          <div className="search-form">
            <input placeholder="Search Blog"/>
          </div>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={6}>
          <Affix offsetTop={5}>
            
          </Affix>
        </Col>
      </Row>
    </SearchWrapper>
  )
})
