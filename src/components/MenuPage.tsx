import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Hidden, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MenuPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" marginRight={"20px"}>
                Menu Page
            </Typography>
          </Box>
          <Hidden mdDown>
            <Box sx={{ marginRight: 'auto' }}>
              <Button color="inherit">Option 1</Button>
              <Button color="inherit">Option 2</Button>
              <Button color="inherit">Option 3</Button>
            </Box>
          </Hidden>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuPage;
