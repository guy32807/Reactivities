import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
     closeForm: () => void;
     activity?: Activity;
    }

export default function ActivityForm({closeForm, activity}: Props) {
    const {updateActivity, createActivity, deleteActivity} = useActivities();

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
            closeForm();
        }else{
            await createActivity.mutateAsync(data as unknown as Activity);
            closeForm();
        }
    }
  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h4" gutterBottom color="primary">
            Create Activity
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
            <Button onClick={closeForm} variant="outlined" color="secondary" sx={{ml: 2}}>
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
