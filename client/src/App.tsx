import { Typography, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
 const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the activities!', error);
      });
  }, []);

  return (
    <>
     <Typography variant='h3'>Reactivities</Typography>
      <ul>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText primary={activity.title} secondary={activity.description} />
          </ListItem>
        ))}
      </ul>
    </>
  )
}

export default App
