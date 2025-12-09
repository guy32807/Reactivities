import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
     closeForm: () => void;
     activity?: Activity;
     submitForm: (activity: Activity) => void;
    }

export default function ActivityForm({closeForm, activity, submitForm}: Props) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const data: {[key: string]: FormDataEntryValue} = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if(activity) {
            data.id = activity.id;
        }
        submitForm(data as unknown as Activity);
    }
  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h4" gutterBottom color="primary">
            Create Activity
        </Typography>
        <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection='column' gap={3}>
            <TextField name="title" label="Title" variant="outlined" defaultValue={activity?.title}  fullWidth />
            <TextField name="description" label="Description" variant="outlined" defaultValue={activity?.description} fullWidth multiline rows={4} />
            <TextField name="category" label="Category" variant="outlined" defaultValue={activity?.category} fullWidth />
            <TextField name='date' label="Date" variant="outlined" fullWidth defaultValue={activity?.date} type="datetime-local" InputLabelProps={{ shrink: true }} />
            <TextField name="city" label="City" variant="outlined" fullWidth defaultValue={activity?.city} />
            <TextField name="venue" label="Venue" variant="outlined" fullWidth defaultValue={activity?.venue}/>
            <Box display='flex' justifyContent='end' mt={2}>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
                <Button onClick={closeForm} variant="outlined" color="secondary" sx={{ml: 2}}>
                    Cancel
                </Button>
            </Box>
        </Box>
    </Paper>
  )
}
