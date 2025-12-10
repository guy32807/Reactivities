import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Prop = {
  selectedActivity: Activity
  cancelSelectActivity?: () => void
  openForm: (id: string) => void
}

export default function ActivityDetail({selectedActivity, cancelSelectActivity, openForm}: Prop) {
  const {activities } = useActivities();
  const activity = activities?.find(a => a.id === selectedActivity.id)!;

  if(!activity) return <Typography>Activity not found</Typography>
  return (
    <Card sx={{ mt: 2, borderRadius: 3, marginBottom: 2 }}>
      <CardMedia>
        <img 
          src={`/images/categoryImages/${activity.category}.jpg`} 
          alt={activity.category} 
          style={{ 
            width: '100%', 
            height: '400px', 
            objectFit: 'cover', 
            borderRadius: '12px 12px 0 0' 
          }} 
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h3" component="div" color="white" sx={{ position: 'absolute', bottom: 20, left: 20 }}>
          {activity.title}
        </Typography>
        <Typography variant="subtitle1" fontWeight='light' color="text.secondary" sx={{ mt: 2 }}>
          {activity.date}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {activity.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, fontStyle: 'italic' }}>
          {activity.city}, {activity.venue}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={() => openForm(activity.id)} color="primary" size="medium" variant="contained">Edit</Button>
        <Button onClick={cancelSelectActivity} color="inherit" size="medium" variant="outlined">Cancel</Button>
      </CardActions>
    </Card>
  )
}

