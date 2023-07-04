import Navbar from "./common/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import SearchUser from "./user/SearchUser.jsx";
import Home from "./pages/Home.jsx";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import Test from "./pages/Test.jsx";

function App() {

    const containerStyle = {
        border: "1px solid green"
    }

    const boxStyle = {
        border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }

    return (
        <>
            <Navbar/>
            <Container sx={containerStyle}>
                <Box sx={boxStyle}>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/search" element={<SearchUser/>}/>
                        <Route path="/test" element={<Test/>}/>
                    </Routes>
                </Box>
            </Container>
        </>
    )
}

export default App
