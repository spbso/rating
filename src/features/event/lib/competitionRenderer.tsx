import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Competition, CompetitionData } from 'src/features/block/model/types';
import { competitionParticipantsRenderer } from './competitionParticipantsRenderer';

export const competitionRenderer = (competition: Competition, values: CompetitionData) => {
  if (
    !values.applications?.length &&
    !values.involvers?.length &&
    !values.playoffers?.length &&
    !values.winners?.length
  ) {
    return null;
  }
  return (
    <Box key={competition.id}>
      <Typography variant="h6" component="h4" sx={{ mb: '12px', fontWeight: 700 }}>
        {competition.title}
      </Typography>

      {competitionParticipantsRenderer(values?.applications, 'Заявка')}
      {competitionParticipantsRenderer(values?.involvers, 'Участие')}
      {competitionParticipantsRenderer(values?.playoffers, 'Полуфинал или плей-офф')}
      {competitionParticipantsRenderer(values?.winners, 'Победа или номинация', true)}
    </Box>
  );
};
