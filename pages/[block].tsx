import React from 'react';
import { SWRConfig } from 'swr';
import Link from 'next/link';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getRatingBlock } from 'src/features/block/api/module.api';

import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

import { BlockTableData, CommonSummaryData, SummaryData } from 'src/features/block/model/types';
import { BLOCK_TITLES, CHOICE_ROUTES, Columns, RouteValues } from 'src/features/block/consts';
import { useRouter } from 'next/router';
import EventTable from 'src/features/block/ui/templates/EventTable';
import EducationTable from 'src/features/block/ui/templates/EducationTable';
import ImageTable from 'src/features/block/ui/templates/ImageTable';
import CommonTable from 'src/features/block/ui/templates/CommonTable';

export const getStaticPaths = async () => {
  return {
    paths: Object.values(CHOICE_ROUTES).map((block) => ({
      params: {
        block,
      },
    })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const block = params?.block;
  if (!block || !Object.values(CHOICE_ROUTES).includes(block as RouteValues)) {
    return { notFound: true };
  }

  const blockData = await getRatingBlock({ block: block as string });

  return {
    props: {
      fallback: {
        [`block-${block}`]: blockData,
      },
    },
    revalidate: 3600,
  };
};

const BlockPage = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const blockName = router.query?.block as RouteValues;
  const { brigades, events, summary } = Object.values(fallback)[0] as BlockTableData;

  const Component = () => {
    if (blockName === CHOICE_ROUTES.EDUCATION) {
      return <EducationTable brigades={brigades} summary={summary as SummaryData} />;
    }
    if (blockName === CHOICE_ROUTES.IMAGE) {
      return <ImageTable brigades={brigades} summary={summary as SummaryData} />;
    }
    if (blockName === CHOICE_ROUTES.COMMON) {
      return <CommonTable brigades={brigades} summary={summary as CommonSummaryData} />;
    }
    return (
      <EventTable
        brigades={brigades}
        events={events}
        summary={summary as SummaryData}
        columns={Columns[blockName]}
      />
    );
  };
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
        <AppBar
          component="header"
          elevation={0}
          variant="outlined"
          sx={{ background: (theme) => theme.palette.common.white, color: 'inherit' }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={router.back}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" component="h1" noWrap>
              {BLOCK_TITLES[blockName]}
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar sx={{ visibility: 'hidden' }} />
        <TableContainer>
          <Component />
        </TableContainer>
      </Container>
    </SWRConfig>
  );
};

export default BlockPage;
