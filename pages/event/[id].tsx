import React from 'react';
import { SWRConfig } from 'swr';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { getEventRating } from 'src/features/event/api';

import { getEventIds } from 'src/features/event/api/module.api';
import {
  CompetitionData,
  CompetitionParticipant,
  EventData,
  Participant,
} from 'src/features/block/model/types';
import { participantRenderer } from 'src/features/event/lib/participantRenderer';
import { competitionRenderer } from 'src/features/event/lib/competitionRenderer';

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
    revalidate: 3600,
  };
};
const EventPage = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { back, query } = useRouter();
  const eventId = query.id;
  const event = fallback[`event-${eventId}`] as EventData;

  const participants = Object.values(event.values).reduce(
    (acc, data) => (data.participant0 ? [...acc, ...data.participant0] : acc),
    [] as Participant[]
  );
  const volonteers = Object.values(event.values).reduce(
    (acc, data) => (data.participant1 ? [...acc, ...data.participant1] : acc),
    [] as Participant[]
  );
  const organizers = Object.values(event.values).reduce(
    (acc, data) => (data.participant2 ? [...acc, ...data.participant2] : acc),
    [] as Participant[]
  );
  const competitionsParticipants = event.competitions.reduce(
    (acc, competition) => ({
      ...acc,
      [competition.id]: {
        applications: Object.values(event.values)
          .reduce(
            (acc, data) => (data.applications ? [...acc, ...data.applications] : acc),
            [] as CompetitionParticipant[]
          )
          .filter((participant) => participant.competitionId === competition.id),
        involvers: Object.values(event.values)
          .reduce(
            (acc, data) => (data.involvers ? [...acc, ...data.involvers] : acc),
            [] as CompetitionParticipant[]
          )
          .filter((participant) => participant.competitionId === competition.id),
        playoffers: Object.values(event.values)
          .reduce(
            (acc, data) => (data.playoffers ? [...acc, ...data.playoffers] : acc),
            [] as CompetitionParticipant[]
          )
          .filter((participant) => participant.competitionId === competition.id),
        winners: Object.values(event.values)
          .reduce(
            (acc, data) => (data.winners ? [...acc, ...data.winners] : acc),
            [] as CompetitionParticipant[]
          )
          .filter((participant) => participant.competitionId === competition.id),
      },
    }),
    {} as Record<number, CompetitionData>
  );

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
        {participantRenderer(organizers, 'Организаторы')}
        {participantRenderer(volonteers, 'Волонтеры')}
        {participantRenderer(participants, 'Участники')}
        {event.competitions.map((competition) =>
          competitionRenderer(competition, competitionsParticipants?.[competition.id] || {})
        )}
      </Container>
    </SWRConfig>
  );
};

export default EventPage;
