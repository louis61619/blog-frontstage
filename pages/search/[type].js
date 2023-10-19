import React, { memo, useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

import {
  searchArticleTitle,
  searchArticleLabel
} from '~/services/search'
import { getLabels } from '~/services/article'

import { Row, Col, Affix, Menu } from "antd";

import List from '~/components/common/list'
import Scroll from '~/components/common/scroll'
import Labels from '~/components/common/labels'
import { SearchWrapper } from "~/components/search/style";

export default memo(function Search(props) {
  
  const [current, setCurrent] = useState('title')
  const [isFocus, setIsFocus] = useState(false)
  const [value, setValue] = useState('')
  const [labels, setLabels] = useState([])

  const [list, setList] = useState([])
  const [changeFun, setChangeFun] = useState()

  const scrollRef = useRef()

  const router = useRouter()
  const { query } = router

  useEffect(() => {
    getLabels().then(res => {
      setLabels(res.data)
    })
  }, [])
  
  useEffect(() => {
    const { type, s } = query
    setCurrent(type)

    if(s) {
      scrollRef.current.reset()
      if (type === 'title') {
        setChangeFun(() => {
          return async (offset, size) => await searchArticleTitle(offset, size, s)
        })
      } else {
        setChangeFun(() => {
          return async (offset, size) => await searchArticleLabel(offset, size, s)
        })
      }
    }
  }, [query])

  const menuClick = (e) => {
    const { s: searchValue } = query
    const obj = {
      pathname: "/search/" + e.key,
    }
    if (searchValue) {
      obj.query = {
        s: searchValue
      }
    }
    router.push(obj);
  }

  const enterKeyword = event => {
    const { keyCode } = event;
    if ( isFocus && keyCode === 13 ) {
      const { type } = query
      router.push({
        pathname: "/search/" + type ,
        query: {
          s: value
        }
      })
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", enterKeyword);
    return () => {
      document.removeEventListener("keydown", enterKeyword);
    };
  }, [enterKeyword]);

  return (
    <SearchWrapper>
      <Head>
        <title>Search</title>
      </Head>
      <Row className="comm-main" type="flex" justify="center">
        <Col xs={23} sm={23} md={23} lg={23} xl={18}>
          <div className="search-form" onFocus={e => setIsFocus(true)} onBlur={e => setIsFocus(false)}>
            <input type="search"
                   spellCheck="false"
                   placeholder="Search Blog" 
                   value={value} 
                   onInput={e => setValue(e.target.value)}
                   maxLength={20}
                   />
          </div>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={15} lg={16} xl={12}>
          <div className="comm-menu">
            <Menu mode="horizontal" onClick={menuClick} selectedKeys={[current]}>
              <Menu.Item key="title">title</Menu.Item>
              <Menu.Item key="tags">tags</Menu.Item>
            </Menu>
          </div>
          { query.s && <Scroll list={list} setList={setList} changeFun={changeFun} ref={scrollRef}>
            <List list={list}/>
          </Scroll> }
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={6}>
          <Affix offsetTop={5}>
            <Labels labels={labels} />
          </Affix>
        </Col>
      </Row>
    </SearchWrapper>
  );
});

export const getStaticPaths = () => {
  return {
    paths: [{ params: { type: 'title' } }, { params: { type: 'tags' } }],
    fallback: false,
  }
}

export const getStaticProps = async () => {
  return {
    props: {
    },
  };
};