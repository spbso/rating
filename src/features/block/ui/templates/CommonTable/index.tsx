import React, { FC, Fragment } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { BLOCK_TITLES, bodyStyles, CHOICE_ROUTES, headerStyles } from 'src/features/block/consts';
import { Brigade, CommonSummaryData, SummaryData } from 'src/features/block/model/types';

interface CommonTableProps {
  brigades: Brigade[];
  summary: CommonSummaryData;
}
const CommonTable: FC<CommonTableProps> = ({ brigades, summary }) => {
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
          {Object.values(CHOICE_ROUTES).map((route) => (
            <Fragment key={route}>
              <TableCell align="center" sx={{ ...headerStyles, maxWidth: '70px' }}>
                {BLOCK_TITLES[route]}
              </TableCell>
              <TableCell align="center" sx={headerStyles}>
                Ранж.
              </TableCell>
            </Fragment>
          ))}
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
                position: 'sticky',
                left: 0,
                maxWidth: '120px',
              }}
            >
              <Typography sx={{ fontSize: 'inherit' }} noWrap>
                {`${index + 1}. ${brigade.title}`}
              </Typography>
            </TableCell>
            {Object.values(CHOICE_ROUTES).map((route) => {
              const isPuperDuper =
                summary[brigade.id][route]['-rank'] <= 3 &&
                summary[brigade.id][route]['-rank'] >= 0;
              const notSuper = route === 'common' && summary[brigade.id][route]['total'] < 0;
              return (
                <Fragment key={route}>
                  <TableCell
                    sx={{
                      ...bodyStyles,
                      maxWidth: '70px',
                      background: notSuper ? (theme) => theme.palette.error.light : undefined,
                    }}
                    align="center"
                  >
                    {summary[brigade.id][route]['total']}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      ...headerStyles,
                      fontWeight: isPuperDuper ? 700 : undefined,
                      background: isPuperDuper ? (theme) => theme.palette.info.light : undefined,
                    }}
                  >
                    {summary[brigade.id][route]['-rank']}
                  </TableCell>
                </Fragment>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CommonTable;
