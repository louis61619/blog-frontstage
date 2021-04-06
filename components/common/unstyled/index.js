import Head from "next/head";
import { useEffect, useState } from "react";

function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default function PreventFlashOfUnstyledContent() {
  const mounted = useIsMounted();

  if (mounted) {
    return null;
  }

  return (
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
      <style
        id="preventFlashOfUnstyledContent"
        dangerouslySetInnerHTML={{
          __html: `*, *::before, *::after { transition: none !important; }`,
        }}
      />
    </Head>
  );
}
