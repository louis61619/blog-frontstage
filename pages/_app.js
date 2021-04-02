// import React, { memo, useEffect, useState,  } from "react";
import { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { providers, signIn } from 'next-auth/client'
import { Provider, useDispatch } from 'react-redux'
import { withRouter, useRouter } from 'next/router'
import Router from "next/router";
import NProgress from "nprogress";

import { useStore } from '~/store'
import { useLoadingSkeleton } from '~/utils/custom-hook'

import 'antd/dist/antd.css'
import '../styles/globals.css'
import 'moment/locale/zh-tw'
import "../styles/progress.css";

import Header from "~/components/common/header";
import Footer from '~/components/common/footer'
import Auth from '~/components/common/auth'

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();


function MyApp({ Component, pageProps, providers, propsAjaxStatus }) {
  const store = useStore(pageProps?.initialReduxState)
  const router = useRouter()

  // router.beforePopState(() => {
  //   console.log("00000")
  // })
  useEffect(() => {
    console.log("pppp")
  })

  return (
    <Provider store={store}>
      <Header providers={providers} />
        <Auth>
          <Component {...pageProps} key={router.asPath} />
        </Auth> 
      {/* <Footer /> */}
    </Provider>
  )
}

MyApp.getInitialProps = async (context) => {
  
  return {
    providers: await providers(context),
  }
}

export default MyApp


