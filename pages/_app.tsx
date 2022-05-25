import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import theme from '../src/theme';
import { ThemeProvider } from '@mui/material';
import { EmotionCache, CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
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
