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

interface NavbarProps {}

interface BlockType {
  url: string;
  title: string;
}
const blocks: BlockType[] = [
  {
    url: '/choice/1',
    title: 'Творческий блок',
  },
  {
    url: '/choice/2',
    title: 'Спортивный блок',
  },
  {
    url: '/choice/3',
    title: 'Волонтерский блок',
  },
  {
    url: '/choice/4',
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
                  <Link href={`/choice/1`} passHref={true}>
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
