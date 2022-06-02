import React from 'react';
import { SWRConfig } from 'swr';
import Link from 'next/link';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getChoiceRating } from 'src/features/choice/api/module.api';
import Navbar from 'src/features/choice/ui/molecules/Navbar';
import { SxProps } from '@mui/material';

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

import { TableData } from 'src/features/choice/model/types';

export const getStaticPaths = async () => {
  return {
    paths: ['1', '2', '3', '4'].map((choice) => ({
      params: {
        choice,
      },
    })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!['1', '2', '3', '4'].includes(params!.choice as string)) {
    return { notFound: true };
  }
  const choice = Number(params!.choice);

  const choices = await getChoiceRating({ choice });

  return {
    props: {
      fallback: {
        [`choices-${choice}`]: choices,
      },
    },
  };
};

const headerStyles: SxProps<Theme> = {
  borderRight: 1,
  background: (theme) => theme.palette.common.white,
  borderRightColor: (theme) => theme.palette.grey[200],
};
const bodyStyles: SxProps<Theme> = {
  borderRight: 1,
  borderRightColor: (theme) => theme.palette.grey[200],
};

const ChoicePage = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { brigadesData, eventsData, columnsData, summaryData } = Object.values(
    fallback
  )[0] as TableData;

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
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {/* first column */}
                <TableCell
                  align="left"
                  sx={{
                    ...headerStyles,
                    position: 'sticky',
                    zIndex: 3,
                    left: 0,
                  }}
                />
                {eventsData.map((event) => (
                  <TableCell
                    key={event.id}
                    align="center"
                    sx={headerStyles}
                    colSpan={columnsData.columns.length}
                  >
                    <Link href={`/event/${event.id}`} passHref={true}>
                      <MuiLink>{event.title}</MuiLink>
                    </Link>
                  </TableCell>
                ))}
                <TableCell align="center" sx={headerStyles} colSpan={3}>
                  Итого
                </TableCell>
              </TableRow>
              <TableRow>
                {/* first column */}
                <TableCell
                  align="left"
                  sx={{
                    ...headerStyles,
                    position: 'sticky',
                    zIndex: 3,
                    left: 0,
                  }}
                  style={{ top: 37 }}
                />
                {eventsData.map((event) =>
                  columnsData.columns.map((column, index) => (
                    <TableCell
                      key={`${event.id}-${index}`}
                      style={{ top: 37 }}
                      align="center"
                      sx={headerStyles}
                    >
                      {column}
                    </TableCell>
                  ))
                )}
                <TableCell style={{ top: 37 }} align="center" sx={headerStyles}>
                  Балл за блок
                </TableCell>
                <TableCell style={{ top: 37 }} align="center" sx={headerStyles}>
                  Ранжирование блока
                </TableCell>
                <TableCell style={{ top: 37 }} align="center" sx={headerStyles}>
                  Балл за блок с учетом коэффициента значимости
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brigadesData.map((brigade, index) => (
                <TableRow key={brigade.id}>
                  <TableCell
                    align="left"
                    sx={{
                      ...bodyStyles,
                      background: (theme) => theme.palette.common.white,
                      position: 'sticky',
                      left: 0,
                    }}
                  >
                    <Typography sx={{ fontSize: 'inherit' }} noWrap>
                      {`${index + 1}. ${brigade.title}`}
                    </Typography>
                  </TableCell>
                  {eventsData.map((event) =>
                    columnsData.columns.map((_, columnIndex) => (
                      <TableCell
                        key={`${brigade.id}-${event.id}-${columnIndex}`}
                        sx={bodyStyles}
                        align="center"
                      >
                        {event.values[brigade.id][columnIndex] || ''}
                      </TableCell>
                    ))
                  )}
                  <TableCell sx={bodyStyles} align="center">
                    {summaryData.values[brigade.id][0]}
                  </TableCell>
                  <TableCell sx={bodyStyles} align="center">
                    {summaryData.values[brigade.id][1]}
                  </TableCell>
                  <TableCell sx={bodyStyles} align="center">
                    {summaryData.values[brigade.id][2]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Navbar />
      </Container>
    </SWRConfig>
  );
};

export default ChoicePage;
