import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { Observer } from "mobx-react-lite";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";

export default function NavBar() {
    const {uiStore} = useStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{backgroundImage: 'linear-gradient(to right, #4A90E2, #9013FE)', position: 'relative' }}>
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
        <Observer>
            {() => uiStore.isLoading ? (
                <LinearProgress color="secondary" sx={{ height: 4, position: 'absolute', bottom: 0, left: 0, right: 0 }}/>
            ) : null}
        </Observer>
    </AppBar>
  </Box>
  )
}
