import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/ActivitySchema";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";


export default function ActivityForm() {
    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema),
    });
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (activity) {
            reset({
                title: activity.title,
                description: activity.description,
                category: activity.category,
                date: activity.date,
                location: {
                    venue: activity.venue,
                    city: activity.city,
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                }
            });
        }
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...activityData } = data;
        const flattenedData = { ...activityData, ...location };
        try {
            if (activity) {
                await updateActivity.mutateAsync({ ...activity, ...flattenedData },
                    {
                        onSuccess: () => {
                            navigate(`/activities/${activity.id}`);
                        }
                    }
                );
            } else {
                await createActivity.mutateAsync(flattenedData,{
                        onSuccess: (id) => {
                            navigate(`/activities/${id}`);
                        }
                    }
                );
            }
        } catch (error) {
            console.error("Error updating activity:", error);
        }
    }

    if (isLoadingActivity) return <Typography>Loading activity...</Typography>
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h4" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextInput label="Title" control={control} defaultValue={activity?.title} name='title' />
                <TextInput label="Description" control={control} defaultValue={activity?.description} name='description' multiline rows={4} />
                <Box display='flex' gap={3}>
                    <SelectInput items={categoryOptions} label="Category" control={control} defaultValue={activity?.category} name='category' />
                    <DateTimeInput label="Date" control={control} name='date' defaultValue={activity?.date} />
                </Box>
                <LocationInput control={control} label="Enter the location" name='location' defaultValue={activity?.city} />
                <Box display='flex' justifyContent='end' mt={2}>
                    <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit" disabled={updateActivity.isPending || createActivity.isPending} sx={{ ml: 2 }}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

