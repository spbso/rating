import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { CompetitionParticipant } from 'src/features/block/model/types';

export const competitionParticipantsRenderer = (
  participants: CompetitionParticipant[] | undefined,
  title: string,
  isWinner?: boolean
) => {
  if (!participants || participants?.length === 0) {
    return null;
  }
  return (
    <Box
      key={title}
      sx={{
        mb: '20px',
        '&:last-of-type': {
          mb: 0,
        },
      }}
    >
      <Typography variant="h6" component="h4" sx={{ mb: '12px' }}>
        {title}
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
              {isWinner && <TableCell align="right">Номинация</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant) => (
              <TableRow
                key={participant.title}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>{participant.brigades.join(', ')}</TableCell>
                <TableCell align="right">{participant.title}</TableCell>
                {isWinner && (
                  <TableCell align="right">{participant.nominations.join(', ')}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
