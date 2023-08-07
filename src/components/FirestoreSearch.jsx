import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {Button, FormControl, TextField} from "@mui/material";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

export default function FirestoreSearch() {

    const [forms, setForms] = useState(1)
    const [queries, setQueries] = useState([])
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")
    const disableDecrement = (forms < 2)

    function setQueryValue(x, y, val) {

        let nq = queries
        if (typeof nq[x] === 'undefined') {
            nq[x] = []
        }
        nq[x][y] = val
        setQueries(nq)
    }

    let queryForms = []
    for (let i = 0; i < forms; i++) {
        queryForms.push(
            <FormControl key={`fc-${i}`} sx={formStyle}>
                <TextField label="FIELD" variant="outlined" color="smoke" onChange={(e) => {
                    setQueryValue(i, 0, e.target.value)
                }}/>
                <TextField label="OPERATOR" variant="outlined" color="smoke" onChange={(e) => {
                    setQueryValue(i, 1, e.target.value)
                }}/>
                <TextField label="VALUE" variant="outlined" color="smoke" onChange={(e) => {
                    setQueryValue(i, 2, e.target.value)
                }}/>
            </FormControl>
        )
    }

    function handleIncrement() {
        setForms(forms => forms + 1)
    }

    function handleDecrement() {
        if (disableDecrement) return
        setForms(forms => forms - 1)
        queries.pop()
        setQueries(queries)
    }

    function handleSearch(e) {
        e.preventDefault()

        setError("")

        const queryStrings = []
        for (const q of queries) {
            queryStrings.push(q.join())
        }

        axios.get(`http://localhost:3000/user`,
            {
                params: {
                    q: queryStrings
                }
            })
            .then((x) => (setUsers(x.data)))
            .catch((e) => {
                try {
                    setError(e.response.data.message)
                } catch (_) {
                    setError(e.message)
                }
            })
    }

    const output = []
    for (const user of users) {
        output.push(
            <pre style={{textAlign: "left"}}>{JSON.stringify(user, null, 1)}</pre>
        )
    }

    return (
        <>
            <Box sx={pageBoxStyle}>

                <Typography color="" variant="h2" component="div">
                    Search
                </Typography>

                <Box sx={controlStyle}>
                    <IconButton onClick={handleIncrement}>
                        <AddCircleOutlined/>
                    </IconButton>
                    <IconButton onClick={handleDecrement} disabled={disableDecrement}>
                        <RemoveCircleOutlined/>
                    </IconButton>
                </Box>

                {queryForms}


            </Box>

            {error ? <Alert severity="error">{error}</Alert> : ""}
            <Button onClick={handleSearch} variant="outlined" color="smoke">SEARCH</Button>

            {output.length > 0
                ? <Box component="div" sx={textBoxStyle}>
                    {output}
                </Box>
                : ""
            }
        </>
    )
}

const textBoxStyle = {
    maxWidth: "md",
    maxHeight: "35vh",
    overflowY: 'auto',
    my: 2,
    p: 1,
    bgcolor: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
    color: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
    border: '1px solid',
    borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.600' : 'grey.300',
    borderRadius: 2,
    '&::-webkit-scrollbar': {
        width: '0.66em',
    },
    '&::-webkit-scrollbar-track': {
        margin: "1em",
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        border: '1px solid slategrey',
        borderRadius: "1em",
    }
}

const pageBoxStyle = {
    '& > :not(style)': {
        m: 1,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        // border: '1px solid yellow',
    },
}

const controlStyle = {
    '*': {
        mx: 2,
        minWidth: '2rem',
        minHeight: '2rem'
    },
}

const formStyle = {
    border: '1.5px solid rgba(245,245,245,.33)',
    borderRadius: "1em",
    '& > :not(style)': {
        m: 1,
    },
    p: 0.5,
}
