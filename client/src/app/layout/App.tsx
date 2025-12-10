import { CssBaseline, Container, Box, Typography } from '@mui/material';
import { useState } from 'react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useActivities } from '../../lib/hooks/useActivities';

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending} = useActivities();

  const handleSelectActivity = (id: string) => {
    const activity = activities!.find(a => a.id === id);
    setSelectedActivity(activity);
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        { !activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (<ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
        />) }
        
      </Container>
    </Box>
  )
}

export default App
