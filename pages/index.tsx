import React from 'react';
import { SWRConfig } from 'swr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Container from '@mui/material/Container';
import Navbar from 'src/features/choice/ui/molecules/Navbar';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      fallback: {},
    },
  };
};

const HomePage = ({ fallback }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      </Container>
      <Navbar />
    </SWRConfig>
  );
};

export default HomePage;
