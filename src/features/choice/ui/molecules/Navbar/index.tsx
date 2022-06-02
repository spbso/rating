import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import Link from 'next/link';

interface NavbarProps {}
const Navbar: FC<NavbarProps> = () => {
  return (
    <>
      <Toolbar />
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ top: 'auto', bottom: 0, background: (theme) => theme.palette.common.white }}
      >
        <Toolbar>
          <Grid container={true} spacing={2}>
            <Grid item>
              <Link href={`/choice/1`} passHref={true}>
                <Button variant="outlined">Творческий блок</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href={`/choice/1`} passHref={true}>
                <Button variant="outlined" href={`/choice/2`}>
                  Спортивный блок
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href={`/choice/1`} passHref={true}>
                <Button variant="outlined" href={`/choice/3`}>
                  Волонтерский блок
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href={`/choice/1`} passHref={true}>
                <Button variant="outlined" href={`/choice/4`}>
                  Городские
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
