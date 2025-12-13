import { Button, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function ServerError() {
  const {state} = useLocation();
  return (
    <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginTop: 8 }}>
      {state.error ? (
        <>
         <Typography variant="h4" sx={{px: 4, pt: 2, mb: 4}} color="secondary">
          {state.error.message || 'There was a server error'}
        </Typography>
        <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', textAlign: 'left', mb: 4 }}>
            {state.error.details || 'No additional details provided.'}  
          </Typography>
        </>
      ) : (
        <Typography variant="h5" sx={{ mb: 4 }} color="secondary">
          Server Error
        </Typography>
      )}
        
    </Paper>
  )
}