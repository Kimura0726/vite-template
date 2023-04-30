import styled from '@emotion/styled';
import { AppBar, Button, Box, Toolbar, Typography, Link } from '@mui/material';

const TitleLinkText = styled(Typography)({
  color: '#FFF'
});

const Header = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button size="small" component={Link} href="/">
            <TitleLinkText variant="h5">Vite App</TitleLinkText>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
