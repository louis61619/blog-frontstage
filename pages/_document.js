import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const APP_NAME = 'Coder Land'
const APP_DESCRIPTION = "歡迎來到我的部落格Coder Land，我是一名前端工程師，這裡紀錄我探索技術的心得"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
          {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}
          
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/icon-192x192.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <body>
          {/* <script>0</script> */}
          <Main />
          <NextScript />  
        </body>
      </Html>
    )
  }
}

export default MyDocument