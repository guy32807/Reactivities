import { AccessTime, Place } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

type Prop = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Prop) {
  const label = activity.isHost
    ? "You are hosting this activity"
    : activity.isGoing
    ? "You are going to this activity"
    : "";
  const color = activity.isHost
    ? "warning"
    : activity.isGoing
    ? "success"
    : "default";

  return (
    <Card sx={{ borderRadius: 3, elevation: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ height: 80, width: 80 }}
              src={activity.hostImageUrl}
              alt="image of host"
            />
          }
          title={activity.title}
          slotProps={{ fontWeight: "bold", fontSize: 20 }}
          subheader={
            <>
              Hosted by{" "}
              <Link to={`/profiles/${activity.hostId}`}>
                {activity.hostDisplayName}
              </Link>
            </>
          }
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mr: 2 }}>
          {(activity.isHost || activity.isGoing) && (
            <Chip
              label={label}
              variant="outlined"
              color={color}
              sx={{ borderRadius: 2 }}
            />
          )}
          {activity.isCancelled && (
            <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", px: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(activity.date)}
            </Typography>
          </Box>
          <Place sx={{ mr: 1, ml: 3 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            backgroundColor: "grey.200",
            py: 3,
            pl: 3,
          }}
        >
          {activity.attendees.map((att) => (
            <AvatarPopover profile={att} key={att.id} />
          ))}
        </Box>
      </CardContent>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>

        <Button
          variant="contained"
          size="medium"
          component={Link}
          to={`/activities/${activity.id}`}
          sx={{ display: "flex", justifySelf: "self-end", borderRadius: 3 }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
