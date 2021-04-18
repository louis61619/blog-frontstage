import React, { memo, useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

import { Tag } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { ArticleLabelWrapper } from "./style";

export default memo(function ArticleLabel(props) {

  const [list, setList] = useState([])
  const [isUnfold, setIsUnfold] = useState(false)

  const router = useRouter()
  const { query } = router

  const minuslist = props.labels.filter((item, index) => {
    return index < 5
  })

  useEffect(() => {
    if(router.isReady) {
      console.log(query)
    }
  }, [query])

  useEffect(() => {
    setList(minuslist)
  }, [])

  const clickItem = () => {
    if(isUnfold) {
      setList(minuslist)
    } else {
      setList(props.labels)
    }
    setIsUnfold(!isUnfold)
  }

  return (
    <ArticleLabelWrapper>
      <div className="labels-area">
        <Link href="/article">
          <a>
            <Tag>全部</Tag>
          </a>
        </Link>
        {list.map((item) => {
          return (
            <Link
              key={item.id}
              href={{
                pathname: "/article",
                query: { id: item.id },
              }}
            >
              <a>
                <Tag>
                  {item.name} ({item.articles})
                </Tag>
              </a>
            </Link>
          );
        })}
        <div className="unfold" onClick={clickItem}>
          { !isUnfold ? 
            <>
              展開 <PlusOutlined /> 
            </>: 
            <>
              收起 <MinusOutlined />
            </>
          }
        </div>
      </div>
      
    </ArticleLabelWrapper>
  );
});
