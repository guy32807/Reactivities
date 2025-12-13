import { Button, Paper } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginTop: 8 }}>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Button fullWidth  component={Link} to='/' variant="contained" color="primary">
            Go to Home
        </Button>
    </Paper>
  )
}