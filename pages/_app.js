// import React, { memo, useEffect, useState,  } from "react";
import { useEffect } from 'react'
import ReactDOM from 'react-dom';
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


function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps?.initialReduxState)
  const router = useRouter()

  return (
    <Provider store={store}>
      <Header />
        <Auth>
          <Component {...pageProps} key={router.asPath} />
        </Auth> 
      {/* <Footer /> */}
    </Provider>
  )
}

export default MyApp


