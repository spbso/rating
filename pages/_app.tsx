import React, { ReactElement } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import theme from '../src/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { EmotionCache, CacheProvider } from '@emotion/react';
import createEmotionCache from 'src/theme/createEmotionCache';

export type AppPropsWithLayout = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppPropsWithLayout): ReactElement {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <Head>
        <title>Рейтинг СПбСО</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=0"
        />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
