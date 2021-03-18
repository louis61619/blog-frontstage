import React, { memo } from 'react'

import { FooterWrapper } from './style'

export default memo(function Footer() {
  return (
    <FooterWrapper>
      <div>系统由 React+Node+Ant Desgin驱动 </div>
      <div>JSPang.com</div>
    </FooterWrapper>
  )
})
