import { CssBaseline, Container, Box } from '@mui/material';
import NavBar from './NavBar';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
      <ScrollRestoration />
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />  
          <Container sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  )
} 

export default App
