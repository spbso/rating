import React from 'react';
import { SWRConfig } from 'swr';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getEventRating } from 'src/features/event/api';
import { EventData, ParticipantWorth } from 'src/features/event/model/types';
import {
  getCompetitionParticipantTitle,
  getParticipantTitle,
} from 'src/features/event/lib/getParticipantTitle';
import { getEventIds } from 'src/features/event/api/module.api';

export const getStaticPaths = async () => {
  const { eventIds } = await getEventIds();

  return {
    paths: eventIds.map((id) => ({
      params: {
        id: id.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventId = Number(params!.id!);

  const event = await getEventRating({ eventId });

  return {
    props: {
      fallback: {
        [`event-${eventId}`]: event,
      },
    },
  };
};
const EventPage = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { back, query } = useRouter();
  const eventId = query.id;
  const event = fallback[`event-${eventId}`] as EventData;

  return (
    <SWRConfig value={{ fallback }}>
      <AppBar
        component="header"
        elevation={0}
        variant="outlined"
        sx={{ background: (theme) => theme.palette.common.white, color: 'inherit' }}
      >
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={back}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="h1" noWrap>
            {event.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ visibility: 'hidden' }} />

      <Container component="main" sx={{ py: '20px' }}>
        {Object.entries(event.participants)
          .filter((entry) => entry[1].length > 0)
          .map(([participantWorth, data]) => (
            <Box
              key={participantWorth}
              sx={{
                mb: '20px',
                '&:last-of-type': {
                  mb: 0,
                },
              }}
            >
              <Typography variant="h6" component="h4" sx={{ mb: '12px' }}>
                {getParticipantTitle(participantWorth as ParticipantWorth)}
              </Typography>
              <TableContainer component={Paper}>
                <Table
                  size="small"
                  sx={{
                    '.MuiTableCell-root': {
                      fontSize: { xs: '10px', sm: '12px' },
                      lineHeight: { xs: '10px', sm: '12px' },
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Имя</TableCell>
                      <TableCell align="right">Отряд</TableCell>
                      <TableCell align="right">Последний год выезда</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((participant) => (
                      <TableRow
                        key={participant.title}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          ...(participant.isAccepted
                            ? {}
                            : {
                                background: '#ffd7db',
                              }),
                        }}
                      >
                        <TableCell>{participant.title}</TableCell>
                        <TableCell
                          align="right"
                          sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          {participant.brigade}
                        </TableCell>
                        <TableCell align="right">{participant.lastYear}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        {event.competitions.map((competition) => (
          <Box key={competition.id}>
            <Typography variant="h6" component="h4" sx={{ mb: '12px' }}>
              {competition.title}
            </Typography>
            {Object.entries(competition.competitionParticipants)
              .filter((entry) => entry[1].length > 0)
              .map(([participantWorth, data]) => (
                <Box
                  key={participantWorth}
                  sx={{
                    mb: '20px',
                    '&:last-of-type': {
                      mb: 0,
                    },
                  }}
                >
                  <Typography variant="h6" component="h4" sx={{ mb: '12px' }}>
                    {getCompetitionParticipantTitle(participantWorth)}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table
                      size="small"
                      sx={{
                        '.MuiTableCell-root': {
                          fontSize: { xs: '10px', sm: '12px' },
                          lineHeight: { xs: '10px', sm: '12px' },
                        },
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Отряд</TableCell>
                          <TableCell align="right">Название</TableCell>
                          {participantWorth === 'winners' && (
                            <TableCell align="right">Номинация</TableCell>
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((participant) => (
                          <TableRow
                            key={participant.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell>{participant.brigades.join(', ')}</TableCell>
                            <TableCell align="right">
                              {participant.title || 'Без названия'}
                            </TableCell>
                            {participantWorth === 'winners' && (
                              <TableCell align="right">
                                {participant.nominations.join(', ')}
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
          </Box>
        ))}
      </Container>
    </SWRConfig>
  );
};

export default EventPage;
