import React, { Fragment, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import Head from "next/head";
import { withRouter, useRouter } from "next/router";
import Router from "next/router";
import NProgress from "nprogress";

import { useStore } from "~/store";

import "antd/dist/antd.css";
import "../styles/globals.css";
import "moment/locale/zh-tw";
import "../styles/progress.css";
import "normalize.css"

import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import Auth from "~/components/common/auth";
import UnStyled from "~/components/common/unstyled";

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
      <UnStyled />
      <Provider store={store}>
        <Header />
        <Auth pageProps={pageProps}>
          <Component {...pageProps} />
        </Auth>
        {/* <Footer /> */}
      </Provider>
    </>
  );
}

export default MyApp;

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }
