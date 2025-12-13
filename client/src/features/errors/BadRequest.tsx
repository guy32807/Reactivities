import { Button, Paper } from "@mui/material";
import { Link } from "react-router";

export default function BadRequest() {
  return (
   <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginTop: 8 }}>
         <h1>400 - Bad Request</h1>
         <p>The request could not be understood by the server due to malformed syntax.</p>
         <Button fullWidth component={Link} to='/' variant="contained" color="primary">
                Go to Home
            </Button>
        </Paper>
  )
}