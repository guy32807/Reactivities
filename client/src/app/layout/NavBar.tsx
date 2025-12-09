import { Group } from "@mui/icons-material";
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from "@mui/material";

type Props = {
  openForm: () => void;
} 

export default function NavBar({openForm}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{backgroundImage: 'linear-gradient(to right, #4A90E2, #9013FE)'}}>
        <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
           <Box>
                <MenuItem sx={{ display: 'flex', gap: 2 }}>
                    <Group fontSize="large" /> 
                    <Typography variant="h6" fontWeight='bold'>
                        ActivityHub
                    </Typography>  
                </MenuItem>
           </Box>
            <Box sx={{ display: 'flex' }}>
                <MenuItem sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" sx={{ mr: 2, fontWeight: 'bold' }}>Activities</Button>
                    <Button color="inherit" sx={{ fontWeight: 'bold' }}>Login</Button>

                </MenuItem>
                <Button onClick={openForm} size="large" variant="contained" color="warning" sx={{ mr: 2, fontWeight: 'bold' }}>Create Activity</Button>
            </Box>
      </Toolbar>
        </Container>
    </AppBar>
  </Box>
  )
}
