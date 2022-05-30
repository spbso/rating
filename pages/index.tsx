import React from 'react';
import { SWRConfig } from 'swr';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Navbar from 'src/features/rating-common/ui/molecules/Navbar';
import { Container } from '@mui/material';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      fallback: {},
    },
  };
};

const HomePage = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          maxHeight: '100vh',
          p: '0px !important',
        }}
        maxWidth={false}
      >
        hello
        <Navbar />
      </Container>
    </SWRConfig>
  );
};

export default HomePage;
