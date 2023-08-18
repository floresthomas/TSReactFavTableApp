import { AppBar, Toolbar, Typography } from "@mui/material";

interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gentleman Programming aplication
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
