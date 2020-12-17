import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          {/* Android */}
          <meta name="theme-color" content="#f3e03a" />
          <meta name="mobile-web-app-capable" content="yes" />
          {/* iOS */}
          <meta name="apple-mobile-web-app-title" content="Licor 43" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          {/* Windows */}
          <meta name="msapplication-navbutton-color" content="red" />
          <meta name="msapplication-TileColor" content="red" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />
          {/* Pinned Sites */}
          <meta name="application-name" content="Application Name" />
          <meta name="msapplication-tooltip" content="Tooltip Text" />
          <meta name="msapplication-starturl" content="/" />
          {/* Tap highlighting */}
          <meta name="msapplication-tap-highlight" content="no" />
          {/* UC Mobile Browser */}
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />
          {/* Disable night mode for this page */}
          <meta name="nightmode" content="enable/disable" />
          {/* Fitscreen */}
          <meta name="viewport" content="uc-fitscreen=yes" />
          {/* Layout mode */}
          <meta name="layoutmode" content="fitscreen/standard" />
          <meta name="imagemode" content="force" />

          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          <link
            href="/static/img/icons/icon-192x192.png"
            rel="apple-touch-icon"
          />
          <link
            href="/static/img/icons/icon-192x192.png"
            rel="apple-touch-startup-image"
          />
          <link
            href="/static/img/icons/icon-192x192.png"
            rel="icon"
            sizes="192x192"
          />
          {/* NEW META TAGS */}
          <meta name="title" content="Licor43 - The Perfect Host" />
          <meta name="description" content="You are invited to the quiz" />
          {/* <title>Licor43 - The Perfect Host</title> */}

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://theperfecthost.app/" />
          <meta property="og:title" content="Licor43 - The Perfect Host" />
          <meta
            property="og:description"
            content="You are invited to the quiz"
          />
          <meta
            property="og:image"
            content="https://theperfecthost.app/static/img/logo-share.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://theperfecthost.app/" />
          <meta property="twitter:title" content="Licor43 - The Perfect Host" />
          <meta
            property="twitter:description"
            content="You are invited to the quiz"
          />
          <meta
            property="twitter:image"
            content="https://theperfecthost.app/static/img/logo-share.png"
          />

          <meta name="screen-orientation" content="portrait" />
          <link rel="manifest" href="/manifest.json" />
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
