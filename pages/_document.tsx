import React, { ReactElement } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../src/theme';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from 'src/theme/createEmotionCache';

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta name = "robots" content = "noindex, nofollow" />
          <link rel="shortcut icon" href={`${process.env.ROOT_PATH}/favicon.ico`} />
          <link rel="icon" type="image/png" href={`${process.env.ROOT_PATH}/favicon-16x16.png`} />
          <link
            rel="alternate icon"
            type="image/png"
            href={`${process.env.ROOT_PATH}/favicon-32x32.png`}
          />
          <link rel="mask-icon" href={`${process.env.ROOT_PATH}/safari-pinned-tab.svg`} />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href={`${process.env.ROOT_PATH}/apple-touch-icon.png`}
          />
          <meta name="apple-mobile-web-app-title" content="EngagedMD Patient" />

          <link rel="manifest" href={`${process.env.ROOT_PATH}/site.webmanifest`} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function enhancer(props) {
          return <App {...props} emotionCache={cache} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
