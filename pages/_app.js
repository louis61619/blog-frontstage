import React, { Fragment } from "react";
import Head from "next/head";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { withRouter, useRouter } from "next/router";
import Router from "next/router";
import NProgress from "nprogress";

import { useStore } from "~/store";
import { useLoadingSkeleton } from "~/utils/custom-hook";

import "antd/dist/antd.css";
import "../styles/globals.css";
import "moment/locale/zh-tw";
import "../styles/progress.css";

import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import Auth from "~/components/common/auth";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps?.initialReduxState);
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Provider store={store}>
        <Header />
        <Auth>
          <Component {...pageProps} key={router.asPath} />
        </Auth>
        {/* <Footer /> */}
      </Provider>
    </>
  );
}

export default MyApp;
