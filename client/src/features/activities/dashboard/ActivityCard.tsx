import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Prop = {
  activity: Activity
  selectActivity: (id: string) => void
}

export default function ActivityCard({ activity, selectActivity }: Prop) {
  const { deleteActivity } = useActivities();
  return (
    <Card sx={{ mt: 2, borderRadius: 3, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date}</Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, fontStyle: 'italic' }}>{activity.city}, {activity.venue}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Chip label={activity.category} color="primary" size="small" />
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button variant="contained" size="medium" onClick={() => selectActivity(activity.id)}>View</Button>
          <Button onClick={() => deleteActivity.mutate(activity.id)} disabled={deleteActivity.isPending} color="error" variant="contained">Delete</Button>
        </Box>
      </CardActions>
    </Card>
  )
}
