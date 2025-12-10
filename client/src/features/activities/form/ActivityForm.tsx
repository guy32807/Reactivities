import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";


export default function ActivityForm() {
    const {id} = useParams();
    const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const data: {[key: string]: FormDataEntryValue} = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if(activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${activity.id}`);
        }else{
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`);
                }
            });
        }
    }
    if(isLoadingActivity) return <Typography>Loading activity...</Typography>
  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h4" gutterBottom color="primary">
            {activity ? 'Edit Activity' : 'Create Activity'}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField name="title" label="Title" variant="outlined" defaultValue={activity?.title}  fullWidth />
            <TextField name="description" label="Description" variant="outlined" defaultValue={activity?.description} fullWidth multiline rows={4} />
            <TextField name="category" label="Category" variant="outlined" defaultValue={activity?.category} fullWidth />
            <TextField name='date' 
                label="Date" variant="outlined" 
                fullWidth defaultValue={activity?.date ? 
                    new Date(activity.date).toISOString().split('T')[0] : 
                    new Date().toISOString().split('T')[0]} 
                type="date"  />
            <TextField name="city" label="City" variant="outlined" fullWidth defaultValue={activity?.city} />
            <TextField name="venue" label="Venue" variant="outlined" fullWidth defaultValue={activity?.venue}/>
            <Box display='flex' justifyContent='end' mt={2}>
            <Button variant="outlined" color="secondary" sx={{ml: 2}}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit" disabled={updateActivity.isPending || createActivity.isPending} sx={{ml: 2}}>
                    Submit
                </Button>

            </Box>
        </Box>
    </Paper>
  )
}
