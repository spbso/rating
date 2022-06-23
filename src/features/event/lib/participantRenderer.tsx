import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { Participant } from 'src/features/block/model/types';

export const participantRenderer = (participants: Participant[], title: string) => {
  if (participants.length === 0) {
    return null;
  }
  return (
    <Box>
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
              <TableCell>Имя</TableCell>
              <TableCell align="right">Отряд</TableCell>
              <TableCell align="right">Последний год выезда</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant) => (
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
                <TableCell align="right" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {participant.brigade}
                </TableCell>
                <TableCell align="right">{participant.lastYear}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
