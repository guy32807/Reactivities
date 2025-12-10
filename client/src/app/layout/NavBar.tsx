import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{backgroundImage: 'linear-gradient(to right, #4A90E2, #9013FE)'}}>
        <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
           <Box>
                <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                    <Group fontSize="large" /> 
                    <Typography variant="h6" fontWeight='bold'>
                        ActivityHub
                    </Typography>  
                </MenuItem>
           </Box>
            <Box sx={{ display: 'flex' }}>
                <MenuItemLink  to='/activities'>
                    <Typography variant="h6" fontWeight='bold'>
                        Activities
                    </Typography>
                </MenuItemLink>
                <MenuItemLink  to='/createActivity' >
                    <Typography variant="h6" fontWeight='bold'>
                        Create Activity
                    </Typography>
                </MenuItemLink>
                <MenuItemLink  to='/userMenu' >
                    <Typography variant="h6" fontWeight='bold'>
                        User Menu
                    </Typography>
                </MenuItemLink>
            </Box>
      </Toolbar>
        </Container>
    </AppBar>
  </Box>
  )
}
