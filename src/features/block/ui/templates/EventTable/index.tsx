import React, { FC } from 'react';
import Link from 'next/link';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { bodyStyles, ColumnType, headerStyles } from 'src/features/block/consts';
import { Brigade, EventsData, SummaryData } from 'src/features/block/model/types';

interface EventTableProps {
  brigades: Brigade[];
  events: EventsData;
  columns: ColumnType[];
  summary: SummaryData;
}
const EventTable: FC<EventTableProps> = ({ brigades, events, columns, summary }) => {
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
          {events.map((event) => (
            <TableCell key={event.id} align="center" sx={headerStyles} colSpan={columns.length}>
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
              top: { xs: 27 },
            }}
          />
          {events.map((event) =>
            columns.map((column, index) => (
              <TableCell
                key={`${event.id}-${index}`}
                align="center"
                sx={{ ...headerStyles, top: { xs: 27 } }}
              >
                {column.title}
              </TableCell>
            ))
          )}
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
            {events.map((event) =>
              columns.map((column, columnIndex) => (
                <TableCell
                  key={`${brigade.id}-${event.id}-${columnIndex}`}
                  sx={{ ...bodyStyles, maxWidth: '70px' }}
                  align="center"
                >
                  {column.getter(event.values[`${brigade.id}`]) || ''}
                </TableCell>
              ))
            )}
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

export default EventTable;
