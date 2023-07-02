import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

export default function Navbar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{mr: 2}}>
                        <NavLink exact="true" to="/">Home</NavLink>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{mr: 2}}>
                        <NavLink to="/search">Search</NavLink>
                    </Typography>
                    <Button sx={{marginLeft: "auto"}} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
