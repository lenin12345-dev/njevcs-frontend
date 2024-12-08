import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'; 

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#F76B1C' }}>
        <Toolbar>
     
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NJ EVCS Awnings
          </Typography>
          <Button           sx={{
              ":hover": {
                color: "white",
                 fontWeight:'bold'
               
              },
            }} color="inherit" component={Link} href="/">Home</Button>
          <Button           sx={{
              ":hover": {
                color: "white",
                 fontWeight:'bold'
               
              },
            }} color="inherit" component={Link} href="/about">About</Button>
          <Button           sx={{
              ":hover": {
                color: "white",
                 fontWeight:'bold'
               
              },
            }} color="inherit" component={Link} href="/solarpotential">Solar Potential</Button>
          <Button           sx={{
              ":hover": {
                color: "white",
                 fontWeight:'bold'
               
              },
            }} color="inherit" component={Link} href="/contact">Contact Us</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
