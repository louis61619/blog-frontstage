import Head from 'next/head'
import { FallbackWrapper } from '~/components/fallback/style'

export default () => (
  <FallbackWrapper>
    <Head>
      <title>fallback page</title>
    </Head>
    <div
      className="content"
    >
      <div>
        <h1
        >
          404
        </h1>
        <div
          className="statement"
        >
          <h2
          >
            This page could not be found
          </h2>
        </div>
      </div>
    </div>
  </FallbackWrapper>
)