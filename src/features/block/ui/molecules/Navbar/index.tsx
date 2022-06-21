import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { FC, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { CHOICE_ROUTES } from 'src/features/block/consts';

interface NavbarProps {}

interface BlockType {
  url: string;
  title: string;
}
const blocks: BlockType[] = [
  {
    url: `/${CHOICE_ROUTES.ART}`,
    title: 'Творческий блок',
  },
  {
    url: `/${CHOICE_ROUTES.SPORT}`,
    title: 'Спортивный блок',
  },
  {
    url: `/${CHOICE_ROUTES.VOLONTEER}`,
    title: 'Волонтерский блок',
  },
  {
    url: `/${CHOICE_ROUTES.CITY}`,
    title: 'Городские',
  },
];
const Navbar: FC<NavbarProps> = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Toolbar />
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ top: 'auto', bottom: 0, background: (theme) => theme.palette.common.white }}
      >
        <Toolbar>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid container={true} spacing={2}>
              {blocks.map((block) => (
                <Grid key={block.url} item>
                  <Link href={block.url} passHref={true}>
                    <Button variant="outlined">{block.title}</Button>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ display: { md: 'none' } }}>
            <Button onClick={handleClick}>Перейти к блоку</Button>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
              {blocks.map((block) => (
                <MenuItem key={block.url} onClick={() => router.push(block.url)}>
                  {block.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
