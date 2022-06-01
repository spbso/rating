import { AppBar, Toolbar, Button, Grid } from '@mui/material';
import { FC } from 'react';

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
              {/* <Button variant="contained" href={`?choice=0`}>
                Общая
              </Button> */}
            </Grid>
            <Grid item>
              <Button variant="outlined" href={`/choice/1`}>
                Творческий блок
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" href={`/choice/2`}>
                Спортивный блок
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" href={`/choice/3`}>
                Волонтерский блок
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" href={`/choice/4`}>
                Городские
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
