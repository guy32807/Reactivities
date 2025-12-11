import { Grid, Typography } from "@mui/material";
import {  useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSideBar";


export default function ActivityDetailPage() {

  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading activity...</Typography>
  if (!activity) return <Typography>Activity not found</Typography>
  return (
    <Grid container spacing={3} >
      <Grid size={8}>
        <ActivityDetailHeader activity={activity}/>
        <ActivityDetailsInfo activity={activity}/>
        <ActivityDetailsChat />
      </Grid>
      <Grid size={4}>
        <ActivityDetailsSidebar />
      </Grid>
    </Grid>
  )
}

