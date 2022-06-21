import React from 'react';
import { SWRConfig } from 'swr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { CHOICE_ROUTES, BLOCK_TITLES } from 'src/features/block/consts';
import Typography from '@mui/material/Typography';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      fallback: {},
    },
  };
};

interface BlockType {
  url: string;
  title: string;
}
const blocks: BlockType[] = [
  {
    url: `/${CHOICE_ROUTES.COMMON}`,
    title: BLOCK_TITLES.common,
  },
  {
    url: `/${CHOICE_ROUTES.ART}`,
    title: BLOCK_TITLES.art,
  },
  {
    url: `/${CHOICE_ROUTES.SPORT}`,
    title: BLOCK_TITLES.sport,
  },
  {
    url: `/${CHOICE_ROUTES.VOLONTEER}`,
    title: BLOCK_TITLES.volonteer,
  },
  {
    url: `/${CHOICE_ROUTES.EDUCATION}`,
    title: BLOCK_TITLES.education,
  },
  {
    url: `/${CHOICE_ROUTES.CITY}`,
    title: BLOCK_TITLES.city,
  },
  {
    url: `/${CHOICE_ROUTES.IMAGE}`,
    title: BLOCK_TITLES.image,
  },
];

const HomePage = ({ fallback }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Container
        sx={{
          display: 'flex',

          alignItems: { lg: 'center' },
          flex: 1,
          overflow: 'hidden',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ padding: '64px 20px', display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: '32px',
                lg: '64px',
              },
              lineHeight: {
                xs: '48px',
                lg: '72px',
              },
              my: { xs: '10px', lg: '10px' },
              mx: { xs: 'auto', lg: '0' },
              fontWeight: 700,
              maxWidth: '500px',
            }}
            component="h1"
          >
            Рейтинг СПбСО
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: { xs: '14px', lg: '14px' },
              mx: { xs: 'auto', lg: '0' },
              maxWidth: '500px',
            }}
            component="h1"
          >
            Выбери блок для просмотра
          </Typography>
          <Grid container spacing="10px">
            {blocks.map((block) => (
              <Grid key={block.url} item sx={{ width: { xs: '100%', lg: 'auto' } }}>
                <Link href={block.url} passHref={true}>
                  <Button variant="contained" sx={{ width: { xs: '100%', lg: 'auto' } }}>
                    {block.title}
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </SWRConfig>
  );
};

export default HomePage;
