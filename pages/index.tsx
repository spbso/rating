import React from 'react';
import { SWRConfig } from 'swr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getChoiceRating } from 'src/features/rating-common/api/module.api';
import Navbar from 'src/features/rating-common/ui/molecules/Navbar';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { HeaderData, TableData } from 'src/features/rating-common/model/types';

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
  const { headerData, bodyData } = Object.values(fallback)[0] as TableData;

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
                {headerData[0].map((config, index) => (
                  <TableCell
                    key={config[1]}
                    align="center"
                    sx={
                      index === 0
                        ? {
                            position: 'sticky',
                            zIndex: 3,
                            left: 0,
                            borderRight: 1,
                            background: (theme) => theme.palette.common.white,
                            borderRightColor: (theme) => theme.palette.grey[200],
                          }
                        : {
                            borderRight: 1,
                            background: (theme) => theme.palette.common.white,
                            borderRightColor: (theme) => theme.palette.grey[200],
                          }
                    }
                    colSpan={config[2]}
                  >
                    {config[0]}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headerData[1].map((title, index) => (
                  <TableCell
                    style={{ top: 37 }}
                    sx={
                      index === 0
                        ? {
                            position: 'sticky',
                            zIndex: 3,
                            left: 0,
                            borderRight: 1,
                            borderRightColor: (theme) => theme.palette.grey[200],
                            background: (theme) => theme.palette.common.white,
                          }
                        : undefined
                    }
                    key={`${title}-${index}`}
                    align="center"
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(bodyData).map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    align="left"
                    sx={{
                      position: 'sticky',
                      left: 0,
                      background: (theme) => theme.palette.common.white,
                      borderRight: 1,
                      borderRightColor: (theme) => theme.palette.grey[200],
                    }}
                  >
                    <Typography sx={{ fontSize: 'inherit' }} noWrap>
                      {row.title}
                    </Typography>
                  </TableCell>
                  {row.columns.map((column) =>
                    column.map((value, index) => (
                      <TableCell
                        key={`${row.id}-${index}-${column}-${value}`}
                        sx={
                          index === column.length - 1
                            ? {
                                borderRight: 1,
                                borderRightColor: (theme) => theme.palette.grey[200],
                                background: (theme) => theme.palette.common.white,
                              }
                            : undefined
                        }
                        align="center"
                      >
                        {value}
                      </TableCell>
                    ))
                  )}
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

export default HomePage;
