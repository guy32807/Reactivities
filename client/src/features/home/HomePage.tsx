import { Group } from "@mui/icons-material";
import { Box,  Button,  Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper  sx={{
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: 6,
      alignContent: 'center',
      flexDirection: 'column',
      backgroundImage: 'linear-gradient(to right, #4A90E2, #9013FE)'
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', color: 'white', gap: 3 }}>
        <Group sx={{ height: 110, width: 110 }} />
        <Typography variant="h1" fontWeight='bold'>
           ActivityHub  
        </Typography>
      </Box>
      <Typography variant="h5">
        Welcome to ActivityHub - Your gateway to exciting activities!
      </Typography>
      <Button component={Link} to='/activities' variant="contained" size="large" sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}>
        Go to Activities
      </Button>
    </Paper>
  )
}