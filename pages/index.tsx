import React from 'react';
import { SWRConfig } from 'swr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getChoiceRating } from 'src/features/rating-common/api/module.api';
import Navbar from 'src/features/rating-common/ui/molecules/Navbar';
import { Container } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (Number(context.query.choice) > 4 || Number(context.query.choice) < 0) {
    return {
      notFound: true,
    };
  }
  const choice = context.query.choice as string;
  const choices = await getChoiceRating({ choice });

  return {
    props: {
      fallback: {
        [`choices-${choice}`]: choices,
      },
    },
  };
};

const HomePage = ({ fallback }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Navbar />

      <Container maxWidth={false}>loaded</Container>
    </SWRConfig>
  );
};

export default HomePage;
