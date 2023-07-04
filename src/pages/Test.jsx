import {Button, FormControl, TextField} from "@mui/material";
import Box from "@mui/material/Box";

export default function Test() {

    const bs = {
        // '& > *': {m: 1,  border: "1px solid yellow"},
        // bgcolor: "whitesmoke", color: 'background.paper', p: 1,
    }
//MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input
    const fcs = {
        // '& > :not(style)': {m: 1,  border: "1px solid yellow"},
        '& > :not(style)': {m: 1},
        // '& > :not(style)': {m: 1},
    }

    return (
        <Box sx={fcs}>
            <FormControl sx={fcs}>
                {/*<FormControl sx={{}}>*/}
                {/*<InputLabel htmlFor="my-input">Email address</InputLabel>*/}
                {/*<Input id="my-input" aria-describedby="my-helper-text" />*/}
                <TextField sx={bs} id="my-input" label="FIELD" variant="outlined"/>
                <TextField id="my-input" label="OPERATOR" variant="filled"/>
                <TextField id="my-input" label="VALUE" variant="standard"/>
                {/*<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
                <Button style={{color: "inherit"}}>SEARCH</Button>
            </FormControl>
        </Box>
    )
}
