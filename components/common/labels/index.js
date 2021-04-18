import React, { memo } from 'react'
import Link from "next/link";

import { Tag } from "antd";
import { LabelsWrapper } from './style'

export default memo(function Labels(props) {
  // console.log(props)
  return (
    <LabelsWrapper>
      {props.labels.map((item) => {
        return (
          <Link key={item.id} href={{
            pathname: '/article',
            query: { id: item.id },
          }}>
            <a>
              <Tag>
                {item.name} ({item.articles})
              </Tag>
            </a>
          </Link>
        );
      })}
    </LabelsWrapper>
  )
})
