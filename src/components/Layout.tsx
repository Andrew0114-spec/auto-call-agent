import React from 'react';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Divider, CssBaseline } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start',height:'64px', width:`100%` , paddingLeft: 2, bgcolor: '#1976d2'  }}>
          <Typography variant="h6" noWrap>
            VoiceBot
          </Typography>
        </Toolbar>
      <Divider />
        <List>
          <ListItem component={Link} to="/upload">
            <ListItemText primary="Customer Management" />
          </ListItem>
          <ListItem component={Link} to="/autocalls">
            <ListItemText primary="Auto Call" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: '64px' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
