import React, { FC } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { bodyStyles, headerStyles } from 'src/features/block/consts';
import { Brigade, SummaryData } from 'src/features/block/model/types';

interface EducationTableProps {
  brigades: Brigade[];
  summary: SummaryData;
}
const EducationTable: FC<EducationTableProps> = ({ brigades, summary }) => {
  return (
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
              top: { xs: 27 },
            }}
          />
          <TableCell style={{ top: 27 }} align="center" sx={headerStyles}>
            Балл за блок
          </TableCell>
          <TableCell style={{ top: 27 }} align="center" sx={headerStyles}>
            Ранж.
          </TableCell>
          <TableCell style={{ top: 27 }} align="center" sx={headerStyles}>
            Балл с коэф.
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {brigades.map((brigade, index) => (
          <TableRow
            hover
            sx={{
              '& .MuiTableCell-root:first-of-type': {
                background: (theme) => theme.palette.common.white,
              },
              '&:hover': {
                '& .MuiTableCell-root:first-of-type': {
                  background: '#F5F5F5',
                },
              },
            }}
            key={brigade.id}
          >
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
            <TableCell sx={{ ...bodyStyles, maxWidth: '70px' }} align="center">
              {summary[brigade.id].total}
            </TableCell>
            <TableCell sx={{ ...bodyStyles, maxWidth: '70px' }} align="center">
              {summary[brigade.id].rank}
            </TableCell>
            <TableCell sx={{ ...bodyStyles, maxWidth: '70px' }} align="center">
              {summary[brigade.id].multiplied}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EducationTable;
