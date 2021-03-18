// import React, { memo, useEffect, useState,  } from "react";
import { useEffect } from 'react'
import { providers, signIn } from 'next-auth/client'
import { Provider, useDispatch } from 'react-redux'
import { withRouter } from 'next/router'
import { useStore } from '~/store'

import 'antd/dist/antd.css'
import '../styles/globals.css'
import 'moment/locale/zh-tw'

import Header from "~/components/common/header";
import Footer from '~/components/common/footer'
import Auth from '~/components/common/auth'


function MyApp({ Component, pageProps, providers }) {
  const store = useStore(pageProps?.initialReduxState)
  return (
    <Provider store={store}>
      <Header providers={providers} />
        <Auth>
          <Component {...pageProps} />
        </Auth> 
      {/* <Footer /> */}
    </Provider>
  )
}

MyApp.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}

export default MyApp


